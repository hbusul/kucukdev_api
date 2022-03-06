import json
from typing import List

from fastapi import APIRouter, Body, Depends, Request, status
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

from ...dependencies import get_current_user
from ...models.uni_models import (
    UniversityLessonAPIModel,
    UniversityLessonModel,
)
from ...models.user_models import Message, MessageCreate, UserModel

router = APIRouter()


@router.post(
    "/{unid}/semesters/{unisid}/lessons",
    response_description="Add new university lesson",
    operation_id="createUniversityLesson",
    response_model=MessageCreate,
    responses={
        201: {"model": MessageCreate},
        403: {"model": Message},
        404: {"model": Message},
        409: {"model": Message},
    },
)
async def create_university_lesson(
    unid: str,
    unisid: str,
    request: Request,
    university_lesson: UniversityLessonModel = Body(...),
    auth_user: UserModel = Depends(get_current_user),
):
    """Create a lesson for a semester of a university with given universityID and universitySemesterID"""

    if auth_user["user_group"] == "professor":
        university_lesson = jsonable_encoder(university_lesson)

        update_result = await request.app.mongodb["universities"].update_one(
            {"_id": unid, "semesters._id": unisid},
            {"$push": {"semesters.$.lessons": university_lesson}},
        )

        if update_result.modified_count == 1:
            return JSONResponse(
                status_code=status.HTTP_201_CREATED,
                content=jsonable_encoder(
                    MessageCreate(
                        id=university_lesson["_id"],
                        message="University lesson created",
                    )
                ),
            )

        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "University semester not found"},
        )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )


@router.get(
    "/{unid}/semesters/current-semester/lessons/find-code",
    response_description="Get a single lessons with code",
    operation_id="getSingleLessonWithCode",
    response_model=UniversityLessonAPIModel,
    responses={404: {"model": Message},},
)
async def show_lesson_with_code(unid: str, code: str, request: Request):
    """Get a single lesson of a university semester with given universityID and Lesson Code"""

    if university := (
        await (
            request.app.mongodb["universities"]
            .aggregate(
                [
                    {"$match": {"_id": unid, "semesters.lessons.code": code,},},
                    {"$unwind": "$semesters"},
                    {"$unwind": "$semesters.lessons"},
                    {"$match": {"semesters.lessons.code": code,},},
                ]
            )
            .to_list(length=None)
        )
    ):
        return university[0]["semesters"]["lessons"]

    return JSONResponse(
        status_code=status.HTTP_404_NOT_FOUND,
        content={"message": "University lesson not found"},
    )


@router.get(
    "/{unid}/semesters/{unisid}/lessons",
    response_description="List all lessons of a university semester",
    operation_id="listUniversitySemesterLessons",
    response_model=List[UniversityLessonAPIModel],
    responses={404: {"model": Message},},
)
async def list_university_lessons(unid: str, unisid: str, request: Request):
    """list all lessons for a semesters of a university with given universityID and universitySemesterID"""

    if university := (
        await (
            request.app.mongodb["universities"]
            .aggregate(
                [
                    {"$match": {"_id": unid, "semesters._id": unisid,},},
                    {"$unwind": "$semesters"},
                    {"$match": {"semesters._id": unisid,},},
                ]
            )
            .to_list(length=None)
        )
    ):
        return university[0]["semesters"]["lessons"]

    return JSONResponse(
        status_code=status.HTTP_404_NOT_FOUND,
        content={"message": "University semester not found"},
    )


@router.get(
    "/{unid}/semesters/{unisid}/lessons/{unilid}",
    response_description="Get a single lessons of a university semester",
    operation_id="getSingleUniversitySemesterLesson",
    response_model=UniversityLessonAPIModel,
    responses={404: {"model": Message},},
)
async def show_university_lesson(unid: str, unisid: str, unilid: str, request: Request):
    """Get a single lesson of a university semester with given universityID, universitySemesterID and universityLessonID"""

    if university := (
        await (
            request.app.mongodb["universities"]
            .aggregate(
                [
                    {
                        "$match": {
                            "_id": unid,
                            "semesters._id": unisid,
                            "semesters.lessons._id": unilid,
                        },
                    },
                    {"$unwind": "$semesters"},
                    {"$unwind": "$semesters.lessons"},
                    {"$match": {"semesters.lessons._id": unilid,},},
                ]
            )
            .to_list(length=None)
        )
    ):
        return university[0]["semesters"]["lessons"]

    return JSONResponse(
        status_code=status.HTTP_404_NOT_FOUND,
        content={"message": "University lesson not found"},
    )


