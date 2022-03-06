from typing import Optional, List
from pydantic import BaseModel, Field, EmailStr
from datetime import datetime
from bson import ObjectId

from .PyObjectId import PyObjectId


class SlotModel(BaseModel):
    day: int = Field(..., ge=0, le=4)
    hour: int = Field(..., ge=0, le=15)
    is_lab: int = Field(..., ge=0, le=1)


class AbsenceModel(BaseModel):
    week: int = Field(..., ge=0)
    day: int = Field(..., ge=0, le=4)
    hour: int = Field(..., ge=0, le=15)
    is_lab: int = Field(..., ge=0, le=1)


class LessonAbsenceModel(BaseModel):
    absence: AbsenceModel = Field(...)

    class Config:
        json_encoders = {
            AbsenceModel: lambda x: [x.week, x.day, x.hour, x.isLab],
        }
        schema_extra = {
            "example": {"absence": {"week": 0, "day": 2, "hour": 7, "isLab": 0},}
        }


class LessonModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str = Field(..., min_length=1)
    code: str = Field(..., min_length=1)
    instructor: str = Field(..., min_length=1)
    ects: int = Field(..., ge=0)
    grade: float = Field(ge=0, le=10)
    absence_limit: int = Field(..., ge=0)
    slots: List[SlotModel] = Field(...)
    absences: List[AbsenceModel] = []

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {
            ObjectId: str,
            SlotModel: lambda x: [x.day, x.hour, x.isLab],
            AbsenceModel: lambda x: [x.week, x.day, x.hour, x.isLab],
        }
        schema_extra = {
            "example": {
                "name": "Algebra",
                "code": "ALG",
                "instructor": "Jack Joe",
                "ects": 5,
                "grade": 3.67,
                "absence_limit": 21,
                "slots": [
                    {"day": 2, "hour": 7, "isLab": 0},
                    {"day": 2, "hour": 8, "isLab": 0},
                ],
                "absences": [
                    {"week": 0, "day": 2, "hour": 7, "isLab": 0},
                    {"week": 0, "day": 2, "hour": 8, "isLab": 0},
                ],
            }
        }


class LessonAPIModel(BaseModel):
    id: Optional[str] = Field(alias="_id")
    name: Optional[str]
    code: Optional[str]
    instructor: Optional[str]
    ects: Optional[int]
    grade: Optional[float]
    absence_limit: Optional[int]
    slots: Optional[List[List[int]]]
    absences: Optional[List[List[int]]]

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "_id": "61ddea901311ecaed99afb7c",
                "name": "Algebra",
                "code": "ALG",
                "instructor": "Jack Joe",
                "ects": 5,
                "grade": 3.67,
                "absence_limit": 21,
                "slots": [[2, 7, 0], [2, 8, 0]],
                "absences": [[0, 2, 7, 0], [0, 2, 8, 0]],
            }
        }


class UpdateLessonModel(BaseModel):
    name: str = Field(..., min_length=1)
    code: str = Field(..., min_length=1)
    instructor: str = Field(..., min_length=1)
    ects: int = Field(..., ge=0)
    grade: float = Field(ge=0, le=10)
    absence_limit: int = Field(..., ge=0)
    slots: List[SlotModel] = Field(...)

    class Config:
        json_encoders = {
            SlotModel: lambda x: [x.day, x.hour, x.isLab],
        }
        schema_extra = {
            "example": {
                "name": "Algebra",
                "code": "ALG",
                "instructor": "Jack Joe",
                "ects": 5,
                "grade": 3.67,
                "absence_limit": 21,
                "slots": [
                    {"day": 2, "hour": 7, "isLab": 0},
                    {"day": 2, "hour": 8, "isLab": 0},
                ],
            }
        }


class UserSemesterModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str = Field(...)
    start_date: datetime = Field(...)
    end_date: datetime = Field(...)
    start_hour: str = Field(...)
    duration_lesson: int = Field(..., gt=0)
    duration_break: int = Field(..., gt=0)
    slot_count: int = Field(..., gt=3, lt=16)
    lessons: List[LessonModel] = []

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "name": "2020-21 Spring",
                "start_date": "2022-02-18T00:00:00Z",
                "end_date": "2022-06-18T00:00:00Z",
                "start_hour": "8.10",
                "duration_lesson": 50,
                "duration_break": 10,
                "slot_count": 12,
            }
        }


class UpdateUserSemesterModel(BaseModel):
    name: str = Field(...)
    start_date: datetime = Field(...)
    end_date: datetime = Field(...)
    start_hour: str = Field(...)
    duration_lesson: int = Field(..., gt=0)
    duration_break: int = Field(..., gt=0)
    slot_count: int = Field(..., gt=3, lt=16)

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "name": "2020-21 Spring",
                "start_date": "2022-02-18T00:00:00Z",
                "end_date": "2022-06-18T00:00:00Z",
                "start_hour": "8.10",
                "duration_lesson": 50,
                "duration_break": 10,
                "slot_count": 12,
            }
        }


class SemesterAPIModel(BaseModel):
    id: Optional[str] = Field(alias="_id")
    name: Optional[str]
    start_date: Optional[datetime]
    end_date: Optional[datetime]
    start_hour: Optional[str]
    duration_lesson: Optional[int]
    duration_break: Optional[int]
    slot_count: Optional[int]

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "_id": "61ddea901311ecaed99afb7c",
                "name": "2020-21 Spring",
                "start_date": "2022-02-18T00:00:00Z",
                "end_date": "2022-06-18T00:00:00Z",
                "start_hour": "8.10",
                "duration_lesson": 50,
                "duration_break": 10,
                "slot_count": 12,
            }
        }


class UserModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    email: EmailStr = Field(...)
    password: str = Field(...)
    full_name: str = Field(...)
    semesters: List[UserSemesterModel] = []

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "email": "hello@agu.edu.tr",
                "password": "123456",
                "full_name": "John Doe",
            }
        }


class UserAPIModel(BaseModel):
    id: Optional[str] = Field(alias="_id")
    email: Optional[EmailStr]
    full_name: Optional[str]
    current_gpa: Optional[float]
    user_group: Optional[str]
    current_semester_id: Optional[str]
    current_university_id: Optional[str]
    entrance_year: Optional[int]

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "_id": "61ddea901311ecaed99afb7c",
                "email": "hello@agu.edu.tr",
                "full_name": "John Doe",
                "current_gpa": 4.0,
                "user_group": "default",
                "current_semester_id": "61ddea901311ecaed99afb7d",
                "current_university_id": "61ddea901311ecaed99afb7e",
                "entrance_year": 2018,
            }
        }


class UpdatePasswordModel(BaseModel):
    password: str = Field(...)

    class Config:
        schema_extra = {"example": {"password": "123456",}}


class UpdateSemesterModel(BaseModel):
    current_semester_id: str = Field(...)

    class Config:
        schema_extra = {"example": {"current_semester_id": "61ddea901311ecaed99afb7f"}}


class UpdateEntranceYearModel(BaseModel):
    entrance_year: int = Field(...)

    class Config:
        schema_extra = {"example": {"entrance_year": 2018,}}


class UpdateUniversityModel(BaseModel):
    current_university_id: str = Field(...)

    class Config:
        schema_extra = {
            "example": {"current_university_id": "61ddea901311ecaed99afb7g"}
        }


class MessageCreate(BaseModel):
    id: str = Field(alias="_id")
    message: str

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {"_id": "61ddea901311ecaed99afb7c", "message": "string"}
        }


class Message(BaseModel):
    message: str
