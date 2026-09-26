from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.auth.oauth2 import get_current_user

from app.models.user import User
from app.models.favorite_developer import FavoriteDeveloper

from app.schemas.favorite_developer import (
    FavoriteDeveloperCreate,
    FavoriteDeveloperResponse,
)

router = APIRouter(
    prefix="/favorites",
    tags=["Favorites"],
)


@router.post(
    "/developers",
    response_model=FavoriteDeveloperResponse,
)
def add_favorite_developer(
    developer: FavoriteDeveloperCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    exists = db.query(FavoriteDeveloper).filter(
        FavoriteDeveloper.user_id == current_user.id,
        FavoriteDeveloper.github_id == developer.github_id,
    ).first()

    if exists:
        raise HTTPException(
            status_code=400,
            detail="Developer already added.",
        )

    favorite = FavoriteDeveloper(
        user_id=current_user.id,
        github_id=developer.github_id,
        username=developer.username,
        profile_url=developer.profile_url,
        avatar_url=developer.avatar_url,
    )

    db.add(favorite)
    db.commit()
    db.refresh(favorite)

    return favorite


@router.get(
    "/developers",
    response_model=list[FavoriteDeveloperResponse],
)
def get_favorite_developers(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    return (
        db.query(FavoriteDeveloper)
        .filter(FavoriteDeveloper.user_id == current_user.id)
        .all()
    )


@router.delete("/developers/{github_id}")
def delete_favorite_developer(
    github_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    developer = db.query(FavoriteDeveloper).filter(
        FavoriteDeveloper.user_id == current_user.id,
        FavoriteDeveloper.github_id == github_id,
    ).first()

    if not developer:
        raise HTTPException(
            status_code=404,
            detail="Developer not found.",
        )

    db.delete(developer)
    db.commit()

    return {
        "message": "Favorite developer removed successfully."
    }