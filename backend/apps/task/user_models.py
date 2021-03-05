from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi import HTTPException, status, Request, Depends
from typing import Optional, List, Dict
import uuid
from pydantic import BaseModel, Field, EmailStr
from datetime import timedelta, datetime
from passlib.context import CryptContext
from jose import JWTError, jwt

SECRET_KEY = "c8fc6e033c9801ca3c7d580dfd4756d691b96b3c8cc6e2313723eb49d7bc5384"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


class LessonModel(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    name: str = Field(...)
    instructor: str = Field(...)
    absenceLimit: int = Field(...)
    slots: List[str] = Field(...)
    absences: List[str] = []

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "name": "EE203",
                "instructor": "Ali Veli",
                "absenceLimit": 0,
                "slots": ["2,7,0", "2,8,0"],
            }
        }


class UpdateLessonModel(BaseModel):
    id: Optional[str]
    name: str = Field(...)
    instructor: str = Field(...)
    absenceLimit: int = Field(...)
    slots: List[str] = Field(...)

    class Config:
        schema_extra = {
            "example": {
                "name": "EE203",
                "instructor": "Ali Veli",
                "absenceLimit": 0,
                "slots": ["2,7,0", "2,8,0"],
            }
        }


class AbsenceModel(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    absence: str = Field(...)

    class Config:
        schema_extra = {
            "example": {
                "absence": "1,0,2",
            }
        }


class UserSemesterModel(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    name: str = Field(...)
    startDate: datetime = Field(...)
    endDate: datetime = Field(...)
    startHour: str = Field(...)
    dLesson: int = Field(...)
    dBreak: int = Field(...)
    slotCount: int = Field(...)
    lessons: List[LessonModel] = []

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "name": "2020-21 Spring",
                "startDate": "2016-02-18T00:00:00Z",
                "endDate": "2016-06-18T00:00:00Z",
                "startHour": "8.10",
                "dLesson": 50,
                "dBreak": 10,
                "slotCount": 12,
            }
        }


class UpdateUserSemesterModel(BaseModel):
    name: str = Field(...)
    startDate: datetime = Field(...)
    endDate: datetime = Field(...)
    startHour: str = Field(...)
    dLesson: int = Field(...)
    dBreak: int = Field(...)
    slotCount: int = Field(...)

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "name": "2020-21 Spring",
                "startDate": "2016-02-18T00:00:00Z",
                "endDate": "2016-06-18T00:00:00Z",
                "startHour": "8.10",
                "dLesson": 50,
                "dBreak": 10,
                "slotCount": 12,
            }
        }


class SemesterAPIModel(BaseModel):
    id: Optional[str]
    name: Optional[str]
    startDate: Optional[datetime]
    endDate: Optional[datetime]
    startHour: Optional[str]
    dLesson: Optional[int]
    dBreak: Optional[int]
    slotCount: Optional[int]
    lessons_url: Optional[str]


class UserModel(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    email: EmailStr = Field(...)
    password: str = Field(...)
    semesters: List[UserSemesterModel] = []

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "email": "hello@agu.edu.tr",
                "password": "hello1234",
            }
        }


class UpdatePasswordModel(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    password: str = Field(...)

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "password": "123456",
            }
        }


class UpdateSemesterModel(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    currentSemester: str = Field(...)

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "currentSemester": "c765c307-560c-47ab-b29e-0a1265eab860",
            }
        }


class UpdateUniversityModel(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    currentUniversity: str = Field(...)

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "currentUniversity": "c765c307-560c-47ab-b29e-0a1265eab860",
            }
        }


class UserAPIModel(BaseModel):
    id: Optional[str]
    email: Optional[EmailStr]
    currentSemester: Optional[str]
    currentUniversity: Optional[str]
    semesters_url: Optional[str]


class Message(BaseModel):
    message: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


async def authenticate_user(request: Request, username: str, password: str):
    user = await request.app.mongodb["users"].find_one({"email": username})
    if not user:
        return False
    if not verify_password(password, user["password"]):
        return False
    return user


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(request: Request, token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = TokenData(email=email)
    except JWTError:
        raise credentials_exception
    user = await request.app.mongodb["users"].find_one({"email": token_data.email})
    if user is None:
        raise credentials_exception
    return user
