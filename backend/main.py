from fastapi import FastAPI
from clip_model import ClipModel
from searcher import Searcher
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

clip_model = ClipModel()
searcher = Searcher(k=10, use_bf_search=False)

class SearchResult(BaseModel):
    topk: list[str] = []


@app.get("/search/{search_query}", response_model=SearchResult)
def search(search_query: str):
    text_emb = clip_model.encode_search_query(search_query)
    photo_ids = searcher.search(text_emb)
    print(f"Found photo ids:  {photo_ids}")
    search_result = SearchResult()
    search_result.topk = photo_ids
    return search_result