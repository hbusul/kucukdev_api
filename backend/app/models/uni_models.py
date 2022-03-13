from typing import List, Optional

from bson import ObjectId
from pydantic import BaseModel, Field

from .PyObjectId import PyObjectId


class UniversitySlotModel(BaseModel):
    room: str = Field(max_length=100)
    day: int = Field(..., ge=0, le=4)
    hour: int = Field(..., ge=0, le=15)
    is_lab: int = Field(..., ge=0, le=1)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {"example": {"room": "F0D01", "day": 2, "hour": 7, "is_lab": 0}}


class UniversitySectionModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    number: int = Field(..., ge=0)
    instructor: str = Field(..., min_length=1, max_length=127)
    slots: List[UniversitySlotModel] = []

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "number": 1,
                "instructor": "Jack Joe",
                "slots": [
                    {"room": "F0D01", "day": 2, "hour": 7, "is_lab": 0},
                    {"room": "F0D01", "day": 2, "hour": 8, "is_lab": 0},
                ],
            }
        }


class UniversitySectionAPIModel(BaseModel):
    id: Optional[str] = Field(alias="_id")
    number: Optional[int]
    instructor: Optional[str]
    slots: Optional[List[UniversitySlotModel]]

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "number": 1,
                "instructor": "Jack Joe",
                "slots": [
                    {"room": "F0D01", "day": 2, "hour": 7, "is_lab": 0,},
                    {"room": "F0D01", "day": 2, "hour": 8, "is_lab": 0,},
                ],
            }
        }


class UniversityLessonModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str = Field(..., min_length=1, max_length=127)
    code: str = Field(..., min_length=1, max_length=10)
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
                "absence_limit": 8,
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
                "_id": "61ddea901311ecaed99afb7c",
                "name": "ART OF COMPUTING",
                "code": "COMP101",
                "ects": 6,
                "absence_limit": 0,
                "sections": [
                    {
                        "_id": "61ddea901311ecaed99afb7c",
                        "number": 1,
                        "instructor": "Jack Joe",
                        "slots": [
                            {"room": "F0D01", "day": 2, "hour": 7, "is_lab": 0,},
                            {"room": "F0D01", "day": 2, "hour": 8, "is_lab": 0,},
                        ],
                    }
                ],
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
        schema_extra = {"example": {"name": "20-21 Spring",}}


class UniversitySemesterAPIModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {"_id": "61fc266ae3d749b1d65c17c6", "name": "20-21 Spring",}
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
            "example": {
                "name": "PHYSICS I",
                "code": "PHYS101",
                "lesson_type": "science",
            }
        }


class CurriculumSemesterModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    number: int = Field(..., gt=0, lt=20)
    lessons: List[CurriculumLessonModel] = []

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {"example": {"number": 1,}}


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
    name: str = Field(..., min_length=2, max_length=100)
    curriculums: List[UniversityCurriculumModel] = []

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {"example": {"name": "COMP",}}


class UniversityModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str = Field(..., min_length=2, max_length=100)
    website: str = Field(..., min_length=5, max_length=255)
    country: str = Field(..., min_length=2, max_length=100)
    city: str = Field(..., min_length=2, max_length=100)
    address: str = Field(..., min_length=2, max_length=100)
    phone: str = Field(..., min_length=2, max_length=100)
    email: str = Field(..., min_length=2, max_length=100)
    zip_code: str = Field(..., min_length=2, max_length=100)
    description: str = Field(..., max_length=255)
    logo: str = Field(..., max_length=255)
    cover_photo: str = Field(..., max_length=255)
    departments: List[UniversityDepartmentModel] = []
    semesters: List[UniversitySemesterModel] = []

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "name": "Test University",
                "website": "test.com",
                "country": "USA",
                "city": "Los Angeles",
                "address": "123 Main Street",
                "phone": "555-555-5555",
                "email": "info@test.com",
                "zip_code": "90210",
                "description": "Test University Description",
                "logo": "test_logo.png",
                "cover_photo": "test_cover_photo.png",
            }
        }


class UniversityAPIModel(BaseModel):
    id: Optional[str] = Field(alias="_id")
    name: Optional[str]
    website: Optional[str]
    country: Optional[str]
    city: Optional[str]
    address: Optional[str]
    phone: Optional[str]
    email: Optional[str]
    zip_code: Optional[str]
    description: Optional[str]
    logo: Optional[str]
    cover_photo: Optional[str]
    current_semester_id: Optional[str]

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "_id": "61fc266ae3d749b1d65c17c6",
                "name": "Test University",
                "website": "test.com",
                "country": "USA",
                "city": "Los Angeles",
                "address": "123 Main Street",
                "phone": "555-555-5555",
                "email": "info@test.com",
                "zip_code": "90210",
                "description": "Test University Description",
                "logo": "test_logo.png",
                "cover_photo": "test_cover_photo.png",
                "current_semester_id": "61fc266ae3d749b1d65c17c7",
            }
        }


class UpdateUniversityModel(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    website: str = Field(..., min_length=5, max_length=255)
    country: str = Field(..., min_length=2, max_length=100)
    city: str = Field(..., min_length=2, max_length=100)
    address: str = Field(..., min_length=2, max_length=100)
    phone: str = Field(..., min_length=2, max_length=100)
    email: str = Field(..., min_length=2, max_length=100)
    zip_code: str = Field(..., min_length=2, max_length=100)
    description: str = Field(..., max_length=255)
    logo: str = Field(..., max_length=255)
    cover_photo: str = Field(..., max_length=255)

    class Config:
        schema_extra = {
            "example": {
                "name": "Test University",
                "website": "test.com",
                "country": "USA",
                "city": "Los Angeles",
                "address": "123 Main Street",
                "phone": "555-555-5555",
                "email": "info@test.com",
                "zip_code": "90210",
                "description": "Test University Description",
                "logo": "test_logo.png",
                "cover_photo": "test_cover_photo.png",
            }
        }


class UpdateCurrentSemesterModel(BaseModel):
    current_semester_id: str = Field(...)

    class Config:
        schema_extra = {"example": {"current_semester_id": "61ddea901311ecaed99afb7f"}}
