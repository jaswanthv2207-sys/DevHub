from pydantic import BaseModel


class FavoriteDeveloperCreate(BaseModel):
    github_id: int
    username: str
    profile_url: str
    avatar_url: str


class FavoriteDeveloperResponse(FavoriteDeveloperCreate):
    id: int

    class Config:
        from_attributes = True