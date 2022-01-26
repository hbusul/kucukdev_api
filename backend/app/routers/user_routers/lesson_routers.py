from fastapi import APIRouter, Body, Request, status, Depends
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from typing import List
import json

from ...dependencies import get_current_user
from ...models.user_models import (
    LessonAbsenceModel,
    UserModel,
    LessonModel,
    UpdateLessonModel,
    LessonAPIModel,
    Message,
)

router = APIRouter()


@router.post(
    "/{uid}/semesters/{sid}/lessons",
    response_description="Add new lesson into a semester",
    operation_id="createLesson",
    response_model=LessonAPIModel,
    responses={
        404: {"model": Message},
        403: {"model": Message},
        400: {"model": Message},
    },
)
async def create_lesson(
    uid: str,
    sid: str,
    request: Request,
    lesson: LessonModel = Body(...),
    auth_user: UserModel = Depends(get_current_user),
):
    """Create a lessons for a semester with given userID, semesterID"""

    lesson = lesson.json(by_alias=True, models_as_dict=False)
    lesson = json.loads(lesson.replace("\\", ""))

    if auth_user["_id"] == uid:
        if (
            await request.app.mongodb["users"].update_one(
                {"_id": uid, "semesters._id": sid},
                {"$push": {"semesters.$.lessons": lesson}},
            )
            is not None
        ):
            return JSONResponse(
                status_code=status.HTTP_201_CREATED,
                content={"message": "New lesson created"},
            )

        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "Semester not found"},
        )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )


@router.get(
    "/{uid}/semesters/{sid}/lessons",
    response_description="List all lessons of a semester",
    operation_id="listLessonsOfSemester",
    response_model=List[LessonAPIModel],
    responses={
        404: {"model": Message},
        403: {"model": Message},
        401: {"model": Message},
    },
)
async def list_lessons(
    uid: str,
    sid: str,
    request: Request,
    auth_user: UserModel = Depends(get_current_user),
):
    """List all lessons of a semester with given userID, semesterID"""

    if auth_user["_id"] == uid:
        if (
            semester := (
                await request.app.mongodb["users"]
                .aggregate(
                    [
                        {"$match": {"_id": uid}},
                        {"$unwind": "$semesters"},
                        {"$match": {"semesters._id": sid}},
                    ]
                )
                .to_list(length=None)
            )
        ) :
            return semester[0]["semesters"]["lessons"]

        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "Lessons not found"},
        )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )


@router.get(
    "/{uid}/semesters/{sid}/lessons/{lid}",
    response_description="Get a single lesson of a semester",
    operation_id="getSingleLesson",
    response_model=LessonAPIModel,
    responses={
        404: {"model": Message},
        403: {"model": Message},
        401: {"model": Message},
    },
)
async def show_lesson(
    uid: str,
    sid: str,
    lid: str,
    request: Request,
    auth_user: UserModel = Depends(get_current_user),
):
    """Get a single lesson with given userID, semesterID and lessonID"""

    if auth_user["_id"] == uid:
        if (
            lesson := (
                await request.app.mongodb["users"]
                .aggregate(
                    [
                        {"$match": {"_id": uid}},
                        {"$unwind": "$semesters"},
                        {"$unwind": "$semesters.lessons"},
                        {
                            "$match": {
                                "semesters._id": sid,
                                "semesters.lessons._id": lid,
                            }
                        },
                    ]
                )
                .to_list(length=None)
            )
        ) :
            return lesson[0]["semesters"]["lessons"]

        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "Lesson not found"},
        )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )


@router.put(
    "/{uid}/semesters/{sid}/lessons/{lid}",
    response_description="Update a lesson",
    operation_id="updateLesson",
    response_model=Message,
    responses={
        404: {"model": Message},
        403: {"model": Message},
        401: {"model": Message},
    },
)
async def update_lesson(
    uid: str,
    sid: str,
    lid: str,
    request: Request,
    lesson: UpdateLessonModel = Body(...),
    auth_user: UserModel = Depends(get_current_user),
):
    """Update a lesson with given userID, semesterID and lessonID"""

    lesson = lesson.json(by_alias=True, models_as_dict=False)
    lesson = json.loads(lesson.replace("\\", ""))

    if auth_user["_id"] == uid:
        update_result = await request.app.mongodb["users"].update_many(
            {
                "_id": uid,
                "semesters._id": sid,
                "semesters.lessons._id": lid,
            },
            {
                "$set": {
                    "semesters.$[i].lessons.$[j].name": lesson["name"],
                    "semesters.$[i].lessons.$[j].instructor": lesson["instructor"],
                    "semesters.$[i].lessons.$[j].absenceLimit": lesson["absenceLimit"],
                    "semesters.$[i].lessons.$[j].slots": lesson["slots"],
                }
            },
            array_filters=[{"i._id": sid}, {"j._id": lid}],
        )

        if update_result.modified_count == 1:
            return JSONResponse(
                status_code=status.HTTP_200_OK,
                content={"message": "Lesson updated"},
            )

        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "Lesson not found"},
        )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )


