from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.auth.oauth2 import get_current_user

from app.models.user import User
from app.models.favorite_repository import FavoriteRepository

from app.schemas.favorite_repository import (
    FavoriteRepositoryCreate,
    FavoriteRepositoryResponse,
)

router = APIRouter(
    prefix="/favorites",
    tags=["Favorites"],
)

@router.post(
    "/repositories",
    response_model=FavoriteRepositoryResponse,
)
def add_favorite(
    repo: FavoriteRepositoryCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    exists = db.query(FavoriteRepository).filter(
        FavoriteRepository.user_id == current_user.id,
        FavoriteRepository.repo_id == repo.repo_id,
    ).first()

    if exists:
        raise HTTPException(
            status_code=400,
            detail="Repository already added.",
        )

    favorite = FavoriteRepository(
        user_id=current_user.id,
        repo_id=repo.repo_id,
        repo_name=repo.repo_name,
        owner=repo.owner,
        html_url=repo.html_url,
    )

    db.add(favorite)
    db.commit()
    db.refresh(favorite)

    return favorite

@router.get(
    "/repositories",
    response_model=list[FavoriteRepositoryResponse],
)
def get_favorites(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    return db.query(FavoriteRepository).filter(
        FavoriteRepository.user_id == current_user.id
    ).all()

@router.delete("/repositories/{repo_id}")
def delete_favorite(
    repo_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    favorite = db.query(FavoriteRepository).filter(
        FavoriteRepository.user_id == current_user.id,
        FavoriteRepository.repo_id == repo_id,
    ).first()

    if not favorite:
        raise HTTPException(
            status_code=404,
            detail="Repository not found.",
        )

    db.delete(favorite)
    db.commit()

    return {"message": "Favorite removed successfully."}