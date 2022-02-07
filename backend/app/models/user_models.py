from typing import Optional, List
from pydantic import BaseModel, Field, EmailStr
from datetime import datetime
from bson import ObjectId

from .PyObjectId import PyObjectId


class SlotModel(BaseModel):
    day: int = Field(..., ge=0, le=4)
    hour: int = Field(..., ge=0, le=15)
    isLab: int = Field(..., ge=0, le=1)


class AbsenceModel(BaseModel):
    week: int = Field(..., ge=0)
    day: int = Field(..., ge=0, le=4)
    hour: int = Field(..., ge=0, le=15)
    isLab: int = Field(..., ge=0, le=1)


class LessonAbsenceModel(BaseModel):
    absence: AbsenceModel = Field(...)

    class Config:
        json_encoders = {
            AbsenceModel: lambda x: [x.week, x.day, x.hour, x.isLab],
        }
        schema_extra = {
            "example": {
                "absence": {"week": 0, "day": 2, "hour": 7, "isLab": 0},
            }
        }


class LessonModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str = Field(..., min_length=1)
    instructor: str = Field(..., min_length=1)
    absenceLimit: int = Field(..., ge=0)
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
                "instructor": "Jack Joe",
                "absenceLimit": 21,
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
    instructor: Optional[str]
    absenceLimit: Optional[int]
    slots: Optional[List[List[int]]]
    absences: Optional[List[List[int]]]

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "_id": "61ddea901311ecaed99afb7c",
                "name": "Algebra",
                "instructor": "Jack Joe",
                "absenceLimit": 21,
                "slots": [[2, 7, 0], [2, 8, 0]],
                "absences": [[0, 2, 7, 0], [0, 2, 8, 0]],
            }
        }


class UpdateLessonModel(BaseModel):
    name: str = Field(...)
    instructor: str = Field(...)
    absenceLimit: int = Field(..., ge=0)
    slots: List[SlotModel] = Field(...)

    class Config:
        json_encoders = {
            SlotModel: lambda x: [x.day, x.hour, x.isLab],
        }
        schema_extra = {
            "example": {
                "name": "Algebra",
                "instructor": "Jack Joe",
                "absenceLimit": 21,
                "slots": [
                    {"day": 2, "hour": 7, "isLab": 0},
                    {"day": 2, "hour": 8, "isLab": 0},
                ],
            }
        }


class UserSemesterModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str = Field(...)
    startDate: datetime = Field(...)
    endDate: datetime = Field(...)
    startHour: str = Field(...)
    dLesson: int = Field(..., gt=0)
    dBreak: int = Field(..., gt=0)
    slotCount: int = Field(..., gt=3, lt=16)
    lessons: List[LessonModel] = []

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "name": "2020-21 Spring",
                "startDate": "2022-02-18T00:00:00Z",
                "endDate": "2022-06-18T00:00:00Z",
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
    dLesson: int = Field(..., gt=0)
    dBreak: int = Field(..., gt=0)
    slotCount: int = Field(..., gt=3, lt=16)

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "name": "2020-21 Spring",
                "startDate": "2022-02-18T00:00:00Z",
                "endDate": "2022-06-18T00:00:00Z",
                "startHour": "8.10",
                "dLesson": 50,
                "dBreak": 10,
                "slotCount": 12,
            }
        }


class SemesterAPIModel(BaseModel):
    id: Optional[str] = Field(alias="_id")
    name: Optional[str]
    startDate: Optional[datetime]
    endDate: Optional[datetime]
    startHour: Optional[str]
    dLesson: Optional[int]
    dBreak: Optional[int]
    slotCount: Optional[int]

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "_id": "61ddea901311ecaed99afb7c",
                "name": "2020-21 Spring",
                "startDate": "2022-02-18T00:00:00Z",
                "endDate": "2022-06-18T00:00:00Z",
                "startHour": "8.10",
                "dLesson": 50,
                "dBreak": 10,
                "slotCount": 12,
            }
        }


class UserModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    email: EmailStr = Field(...)
    password: str = Field(...)
    semesters: List[UserSemesterModel] = []

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "email": "hello@agu.edu.tr",
                "password": "hello1234",
            }
        }


class UserAPIModel(BaseModel):
    id: Optional[str] = Field(alias="_id")
    email: Optional[EmailStr]
    userGroup: Optional[str]
    curSemesterID: Optional[str]
    curUniversityID: Optional[str]
    entranceYear: Optional[int]

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "_id": "61ddea901311ecaed99afb7c",
                "email": "hello@agu.edu.tr",
                "userGroup": "default",
                "curSemesterID": "61ddea901311ecaed99afb7d",
                "curUniversityID": "61ddea901311ecaed99afb7e",
                "entranceYear": 2018,
            }
        }


class UpdatePasswordModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    password: str = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "password": "123456",
            }
        }


class UpdateSemesterModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    curSemesterID: str = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "curSemesterID": "61ddea901311ecaed99afb7f",
            }
        }


class UpdateEntranceYearModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    entranceYear: int = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "entranceYear": 2018,
            }
        }


class UpdateUniversityModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    curUniversityID: str = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "curUniversityID": "61ddea901311ecaed99afb7g",
            }
        }


class MessageCreate(BaseModel):
    _id: str
    message: str

    class Config:
        schema_extra = {
            "example": {
                "_id": "61ddea901311ecaed99afb7c",
                "message": "string",
            }
        }


class Message(BaseModel):
    message: str
