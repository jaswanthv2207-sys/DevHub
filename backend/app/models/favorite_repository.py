from sqlalchemy import Column, Integer, ForeignKey, String
from sqlalchemy.orm import relationship

from app.database.database import Base


class FavoriteRepository(Base):
    __tablename__ = "favorite_repositories"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE")
    )

    repo_id = Column(Integer)

    repo_name = Column(String)

    owner = Column(String)

    html_url = Column(String)

    user = relationship(
        "User",
        back_populates="favorite_repositories"
    )