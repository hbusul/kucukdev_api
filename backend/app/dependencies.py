import json
import secrets
from datetime import datetime, timedelta
from typing import Optional

import requests
from fastapi import APIRouter, Depends, HTTPException, Request, status
from fastapi.encoders import jsonable_encoder
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from passlib.hash import bcrypt
from pydantic import BaseModel

from .config import Settings
from .models.user_models import Message, UserModel

settings = Settings()

router = APIRouter()


class LazyURLBasedJWK:
    def __init__(self, URL, key=None):
        self.URL = URL
        self.key = key

    def get_key(self):
        if self.key is None:
            self.key = json.loads(requests.get(self.URL).text)
        return self.key


if settings.AUTH_JWT_ALGORITHM == "RS256":
    JWK_SET = LazyURLBasedJWK(settings.AUTH_JWK_URL) if settings.AUTH_JWK_URL else None
else:
    JWK_SET = LazyURLBasedJWK(None, settings.AUTH_SECRET_KEY)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


async def create_admin_user(request: Request):
    if await request["users"].find_one({"email": settings.ADMIN_USERNAME}) is None:
        user = UserModel(
            email=settings.ADMIN_USERNAME, password=bcrypt.hash(settings.ADMIN_PASSWORD)
        )
        user = jsonable_encoder(user)
        user["userGroup"] = "admin"
        user["curSemesterID"] = "null"
        user["curUniversityID"] = "null"
        user["entranceYear"] = 0
        res = await request["users"].insert_one(user)
        if res.inserted_id is None:
            raise HTTPException(status_code=500, detail="Could not create admin user")


async def control_secret_key(request: Request):
    secret_key = secrets.token_urlsafe(64)
    res = await request["key"].update_one(
        {}, {"$setOnInsert": {"secret_key": secret_key}}, upsert=True
    )
    if res.upserted_id is not None:
        settings.AUTH_SECRET_KEY = secret_key
    else:
        settings.AUTH_SECRET_KEY = (await request["key"].find_one())["secret_key"]


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None


@router.post(
    "",
    response_description="Get token",
    response_model=Token,
    responses={401: {"model": Message}},
)
async def login_for_access_token(
    request: Request, form_data: OAuth2PasswordRequestForm = Depends()
):
    user = await authenticate_user(request, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=settings.AUTH_ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["email"]}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


async def authenticate_user(request: Request, username: str, password: str):
    user = await request.app.mongodb["users"].find_one({"email": username})
    if not user:
        return False
    if not pwd_context.verify(password, user["password"]):
        return False
    return user


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(
            minutes=settings.AUTH_ACCESS_TOKEN_EXPIRE_MINUTES
        )
    to_encode.update({"exp": expire, "aud": "account"})
    encoded_jwt = jwt.encode(
        to_encode, settings.AUTH_SECRET_KEY, algorithm=settings.AUTH_JWT_ALGORITHM
    )
    return encoded_jwt


async def get_current_user(
    request: Request,
    token: str = Depends(oauth2_scheme),  # jwt token
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(
            token,
            key=JWK_SET.get_key(),
            algorithms=[settings.AUTH_JWT_ALGORITHM],
            audience=settings.AUTH_AUDIENCE,
        )
        sub: str = payload.get("sub")
        if sub is None:
            raise credentials_exception
    except JWTError as e:
        raise credentials_exception

    if settings.AUTH_API_MANAGE_USERS:
        # when API is managing the users, not finding the user means that user got deleted after authenticated
        user = await request.app.mongodb["users"].find_one({"email": sub})
        if user is None:
            raise credentials_exception
    else:
        # when API is not managing the users, not finding the user means that it's users first login
        email = payload.get("email")
        user = await request.app.mongodb["users"].find_one({"email": email})

        if user is None:
            user = UserModel(email=email, password="nothere")
            user = jsonable_encoder(user)
            user.update({
                "email": email,
                "semesters": [],
                "userGroup": "default",
                "curSemesterID": "null",
                "curUniversityID": "null",
                "entranceYear": 0,
            })

            await request.app.mongodb["users"].insert_one(user)

    return user
