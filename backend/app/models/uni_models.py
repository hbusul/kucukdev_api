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
    section: int = Field(..., ge=0)
    instructor: str = Field(..., min_length=1, max_length=127)
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
                "section": 1,
                "instructor": "Jack Joe",
                "slots": [
                    {"day": 2, "hour": 7, "isLab": 0},
                    {"day": 2, "hour": 8, "isLab": 0},
                ],
            }
        }


class UniversitySectionAPIModel(BaseModel):
    id: Optional[str] = Field(alias="_id")
    section: Optional[int]
    instructor: Optional[str]
    slots: Optional[List[List[int]]]

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "section": 1,
                "instructor": "Jack Joe",
                "slots": [[2, 7, 0], [2, 8, 0]],
            }
        }


class UniversityLessonModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str = Field(..., min_length=1, max_length=127)
    code: str = Field(..., min_length=1, max_length=10)
    ects: float = Field(..., ge=0)
    absence_limit: int = Field(..., ge=0)
    section: int = Field(..., ge=0)
    instructor: str = Field(..., min_length=1, max_length=127)
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
                "absence_limit": 8,
                "section": 1,
                "instructor": "Jack Joe",
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
    absence_limit: int = Field(..., ge=0)
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
                "absence_limit": 0,
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


class CurriculumLessonModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str = Field(..., min_length=1, max_length=100)
    code: str = Field(..., min_length=1, max_length=100)
    lesson_type: str = Field(..., min_length=1, max_length=30)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {"name": "PHYSICS I", "code": "PHYS101", "lesson_type": "science"}
        }


class CurriculumSemesterModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    semester: int = Field(..., gt=0, lt=20)
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
    start_year: int = Field(...)
    end_year: int = Field(...)
    semesters: List[CurriculumSemesterModel] = []

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {"name": "2016 Later", "start_year": 2016, "end_year": 2100}
        }


class UniversityDepartmentModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str = Field(..., min_length=2 ,max_length=100)  
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
    name: str = Field(..., min_length=2, max_length=100)
    domain: str = Field(..., min_length=5, max_length=100),
    country: str = Field(..., min_length=2, max_length=100),
    city: str = Field(..., min_length=2, max_length=100),
    address: str = Field(..., min_length=2, max_length=100),
    zip_code: str = Field(..., min_length=2, max_length=100),
    description: str = Field(..., max_length=255),
    logo: str = Field(..., max_length=255),
    cover_photo: str = Field(..., max_length=255),
    departments: List[UniversityDepartmentModel] = []
    semesters: List[UniversitySemesterModel] = []

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "name": "Test University",
                "domain": "test.com",
                "country": "USA",
                "city": "Los Angeles",
                "address": "123 Main Street",
                "zip_code": "90210",
                "description": "Test University Description",
                "logo": "test_logo.png",
                "cover_photo": "test_cover_photo.png",
            }
        }


class UniversityAPIModel(BaseModel):
    id: Optional[str] = Field(alias="_id")
    name: Optional[str]
    domain: Optional[str]  
    country: Optional[str] 
    city: Optional[str] 
    address: Optional[str] 
    zip_code: Optional[str]
    description: Optional[str] 
    logo: Optional[str] 
    cover_photo: Optional[str] 
    cur_semester_id: Optional[str]

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "_id": "61fc266ae3d749b1d65c17c6",
                "name": "Test University",
                "domain": "test.com",
                "country": "USA",
                "city": "Los Angeles",
                "address": "123 Main Street",
                "zip_code": "90210",
                "description": "Test University Description",
                "logo": "test_logo.png",
                "cover_photo": "test_cover_photo.png",
                "cur_semester_id": "61fc266ae3d749b1d65c17c7",
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
