import clip
import torch

import time

class ClipModel:
    def __init__(self):
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        self.model, self.preprocess = clip.load("ViT-B/32", device=self.device)

    def encode_search_query(self, search_query):
        start_ts = time.perf_counter()
        with torch.no_grad():
            # Encode and normalize the search query using CLIP
            text_encoded = self.model.encode_text(clip.tokenize(search_query).to(self.device))
            text_encoded /= text_encoded.norm(dim=-1, keepdim=True)
        print(f"Compute text embedding in {(time.perf_counter() - start_ts):0.4f} seconds")

        # Retrieve the feature vector
        return text_encoded