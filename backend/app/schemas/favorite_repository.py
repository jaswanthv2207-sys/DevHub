from pydantic import BaseModel


class FavoriteRepositoryCreate(BaseModel):
    repo_id: int
    repo_name: str
    owner: str
    html_url: str


class FavoriteRepositoryResponse(BaseModel):
    id: int
    repo_id: int
    repo_name: str
    owner: str
    html_url: str

    class Config:
        from_attributes = True