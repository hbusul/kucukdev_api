from typing import Optional, List
from pydantic import BaseModel, Field
from bson import ObjectId

from .PyObjectId import PyObjectId


class UniversitySectionModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    section: str = Field(...)
    instructor: str = Field(...)
    slots: List[str] = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "section": "01",
                "instructor": "Ali Veli",
                "slots": ["2,7,0", "2,8,0"],
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
    slots: List[str] = Field(...)

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
                "section": "01",
                "instructor": "Ali Veli",
                "slots": ["2,7,0", "2,8,0"],
            }
        }


class UniversityAPILessonModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str = Field(...)
    code: str = Field(...)
    ects: float = Field(..., ge=0)
    absenceLimit: int = Field(..., ge=0)
    sections: List[UniversitySectionModel] = []

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
    lessons: List[UniversityAPILessonModel] = []

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "name": "20-21 Spring",
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
    name: str = Field(...)
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
    name: str = Field(...)
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
                "_id": "c765c307-560c-47ab-b29e-0a1265eab860",
                "name": "AGU",
                "curSemesterID": "stringID",
            }
        }


class UpdateUniversityNameModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "name": "AGU",
            }
        }