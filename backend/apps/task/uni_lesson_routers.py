from fastapi import (
    APIRouter,
    Body,
    Request,
    HTTPException,
    status,
    Response,
    Depends,
    Request,
)
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from passlib.hash import bcrypt
from pydantic import BaseModel
from typing import List
from jose import JWTError, jwt

from .uni_models import (
    UniversityLessonModel,
    UniversityAPILessonModel,
    UniversitySectionModel,
)
from .user_models import Message

router = APIRouter()


@router.post(
    "{unid}/semesters/{unisid}/lessons",
    response_description="Add new university lesson",
    operation_id="createUniversityLesson",
    response_model=Message,
    responses={
        404: {"model": Message},
    },
)
async def create_university_lesson(
    unid: str,
    unisid: str,
    request: Request,
    university_lesson: UniversityLessonModel = Body(...),
):
    """Create a lesson for a semester of a university with given universityID and universitySemesterID"""

    university_lesson = jsonable_encoder(university_lesson)

    section = UniversitySectionModel(
        section=university_lesson["section"],
        instructor=university_lesson["instructor"],
        slots=university_lesson["slots"],
    )

    jsonable_section = jsonable_encoder(section)

    if (
        existing_university := await request.app.mongodb["universities"].find_one(
            {"_id": unid, "semesters._id": unisid}
        )
    ) is not None:
        for semester in existing_university["semesters"]:
            if semester["_id"] == unisid:
                for lesson in semester["lessons"]:
                    if lesson["code"] == university_lesson["code"]:
                        update_result = await request.app.mongodb[
                            "universities"
                        ].update_one(
                            {
                                "_id": unid,
                                "semesters._id": unisid,
                                "semesters.lessons._id": lesson["_id"],
                            },
                            {
                                "$push": {
                                    "semesters.$[i].lessons.$[j].sections": jsonable_section
                                }
                            },
                            array_filters=[{"i._id": unisid}, {"j._id": lesson["_id"]}],
                        )

                        return JSONResponse(
                            status_code=status.HTTP_200_OK,
                            content={"message": "New section added"},
                        )

    lessonAPI = UniversityAPILessonModel(
        name=university_lesson["name"],
        code=university_lesson["code"],
        ects=university_lesson["ects"],
        absenceLimit=university_lesson["absenceLimit"],
        sections=[],
    )
    jsonable_lessonAPI = jsonable_encoder(lessonAPI)

    update_result = await request.app.mongodb["universities"].update_one(
        {"_id": unid, "semesters._id": unisid},
        {"$push": {"semesters.$.lessons": jsonable_lessonAPI}},
    )

    if update_result.modified_count == 1:
        if (
            created_university := await request.app.mongodb["universities"].find_one(
                {
                    "_id": unid,
                    "semesters._id": unisid,
                }
            )
        ) is not None:
            for semester in created_university["semesters"]:
                if semester["_id"] == unisid:
                    for lesson in semester["lessons"]:
                        if lesson["code"] == university_lesson["code"]:
                            update_result = await request.app.mongodb[
                                "universities"
                            ].update_one(
                                {
                                    "_id": unid,
                                    "semesters._id": unisid,
                                    "semesters.lessons._id": lesson["_id"],
                                },
                                {
                                    "$push": {
                                        "semesters.$[i].lessons.$[j].sections": jsonable_section
                                    }
                                },
                                array_filters=[
                                    {"i._id": unisid},
                                    {"j._id": lesson["_id"]},
                                ],
                            )

                            return JSONResponse(
                                status_code=status.HTTP_200_OK,
                                content={"message": "New lesson added"},
                            )

    return JSONResponse(
        status_code=status.HTTP_404_NOT_FOUND,
        content={"message": "University semester not found"},
    )


@router.get(
    "{unid}/semesters/{unisid}/lessons",
    response_description="List all lessons of a university semester",
    operation_id="listUniversitySemesterLessons",
    response_model=List[UniversityAPILessonModel],
    responses={
        404: {"model": Message},
    },
)
async def list_university_semester_lessons(unid: str, unisid: str, request: Request):
    """list all lessons for a semesters of a university with given universityID and universitySemesterID"""

    if (
        university := await request.app.mongodb["universities"].find_one(
            {"_id": unid, "semesters._id": unisid}
        )
    ) is not None:
        for semester in university["semesters"]:
            if semester["_id"] == unisid:
                return JSONResponse(
                    status_code=status.HTTP_200_OK,
                    content=semester["lessons"],
                )

    return JSONResponse(
        status_code=status.HTTP_404_NOT_FOUND,
        content={"message": "Semester not found"},
    )


@router.get(
    "{unid}/semesters{unisid}/lessons/{unilid}",
    response_description="Get a single lessons of a university semester",
    operation_id="getSingleUniversitySemesterLesson",
    response_model=UniversityAPILessonModel,
    responses={
        404: {"model": Message},
    },
)
async def show_university_semester_lesson(
    unid: str, unisid: str, unilid: str, request: Request
):
    """list all lessons for a semesters of a university with given universityID and universitySemesterID"""

    if (
        university := await request.app.mongodb["universities"].find_one(
            {"_id": unid, "semesters._id": unisid, "semesters.lessons._id": unilid}
        )
    ) is not None:
        for semester in university["semesters"]:
            if semester["_id"] == unisid:
                for lesson in semester["lessons"]:
                    if lesson["_id"] == unilid:
                        return JSONResponse(
                            status_code=status.HTTP_200_OK,
                            content=lesson,
                        )

    return JSONResponse(
        status_code=status.HTTP_404_NOT_FOUND,
        content={"message": "Semester not found"},
    )