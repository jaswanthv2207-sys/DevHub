from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from app.database.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    username = Column(
        String,
        unique=True,
        nullable=False,
        index=True,
    )

    email = Column(
        String,
        unique=True,
        nullable=False,
        index=True,
    )

    hashed_password = Column(
        String,
        nullable=False,
    )

    favorite_repositories = relationship(
        "FavoriteRepository",
        back_populates="user",
        cascade="all, delete-orphan",
    )

    favorite_developers = relationship(
        "FavoriteDeveloper",
        back_populates="user",
        cascade="all, delete-orphan",
    )