from typing import Optional, List, Dict
import uuid
from pydantic import BaseModel, Field, EmailStr
from datetime import datetime


class LessonModel(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    name: str = Field(...)
    instructor: str = Field(...)
    slots: List[List[str]] = Field(...)

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "name": "EE203",
                "instructor": "Ali Veli",
                "slots": [["W", "7"], ["W", "8"]],
            }
        }


class UpdateLessonModel(BaseModel):
    name: Optional[str]
    instructor: Optional[str]
    slots: Optional[List[List[str]]]

    class Config:
        schema_extra = {
            "example": {
                "name": "EE203",
                "instructor": "Ali Veli",
                "slots": [["W", "7"], ["W", "8"]],
            }
        }


class SemesterModel(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    name: str = Field(...)
    startDate: datetime = Field(...)
    endDate: datetime = Field(...)
    startHour: str = Field(...)
    dLesson: int = 0
    dBreak: int = 0
    slotCount: int = 0
    lessons: List[LessonModel] = []

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "name": "2020-21 Spring",
                "startDate": "2016-02-18T16:00:00Z",
                "endDate": "2016-06-18T16:00:00Z",
                "startHour": "8.10",
                "dLesson": 50,
                "dBreak": 10,
                "slotCount": 12,
                "lessons": [
                    {
                        "name": "EE203",
                        "instructor": "Ali Veli",
                        "sections": [["W", "7"], ["W", "8"]],
                    },
                    {
                        "name": "EE213",
                        "instructor": "Ali Ahmet",
                        "sections": [
                            ["M", "4"],
                            ["M", "5"],
                            ["T", "2"],
                            ["T", "3"],
                            ["T", "4"],
                        ],
                    },
                ],
            }
        }


class UpdateSemesterModel(BaseModel):
    name: Optional[str]
    startDate: Optional[datetime]
    endDate: Optional[datetime]
    startHour: Optional[str]
    dLesson: Optional[int]
    dBreak: Optional[int]
    slotCount: Optional[int]
    lessons: Optional[List[LessonModel]]

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "name": "2020-21 Spring",
                "startDate": "2016-02-18T16:00:00Z",
                "endDate": "2016-06-18T16:00:00Z",
                "startHour": "8.10",
                "dLesson": 50,
                "dBreak": 10,
                "slotCount": 12,
                "lessons": [
                    {
                        "name": "EE203",
                        "instructor": "Ali Veli",
                        "sections": [["W", "7"], ["W", "8"]],
                    },
                ],
            }
        }


class UserModel(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    email: EmailStr = Field(...)
    password: str = Field(...)
    semesters: List[SemesterModel] = []

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "email": "hello@agu.edu.tr",
                "password": "hello1234",
            }
        }


class UpdateUserModel(BaseModel):
    email: Optional[EmailStr]
    password: Optional[str]
    semesters: Optional[List[SemesterModel]]

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "email": "hello@agu.edu.tr",
                "password": "hello1234",
            }
        }
