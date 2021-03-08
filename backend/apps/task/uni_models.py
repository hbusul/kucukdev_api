from typing import Optional, List, Dict
import uuid
from pydantic import BaseModel, Field


class UniversitySectionModel(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    section: str = Field(...)
    instructor: str = Field(...)
    slots: List[str] = Field(...)

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "section": "01",
                "instructor": "Ali Veli",
                "slots": ["2,7,0", "2,8,0"],
            }
        }


class UniversityLessonModel(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    name: str = Field(...)
    code: str = Field(...)
    ects: float = Field(...)
    absenceLimit: int = Field(...)
    section: str = Field(...)
    instructor: str = Field(...)
    slots: List[str] = Field(...)

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "name": "ART OF COMPUTING",
                "code": "COMP101",
                "ects": 6,
                "absenceLimit": 0,
                "section": "01",
                "instructor": "Ali Veli",
                "slots": ["2,7,0", "2,8,0"],
            }
        }


class UniversityAPILessonModel(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    name: str = Field(...)
    code: str = Field(...)
    ects: float = Field(...)
    absenceLimit: int = Field(...)
    sections: List[UniversitySectionModel] = []

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "name": "ART OF COMPUTING",
                "code": "COMP101",
                "ects": 6,
                "absenceLimit": 0,
            }
        }


class UniversitySemesterModel(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    name: str = Field(...)
    lessons: List[UniversityAPILessonModel] = []

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "name": "20-21 Spring",
            }
        }


class UniversityModel(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    name: str = Field(...)
    semesters: List[UniversitySemesterModel] = []

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "name": "AGU",
            }
        }


class UpdateUniversityNameModel(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    name: str = Field(...)

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "name": "AGU",
            }
        }


class UniversityAPIModel(BaseModel):
    id: Optional[str]
    name: Optional[str]
    currentSemester: Optional[str]