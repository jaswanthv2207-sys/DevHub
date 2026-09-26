from fastapi import APIRouter, Depends

from app.auth.oauth2 import get_current_user
from app.models.user import User

router = APIRouter(
    prefix="/users",
    tags=["Users"],
)


from app.schemas.user import UserResponse

@router.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user