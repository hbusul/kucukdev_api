from datetime import datetime
from typing import List, Optional

from bson import ObjectId
from pydantic import BaseModel, EmailStr, Field

from .PyObjectId import PyObjectId


class AbsenceModel(BaseModel):
    week: int = Field(..., ge=1)

    class Config:
        schema_extra = {"example": {"week": 1}}


class SlotModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    room: str = Field(max_length=127)
    day: int = Field(..., ge=0, le=4)  # TODO: check the value '4' later
    hour: int = Field(..., ge=0, le=15)
    is_lab: int = Field(..., ge=0, le=1)
    absences: List[int] = []

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {"example": {"room": "F0D01", "day": 2, "hour": 7, "is_lab": 0}}


class UpdateSlotModel(BaseModel):
    room: Optional[str] = Field(max_length=127)
    day: Optional[int] = Field(ge=0, le=4)  # TODO: check the value '4' later
    hour: Optional[int] = Field(ge=0, le=15)
    is_lab: Optional[int] = Field(ge=0, le=1)

    class Config:
        schema_extra = {"example": {"room": "F0D01", "day": 2, "hour": 7, "is_lab": 0}}


class SlotAPIModel(BaseModel):
    id: Optional[str] = Field(alias="_id")
    room: Optional[str]
    day: Optional[int]
    hour: Optional[int]
    is_lab: Optional[int]
    absences: Optional[List[int]]

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "_id": "61ddea901311ecaed99afb7c",
                "room": "F0D01",
                "day": 2,
                "hour": 7,
                "is_lab": 0,
                "absences": [1, 2],
            }
        }


class LessonModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str = Field(..., min_length=1, max_length=127)
    code: str = Field(..., min_length=1, max_length=127)
    instructor: str = Field(..., min_length=1, max_length=127)
    ects: int = Field(..., ge=0)
    grade: Optional[float] = Field(ge=0, le=10)
    absence_limit: Optional[int] = Field(ge=0)
    slots: List[SlotModel] = []

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "name": "Algebra",
                "code": "ALG",
                "instructor": "Jack Joe",
                "ects": 5,
                "grade": 3.67,
                "absence_limit": 21,
                "slots": [
                    {"room": "F0D01", "day": 2, "hour": 7, "is_lab": 0},
                    {"room": "F0D01", "day": 2, "hour": 8, "is_lab": 0},
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
    slots: Optional[List[SlotAPIModel]]

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
                "slots": [
                    {
                        "room": "F0D01",
                        "day": 2,
                        "hour": 7,
                        "is_lab": 0,
                        "absences": [1],
                    },
                    {
                        "room": "F0D01",
                        "day": 2,
                        "hour": 8,
                        "is_lab": 0,
                        "absences": [2],
                    },
                ],
            }
        }


class UpdateLessonModel(BaseModel):
    name: Optional[str] = Field(min_length=1, max_length=127)
    code: Optional[str] = Field(min_length=1, max_length=127)
    instructor: Optional[str] = Field(min_length=1, max_length=127)
    ects: Optional[int] = Field(ge=0)
    grade: Optional[float] = Field(ge=0, le=10)
    absence_limit: Optional[int] = Field(ge=0)

    class Config:
        schema_extra = {
            "example": {
                "name": "Algebra",
                "code": "ALG",
                "instructor": "Jack Joe",
                "ects": 5,
                "grade": 3.67,
                "absence_limit": 21,
            }
        }


class StartHourModel(BaseModel):
    hour: int = Field(..., ge=0, le=23)
    minute: int = Field(..., ge=0, le=59)

    class Confid:
        schema_extra = {"example": {"hour": 8, "minute": 20}}


class UpdateSemesterGPAModel(BaseModel):
    semester_gpa: float = Field(ge=0, le=10)

    class Config:
        schema_extra = {"example": {"semester_gpa": 3.67}}


class UserSemesterModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str = Field(..., min_length=1, max_length=127)
    start_date: datetime = Field(...)
    end_date: datetime = Field(...)
    start_hour: StartHourModel = Field(...)
    duration_lesson: int = Field(..., gt=0)
    duration_break: int = Field(..., gt=0)
    slot_count: int = Field(..., gt=3, lt=16)
    semester_gpa: float = Field(0.0, ge=0, le=10)
    lessons: List[LessonModel] = []

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {
            ObjectId: str,
            StartHourModel: lambda x: [x.hour, x.minute],
        }
        schema_extra = {
            "example": {
                "name": "2020-21 Spring",
                "start_date": "2022-02-18T00:00:00Z",
                "end_date": "2022-06-18T00:00:00Z",
                "start_hour": {"hour": 8, "minute": 20},
                "duration_lesson": 50,
                "duration_break": 10,
                "slot_count": 12,
            }
        }


class UpdateUserSemesterModel(BaseModel):
    name: Optional[str] = Field(min_length=1, max_length=127)
    start_date: Optional[datetime]
    end_date: Optional[datetime]
    start_hour: Optional[StartHourModel]
    duration_lesson: Optional[int] = Field(gt=0)
    duration_break: Optional[int] = Field(gt=0)
    slot_count: Optional[int] = Field(gt=3, lt=16)
    semester_gpa: Optional[float] = Field(ge=0, le=10)

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {
            StartHourModel: lambda x: [x.hour, x.minute],
        }
        schema_extra = {
            "example": {
                "name": "2020-21 Spring",
                "start_date": "2022-02-18T00:00:00Z",
                "end_date": "2022-06-18T00:00:00Z",
                "start_hour": {"hour": 8, "minute": 20},
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
    start_hour: Optional[List[int]]
    duration_lesson: Optional[int]
    duration_break: Optional[int]
    slot_count: Optional[int]
    semester_gpa: Optional[float]

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "_id": "61ddea901311ecaed99afb7c",
                "name": "2020-21 Spring",
                "start_date": "2022-02-18T00:00:00Z",
                "end_date": "2022-06-18T00:00:00Z",
                "start_hour": [8, 20],
                "duration_lesson": 50,
                "duration_break": 10,
                "slot_count": 12,
                "semester_gpa": 3.67,
            }
        }


class UserModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    email: EmailStr = Field(...)
    password: str = Field(...)
    first_name: str = Field(..., min_length=3, max_length=127)
    last_name: str = Field(..., min_length=3, max_length=127)
    current_gpa: float = Field(0, ge=0, le=10.0)
    current_semester_id: str = "null"
    current_university_id: str = "null"
    entrance_year: int = Field(2010, gt=2000)
    semesters: List[UserSemesterModel] = []

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "email": "hello@agu.edu.tr",
                "password": "123456",
                "first_name": "John",
                "last_name": "Doe",
            }
        }


class UserAPIModel(BaseModel):
    id: Optional[str] = Field(alias="_id")
    email: Optional[EmailStr]
    first_name: Optional[str]
    last_name: Optional[str]
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
                "first_name": "John",
                "last_name": "Doe",
                "current_gpa": 3.67,
                "user_group": "default",
                "current_semester_id": "61ddea901311ecaed99afb7d",
                "current_university_id": "61ddea901311ecaed99afb7e",
                "entrance_year": 2018,
            }
        }


class UpdatePasswordModel(BaseModel):
    password: str = Field(...)

    class Config:
        schema_extra = {"example": {"password": "123456"}}


class UpdateUserNameModel(BaseModel):
    first_name: str = Field(..., min_length=3, max_length=127)
    last_name: str = Field(..., min_length=3, max_length=127)

    class Config:
        schema_extra = {"example": {"first_name": "John", "last_name": "Doe"}}


class UpdateSemesterModel(BaseModel):
    current_semester_id: str = Field(...)

    class Config:
        schema_extra = {"example": {"current_semester_id": "61ddea901311ecaed99afb7f"}}


class UpdateEntranceYearModel(BaseModel):
    entrance_year: int = Field(..., gt=2000)

    class Config:
        schema_extra = {"example": {"entrance_year": 2018}}


class UpdateUniversityModel(BaseModel):
    current_university_id: str = Field(...)

    class Config:
        schema_extra = {
            "example": {"current_university_id": "61ddea901311ecaed99afb7g"}
        }


class UpdateCurrentGPAModel(BaseModel):
    current_gpa: float = Field(..., ge=0, le=10.0)

    class Config:
        schema_extra = {"example": {"current_gpa": 3.67}}


class UpdateUserGroupModel(BaseModel):
    user_group: str = Field(...)

    class Config:
        schema_extra = {"example": {"user_group": "professor",}}


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