@router.put(
    "/{unid}/semesters/{unisid}/lessons/{unilid}",
    response_description="Update a university lesson",
    operation_id="updateUniversityLesson",
    response_model=Message,
    responses={
        404: {"model": Message},
        403: {"model": Message},
        400: {"model": Message},
    },
)
async def update_university_lesson(
    unid: str,
    unisid: str,
    unilid: str,
    request: Request,
    university_lesson: UniversityLessonModel = Body(...),
    auth_user: UserModel = Depends(get_current_user),
):
    """Update lesson of a university semester with given universityID, universitySemesterID and universityLessonID"""

    if auth_user["user_group"] == "professor":
        university_lesson = university_lesson.json(by_alias=True, models_as_dict=False)
        university_lesson = json.loads(university_lesson.replace("\\", ""))

        if (
            (
                await (
                    request.app.mongodb["universities"]
                    .aggregate(
                        [
                            {
                                "$match": {
                                    "_id": unid,
                                    "semesters._id": unisid,
                                    "semesters.lessons._id": unilid,
                                },
                            },
                            {"$unwind": "$semesters"},
                            {"$unwind": "$semesters.lessons"},
                            {
                                "$match": {
                                    "semesters.lessons._id": unilid,
                                    "semesters.lessons.code": university_lesson["code"],
                                },
                            },
                        ]
                    )
                    .to_list(length=None)
                )
            )
            == []
            and (
                await request.app.mongodb["universities"].find_one(
                    {
                        "_id": unid,
                        "semesters._id": unisid,
                        "semesters.lessons.code": university_lesson["code"],
                    }
                )
            )
            is not None
        ):
            return JSONResponse(
                status_code=status.HTTP_409_CONFLICT,
                content={
                    "message": "University lesson could not be found or there exists another lesson with given code"
                },
            )

        update_result = await request.app.mongodb["universities"].update_one(
            {"_id": unid, "semesters._id": unisid, "semesters.lessons._id": unilid,},
            {
                "$set": {
                    "semesters.$[i].lessons.$[j].name": university_lesson["name"],
                    "semesters.$[i].lessons.$[j].code": university_lesson["code"],
                    "semesters.$[i].lessons.$[j].ects": university_lesson["ects"],
                    "semesters.$[i].lessons.$[j].absence_limit": university_lesson[
                        "absence_limit"
                    ],
                }
            },
            array_filters=[{"i._id": unisid}, {"j._id": unilid}],
        )

        if update_result.modified_count == 1:
            return JSONResponse(
                status_code=status.HTTP_200_OK,
                content={"message": "University lesson updated"},
            )

        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"message": "University lesson could not be updated"},
        )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )


@router.delete(
    "/{unid}/semesters/{unisid}/lessons/{unilid}",
    response_description="Delete university lesson",
    operation_id="deleteUniversityLesson",
    response_model=Message,
    responses={
        404: {"model": Message},
        403: {"model": Message},
        401: {"model": Message},
    },
)
async def delete_university_lesson(
    unid: str,
    unisid: str,
    unilid: str,
    request: Request,
    auth_user: UserModel = Depends(get_current_user),
):
    """Delete a university lesson with given universityID, universitySemesterID and universityLessonID"""

    if auth_user["user_group"] == "professor":
        update_result = await request.app.mongodb["universities"].update_one(
            {"_id": unid, "semesters._id": unisid},
            {"$pull": {"semesters.$.lessons": {"_id": unilid}}},
        )

        if update_result.modified_count == 1:
            return JSONResponse(
                status_code=status.HTTP_200_OK,
                content={"message": "University lesson deleted"},
            )

        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "University lesson not found"},
        )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )
