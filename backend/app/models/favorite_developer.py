from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.database.database import Base


class FavoriteDeveloper(Base):
    __tablename__ = "favorite_developers"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))

    github_id = Column(Integer)
    username = Column(String)
    profile_url = Column(String)
    avatar_url = Column(String)

    user = relationship("User", back_populates="favorite_developers")