from typing import Optional, List
from pydantic import BaseModel, Field
from datetime import datetime
from bson import ObjectId

from .PyObjectId import PyObjectId


class UniversitySlotModel(BaseModel):
    day: int = Field(..., ge=0, le=4)
    hour: int = Field(..., ge=0, le=15)
    isLab: int = Field(..., ge=0, le=1)


class UniversitySectionModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    section: str = Field(...)
    instructor: str = Field(...)
    slots: List[UniversitySlotModel] = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {
            ObjectId: str,
            UniversitySlotModel: lambda x: [x.day, x.hour, x.isLab],
        }
        schema_extra = {
            "example": {
                "section": "01",
                "instructor": "JACK JOE",
                "slots": [
                    {"day": 2, "hour": 7, "isLab": 0},
                    {"day": 2, "hour": 8, "isLab": 0},
                ],
            }
        }


class UniversitySectionAPIModel(BaseModel):
    id: Optional[str] = Field(alias="_id")
    section: Optional[str]
    instructor: Optional[str]
    slots: Optional[List[List[int]]]

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "section": "01",
                "instructor": "JACK JOE",
                "slots": [[2, 7, 0], [2, 8, 0]],
            }
        }


class UniversityLessonModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str = Field(...)
    code: str = Field(...)
    ects: float = Field(..., ge=0)
    absenceLimit: int = Field(..., ge=0)
    section: str = Field(...)
    instructor: str = Field(...)
    slots: List[UniversitySlotModel] = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {
            ObjectId: str,
            UniversitySlotModel: lambda x: [x.day, x.hour, x.isLab],
        }
        schema_extra = {
            "example": {
                "name": "ART OF COMPUTING",
                "code": "COMP101",
                "ects": 6,
                "absenceLimit": 8,
                "section": "01",
                "instructor": "JACK JOE",
                "slots": [
                    {"day": 2, "hour": 7, "isLab": 0},
                    {"day": 2, "hour": 8, "isLab": 0},
                ],
            }
        }


class UniversityLessonAPIModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str = Field(...)
    code: str = Field(...)
    ects: float = Field(..., ge=0)
    absenceLimit: int = Field(..., ge=0)
    sections: List[UniversitySectionAPIModel] = []

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "name": "ART OF COMPUTING",
                "code": "COMP101",
                "ects": 6,
                "absenceLimit": 0,
            }
        }


class UniversitySemesterModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str = Field(...)
    lessons: List[UniversityLessonAPIModel] = []

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "name": "20-21 Spring",
            }
        }


class UniversitySemesterAPIModel(BaseModel):
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


class CurriculumLessonModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str = Field(...)
    code: str = Field(...)
    lessonType: str = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {"name": "PHYSICS I", "code": "PHYS101", "lessonType": "science"}
        }


class CurriculumSemesterModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    semester: int = Field(..., gt=0, lt=9)
    lessons: List[CurriculumLessonModel] = []

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "semester": 1,
            }
        }


class UniversityCurriculumModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str = Field(..., min_length=1)
    startYear: int = Field(...)
    endYear: int = Field(...)
    semesters: List[CurriculumSemesterModel] = []

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {"name": "2016 Later", "startYear": 2016, "endYear": 2100}
        }


class UniversityDepartmentModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str = Field(..., min_length=2 ,max_length=100,)  
    curriculums: List[UniversityCurriculumModel] = []

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "name": "COMP",
            }
        }


class UniversityModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str = Field(...)
    departments: List[UniversityDepartmentModel] = []
    semesters: List[UniversitySemesterModel] = []

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "name": "AGU",
            }
        }


class UniversityAPIModel(BaseModel):
    id: Optional[str] = Field(alias="_id")
    name: Optional[str]
    curSemesterID: Optional[str]

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "_id": "61fc266ae3d749b1d65c17c6",
                "name": "AGU",
                "curSemesterID": "61fc266ae3d749b1d65c17c7",
            }
        }


class UpdateUniversityNameModel(BaseModel):
    name: str = Field(...)

    class Config:
        schema_extra = {
            "example": {
                "name": "AGU",
            }
        }
