from typing import List

from fastapi import APIRouter, Body, Depends, Request, status
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

from ...dependencies import get_current_user
from ...models.uni_models import (
    UniversityAPILessonModel,
    UniversityLessonModel,
    UniversitySectionModel,
)
from ...models.user_models import Message, UserModel

router = APIRouter()


@router.post(
    "/{unid}/semesters/{unisid}/lessons",
    response_description="Add new university lesson",
    operation_id="createUniversityLesson",
    response_model=Message,
    responses={
        404: {"model": Message},
        403: {"model": Message},
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

    university_lesson = jsonable_encoder(university_lesson)

    for slot in university_lesson["slots"]:
        cur_slot = slot.split(",")
        if len(cur_slot) == 3:
            if int(cur_slot[0]) < 0 or int(cur_slot[0]) > 4:
                return JSONResponse(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    content={"message": "Slot day cannot be < 0 or > 4"},
                )
            if int(cur_slot[1]) < 0 or int(cur_slot[1]) > 15:
                return JSONResponse(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    content={"message": "Slot hour cannot be < 0 or > 15"},
                )
            if int(cur_slot[2]) < 0 or int(cur_slot[2]) > 1:
                return JSONResponse(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    content={"message": "Slot lab hour must be 0 or 1"},
                )
        else:
            return JSONResponse(
                status_code=status.HTTP_400_BAD_REQUEST,
                content={"message": "Invalid lesson slot"},
            )

    if university_lesson["instructor"] == "" or university_lesson["section"] == "":
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"message": "Instructor name or section must be filled"},
        )

    if auth_user["userGroup"] == "professor":
        section = UniversitySectionModel(
            section=university_lesson["section"],
            instructor=university_lesson["instructor"],
            slots=university_lesson["slots"],
        )
        section = jsonable_encoder(section)

        if (
            await request.app.mongodb["universities"].find_one(
                {
                    "_id": unid,
                    "semesters._id": unisid,
                    "semesters.lessons.code": university_lesson["code"],
                }
            )
        ) is not None:
            if await (
                request.app.mongodb["universities"]
                .aggregate(
                    [
                        {
                            "$match": {
                                "_id": unid,
                                "semesters._id": unisid,
                                "semesters.lessons.code": university_lesson["code"],
                            },
                        },
                        {"$unwind": "$semesters"},
                        {"$unwind": "$semesters.lessons"},
                        {
                            "$match": {
                                "semesters.lessons.code": university_lesson["code"],
                                "semesters.lessons.sections.section": university_lesson[
                                    "section"
                                ],
                            },
                        },
                    ]
                )
                .to_list(length=None)
            ):
                return JSONResponse(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    content={"message": "Section already exists"},
                )

            update_result = await request.app.mongodb["universities"].update_one(
                {
                    "_id": unid,
                    "semesters._id": unisid,
                    "semesters.lessons.code": university_lesson["code"],
                },
                {"$push": {"semesters.$[i].lessons.$[j].sections": section}},
                array_filters=[
                    {"i._id": unisid},
                    {"j.code": university_lesson["code"]},
                ],
            )

            if update_result.modified_count == 1:
                return JSONResponse(
                    status_code=status.HTTP_200_OK,
                    content={"message": "Section created"},
                )

            return JSONResponse(
                status_code=status.HTTP_400_BAD_REQUEST,
                content={"message": "Section could not be created"},
            )

        new_lesson = UniversityAPILessonModel(
            name=university_lesson["name"],
            code=university_lesson["code"],
            ects=university_lesson["ects"],
            absenceLimit=university_lesson["absenceLimit"],
            sections=[],
        )
        new_lesson = jsonable_encoder(new_lesson)

        update_result = await request.app.mongodb["universities"].update_one(
            {"_id": unid, "semesters._id": unisid},
            {"$push": {"semesters.$.lessons": new_lesson}},
        )

        if update_result.modified_count == 1:
            update_result = await request.app.mongodb["universities"].update_one(
                {
                    "_id": unid,
                    "semesters._id": unisid,
                    "semesters.lessons.code": new_lesson["code"],
                },
                {"$push": {"semesters.$[i].lessons.$[j].sections": section}},
                array_filters=[
                    {"i._id": unisid},
                    {"j.code": new_lesson["code"]},
                ],
            )

            if update_result.modified_count == 1:
                return JSONResponse(
                    status_code=status.HTTP_200_OK,
                    content={"message": "Lesson created"},
                )

            return JSONResponse(
                status_code=status.HTTP_200_OK,
                content={"message": "Lesson could not be created"},
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
    response_model=UniversityAPILessonModel,
    responses={
        404: {"model": Message},
    },
)
async def show_lesson_with_code(unid: str, code: str, request: Request):
    """Get a single lesson of a university semester with given universityID and Lesson Code"""

    if university := (
        await (
            request.app.mongodb["universities"]
            .aggregate(
                [
                    {
                        "$match": {
                            "_id": unid,
                            "semesters.lessons.code": code,
                        },
                    },
                    {"$unwind": "$semesters"},
                    {"$unwind": "$semesters.lessons"},
                    {
                        "$match": {
                            "semesters.lessons.code": code,
                        },
                    },
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
    response_model=List[UniversityAPILessonModel],
    responses={
        404: {"model": Message},
    },
)
async def list_university_lessons(unid: str, unisid: str, request: Request):
    """list all lessons for a semesters of a university with given universityID and universitySemesterID"""

    if university := (
        await (
            request.app.mongodb["universities"]
            .aggregate(
                [
                    {
                        "$match": {
                            "_id": unid,
                            "semesters._id": unisid,
                        },
                    },
                    {"$unwind": "$semesters"},
                    {
                        "$match": {
                            "semesters._id": unisid,
                        },
                    },
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
    response_model=UniversityAPILessonModel,
    responses={
        404: {"model": Message},
    },
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
                    {
                        "$match": {
                            "semesters.lessons._id": unilid,
                        },
                    },
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
    university_lesson: UniversityAPILessonModel = Body(...),
    auth_user: UserModel = Depends(get_current_user),
):
    """Update lesson of a university semester with given universityID, universitySemesterID and universityLessonID"""

    if auth_user["userGroup"] == "professor":
        university_lesson = {
            k: v for k, v in university_lesson.dict().items() if v is not None
        }

        if (
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
        ) == []:
            return JSONResponse(
                status_code=status.HTTP_400_BAD_REQUEST,
                content={
                    "message": "University lesson could not be found or there exists another lesson with given code"
                },
            )

        if len(university_lesson) >= 1:
            update_result = await request.app.mongodb["universities"].update_one(
                {
                    "_id": unid,
                    "semesters._id": unisid,
                    "semesters.lessons._id": unilid,
                },
                {
                    "$set": {
                        "semesters.$[i].lessons.$[j].name": university_lesson["name"],
                        "semesters.$[i].lessons.$[j].code": university_lesson["code"],
                        "semesters.$[i].lessons.$[j].ects": university_lesson["ects"],
                        "semesters.$[i].lessons.$[j].absenceLimit": university_lesson[
                            "absenceLimit"
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
                status_code=status.HTTP_404_NOT_FOUND,
                content={"message": "University lesson could not be updated"},
            )

        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"message": "Invalid input"},
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

    if auth_user["userGroup"] == "professor":
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
