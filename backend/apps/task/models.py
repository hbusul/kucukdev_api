from typing import Optional
import uuid
from pydantic import BaseModel, Field, EmailStr
from datetime import datetime
from typing import List


class UserModel(BaseModel):
    id: str = Field(defaul_factory=uuid.uuid4, alias="_id")
    email: EmailStr = Field(unique=True)
    password: str = Field(...)





    
    # semesters: List[SemesterModel]
    
    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "id": "00010203-0405-0607-0809-0a0b0c0d0e0u",

                "email": "hello@agu.edu.tr",

                "password": "hello1234",
            }
        }


class UpdateUserModel(BaseModel):
    email: Optional[EmailStr]
    password: Optional[str]

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "email": "hello@agu.edu.tr",
                "password": "hello1234",
            }
        }

class LessonModel(BaseModel):
    name: str = Field(...)
    instructor: str = Field(...)
    sections: List[List[str]] = Field(...)

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "name": "EE201",
                "instructor": "Ali Veli",
                "sections": [
                    ["W", "7"],
                    ["W", "8"]
                ]
            }
        }


class UpdateLessonModel(BaseModel):
    instructor: Optional[str]
    sections: Optional[List[List[str]]]


    class Config:
        schema_extra = {
            "example": {
                "instructor": "Ali Veli",
                "sections": [
                    ["W", "7"],
                    ["W", "8"]
                ]
            }
        }


class SemesterModel(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    name: str = Field(...)
    owner: str = Field(...)
    startDate: datetime = Field(...)
    endDate: datetime = Field(...) 
    startHour: str = Field(...) 
    dLesson: int = 0
    dBreak: int = 0
    slotCount: int = 0
    # lessons: Dict[str, LessonModel] = Field(...)
    lessons: List[LessonModel] = Field(...)

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "id": "00010203-0405-0607-0809-0a0b0c0d0e0z",
                "name": "2020-21 Spring",
                "owner": "user_nameORuser_id",
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
                        "sections": [
                            ["W", "7"],
                            ["W", "8"]
                        ]
                    },
                    {
                        "name": "EE213",
                        "instructor": "Ali Ahmet",
                        "sections": [
                            ["M", "4"],
                            ["M", "5"],
                            ["T", "2"],
                            ["T", "3"],
                            ["T", "4"]
                        ]
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
    lessons: Optional[List[str]] # Instead of list of strs there will be list of lessons

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
                "lessons": ["OHS", "TURK101", "HIST201"],
            }
        }


class TaskModel(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    name: str = Field(...)
    completed: bool = False

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "id": "00010203-0405-0607-0809-0a0b0c0d0e0f",
                "name": "My important task",
                "completed": True,
            }
        }


class UpdateTaskModel(BaseModel):
    name: Optional[str]
    completed: Optional[bool]

    class Config:
        schema_extra = {
            "example": {
                "name": "My important task",
                "completed": True,
            }
        }