@router.delete(
    "/{uid}/semesters/{sid}/lessons/{lid}",
    response_description="Delete lesson",
    operation_id="deleteLesson",
    response_model=LessonModel,
    responses={
        404: {"model": Message},
        403: {"model": Message},
        401: {"model": Message},
    },
)
async def delete_lesson(
    uid: str,
    sid: str,
    lid: str,
    request: Request,
    auth_user: UserModel = Depends(get_current_user),
):
    """Delete a lesson with given userID, semesterID and lessonID"""

    if auth_user["_id"] == uid:
        update_result = await request.app.mongodb["users"].update_one(
            {"_id": uid, "semesters._id": sid},
            {"$pull": {"semesters.$.lessons": {"_id": lid}}},
        )

        if update_result.modified_count == 1:
            return JSONResponse(
                status_code=status.HTTP_200_OK,
                content={"message": "Lesson deleted"},
            )

        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "Lesson not found"},
        )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )


@router.post(
    "/{uid}/semesters/{sid}/lessons/{lid}/absences",
    response_description="Add absence into a lesson",
    operation_id="createAbsence",
    response_model=Message,
    responses={
        404: {"model": Message},
        403: {"model": Message},
        401: {"model": Message},
        400: {"model": Message},
    },
)
async def create_absence(
    uid: str,
    sid: str,
    lid: str,
    request: Request,
    absence: LessonAbsenceModel = Body(...),
    auth_user: UserModel = Depends(get_current_user),
):
    """Create an absence for a lesson with given userID, semesterID and lessonID"""

    absence = absence.json(models_as_dict=False)
    absence = json.loads(absence.replace("\\", ""))

    if auth_user["_id"] == uid:
        if (
            absence_user := await request.app.mongodb["users"].find_one(
                {"_id": uid, "semesters._id": sid, "semesters.lessons._id": lid}
            )
        ) is not None:
            for semester in absence_user["semesters"]:
                if semester["_id"] == sid:
                    for lesson in semester["lessons"]:
                        if lesson["_id"] == lid:
                            if absence["absence"] not in lesson["absences"]:
                                update_result = (
                                    await request.app.mongodb["users"].update_one(
                                        {
                                            "_id": uid,
                                            "semesters._id": sid,
                                            "semesters.lessons._id": lid,
                                        },
                                        {
                                            "$push": {
                                                "semesters.$[i].lessons.$[j].absences": absence[
                                                    "absence"
                                                ],
                                            }
                                        },
                                        array_filters=[{"i._id": sid}, {"j._id": lid}],
                                    ),
                                )
                                return JSONResponse(
                                    status_code=status.HTTP_200_OK,
                                    content={"message": "Absence created"},
                                )

                            return JSONResponse(
                                status_code=status.HTTP_400_BAD_REQUEST,
                                content={"message": "Absence is already exists"},
                            )

        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "Lesson not found"},
        )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )


@router.delete(
    "/{uid}/semesters/{sid}/lessons/{lid}/absences",
    response_description="Delete absence into a lesson",
    operation_id="deleteAbsence",
    response_model=Message,
    responses={
        404: {"model": Message},
        403: {"model": Message},
        401: {"model": Message},
        400: {"model": Message},
    },
)
async def delete_absence(
    uid: str,
    sid: str,
    lid: str,
    request: Request,
    absence: LessonAbsenceModel = Body(...),
    auth_user: UserModel = Depends(get_current_user),
):
    """Delete an absence from a lesson with given userID, semesterID and lessonID"""

    absence = absence.json(models_as_dict=False)
    absence = json.loads(absence.replace("\\", ""))

    if auth_user["_id"] == uid:
        if (
            existing_user := await request.app.mongodb["users"].find_one(
                {"_id": uid, "semesters._id": sid, "semesters.lessons._id": lid}
            )
        ) is not None:
            for semester in existing_user["semesters"]:
                if semester["_id"] == sid:
                    for lesson in semester["lessons"]:
                        if lesson["_id"] == lid:
                            if absence["absence"] in lesson["absences"]:
                                update_result = (
                                    await request.app.mongodb["users"].update_one(
                                        {
                                            "_id": uid,
                                            "semesters._id": sid,
                                            "semesters.lessons._id": lid,
                                        },
                                        {
                                            "$pull": {
                                                "semesters.$[i].lessons.$[j].absences": absence[
                                                    "absence"
                                                ]
                                            }
                                        },
                                        array_filters=[{"i._id": sid}, {"j._id": lid}],
                                    ),
                                )
                                return JSONResponse(
                                    status_code=status.HTTP_200_OK,
                                    content={"message": "Absence deleted"},
                                )
                            return JSONResponse(
                                status_code=status.HTTP_400_BAD_REQUEST,
                                content={"message": "Absence not found"},
                            )

        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "Lesson not found"},
        )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )
