from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI

from app.database.database import Base, engine
from app.routers.auth import router as auth_router
from app.routers.user import router as user_router
from app.routers.github import router as github_router
from app.models.favorite_repository import FavoriteRepository
from app.routers.favorites import router as favorites_router
from app.routers.favorite_developers import (
    router as favorite_developer_router,
)
from fastapi.middleware.cors import CORSMiddleware


Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="DevHub API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5175",
        "http://127.0.0.1:5175",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(user_router)
app.include_router(github_router)
app.include_router(favorites_router)
app.include_router(favorite_developer_router)

@app.get("/")
def home():
    return {
        "message": "DevHub Backend Running 🚀"
    }