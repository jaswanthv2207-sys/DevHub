from datetime import datetime, timedelta

from jose import JWTError, jwt

from app.config.settings import (
    SECRET_KEY,
    ALGORITHM,
    ACCESS_TOKEN_EXPIRE_MINUTES,
)


def create_access_token(data: dict):
    payload = data.copy()

    expire = datetime.utcnow() + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    payload.update({"exp": expire})

    print("\n========== CREATE TOKEN ==========")
    print("SECRET_KEY:", SECRET_KEY)
    print("ALGORITHM:", ALGORITHM)

    return jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM,
    )


def verify_token(token: str):
    print("\n========== VERIFY TOKEN ==========")
    print("SECRET_KEY:", SECRET_KEY)
    print("ALGORITHM:", ALGORITHM)

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM],
        )

        print("PAYLOAD:", payload)
        return payload

    except JWTError as e:
        print("JWT ERROR:", e)
        return None