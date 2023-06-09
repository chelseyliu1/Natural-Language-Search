import faiss
import pandas as pd
import numpy as np
import torch

import time


class Searcher:
    def __init__(self, k, use_bf_search=False):
        start_ts = time.perf_counter()

        self.use_bf_search = use_bf_search
        self.k = k
        # Load the photo IDs
        self.photo_ids = pd.read_csv("unsplash-dataset/photo_ids.csv")
        self.photo_ids = np.array(list(self.photo_ids['photo_id']))

        # Load the features vectors
        self.photo_features = np.load("unsplash-dataset/features.npy")

        print(f"Load image embedding in {(time.perf_counter() - start_ts):0.4f} seconds")

        start_ts = time.perf_counter()
        # Convert features to Tensors: Float32 on CPU and Float16 on GPU
        self.device = "cuda" if torch.cuda.is_available() else "cpu"

        if self.device == "cpu":
            self.photo_features = torch.from_numpy(self.photo_features).float().to(self.device)
        else:
            self.photo_features = torch.from_numpy(self.photo_features).to(self.device)

        if not self.use_bf_search:

            self.faiss_searcher = faiss.IndexFlatIP(512)
            self.faiss_searcher.add(self.photo_features)
            print(f"Build index in {(time.perf_counter() - start_ts):0.4f} seconds")

    def search(self, text_emb):
        return self.bf_search(text_emb) if self.use_bf_search else self.faiss_search(text_emb)


    def faiss_search(self, text_emb):
        start_ts = time.perf_counter()

        similarity, indexes = self.faiss_searcher.search(text_emb, self.k)

        print(f"Search NNs in {(time.perf_counter() - start_ts):0.4f} seconds")

        # get photo_ids from indexes.
        return list(self.photo_ids[indexes][0])

    def bf_search(self, text_emb):
        start_ts = time.perf_counter()

        similarities = (self.photo_features @ text_emb.T).squeeze(1)

        # Sort the photos by their similarity score
        best_photo_idx = (-similarities).argsort()

        top_k_ind = best_photo_idx[:self.k].numpy()
        print(f'top_k_ind type: {type(top_k_ind)}')
        print(f'top_k_ind: {top_k_ind}')
        print(f'top_k_ind.shape: {top_k_ind.shape}')
        print(f"BF Search NNs in {(time.perf_counter() - start_ts):0.4f} seconds")
        return list(self.photo_ids[top_k_ind])


        


