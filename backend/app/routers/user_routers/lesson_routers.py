import json
from typing import List

from fastapi import APIRouter, Body, Depends, Request, status
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

from ...dependencies import get_current_user
from ...models.user_models import (
    LessonAbsenceModel,
    LessonAPIModel,
    LessonModel,
    Message,
    MessageCreate,
    UpdateLessonModel,
    UserModel,
)

router = APIRouter()


@router.post(
    "/{uid}/semesters/{sid}/lessons",
    response_description="Add new lesson into a semester",
    operation_id="createLesson",
    response_model=MessageCreate,
    responses={
        201: {"model": MessageCreate},
        401: {"model": Message},
        403: {"model": Message},
        404: {"model": Message},
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

    if auth_user["_id"] == uid:

        lesson = jsonable_encoder(lesson)

        if (
            await (
                request.app.mongodb["users"].find(
                    {
                        "_id": uid,
                        "semesters._id": sid,
                        "semesters.lessons": {"$elemMatch": {"code": lesson["code"]}},
                    }
                )
            ).to_list(length=None)
        ) != []:
            return JSONResponse(
                status_code=status.HTTP_409_CONFLICT,
                content={"message": "Given lesson code already exists"},
            )

        update_result = await request.app.mongodb["users"].update_one(
            {"_id": uid, "semesters._id": sid},
            {"$push": {"semesters.$.lessons": lesson}},
        )

        if update_result.modified_count == 1:
            return JSONResponse(
                status_code=status.HTTP_201_CREATED,
                content=jsonable_encoder(
                    MessageCreate(id=lesson["_id"], message="Lesson created")
                ),
            )

        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "Lesson could not be created"},
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
        401: {"model": Message},
        403: {"model": Message},
        404: {"model": Message},
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
            user := (
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
            return user[0]["semesters"]["lessons"]

        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "Semester not found"},
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
        401: {"model": Message},
        403: {"model": Message},
        404: {"model": Message},
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
            user := (
                await request.app.mongodb["users"]
                .aggregate(
                    [
                        {"$match": {"_id": uid}},
                        {"$unwind": "$semesters"},
                        {"$match": {"semesters._id": sid}},
                        {"$unwind": "$semesters.lessons"},
                        {"$match": {"semesters.lessons._id": lid,}},
                    ]
                )
                .to_list(length=None)
            )
        ) :
            return user[0]["semesters"]["lessons"]

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
        401: {"model": Message},
        403: {"model": Message},
        404: {"model": Message},
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

    if auth_user["_id"] == uid:
        lesson = jsonable_encoder(lesson)

        if (
            await (
                request.app.mongodb["users"]
                .find(
                    {
                        "_id": uid,
                        "semesters._id": sid,
                        "semesters.lessons": {
                            "$elemMatch": {"_id": lid, "code": lesson["code"]}
                        },
                    }
                )
                .to_list(length=None)
            )
            == []
            and (
                await request.app.mongodb["users"]
                .find(
                    {
                        "_id": uid,
                        "semesters._id": sid,
                        "semesters.lessons": {"$elemMatch": {"code": lesson["code"]}},
                    }
                )
                .to_list(length=None)
            )
            != []
        ):
            return JSONResponse(
                status_code=status.HTTP_409_CONFLICT,
                content={
                    "message": "Given lesson code already exists or lesson not found"
                },
            )

        update_result = await request.app.mongodb["users"].update_many(
            {"_id": uid, "semesters._id": sid, "semesters.lessons._id": lid,},
            {
                "$set": {
                    "semesters.$[i].lessons.$[j].name": lesson["name"],
                    "semesters.$[i].lessons.$[j].code": lesson["code"],
                    "semesters.$[i].lessons.$[j].instructor": lesson["instructor"],
                    "semesters.$[i].lessons.$[j].ects": lesson["ects"],
                    "semesters.$[i].lessons.$[j].grade": lesson["grade"],
                    "semesters.$[i].lessons.$[j].absence_limit": lesson[
                        "absence_limit"
                    ],
                    "semesters.$[i].lessons.$[j].slots": lesson["slots"],
                }
            },
            array_filters=[{"i._id": sid}, {"j._id": lid}],
        )

        if update_result.modified_count == 1:
            return JSONResponse(
                status_code=status.HTTP_200_OK, content={"message": "Lesson updated"},
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
    response_model=Message,
    responses={
        401: {"model": Message},
        403: {"model": Message},
        404: {"model": Message},
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
                status_code=status.HTTP_200_OK, content={"message": "Lesson deleted"},
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
        201: {"model": Message},
        400: {"model": Message},
        401: {"model": Message},
        403: {"model": Message},
        404: {"model": Message},
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
            await request.app.mongodb["users"].find_one(
                {
                    "_id": uid,
                    "semesters._id": sid,
                    "semesters.lessons._id": lid,
                    "semesters.lessons.absences": absence["absence"],
                }
            )
        ) is not None:
            return JSONResponse(
                status_code=status.HTTP_400_BAD_REQUEST,
                content={"message": "Absence already exists"},
            )

        update_result = await request.app.mongodb["users"].update_one(
            {"_id": uid, "semesters._id": sid, "semesters.lessons._id": lid,},
            {"$push": {"semesters.$[i].lessons.$[j].absences": absence["absence"],}},
            array_filters=[{"i._id": sid}, {"j._id": lid}],
        )

        if update_result.modified_count == 1:
            return JSONResponse(
                status_code=status.HTTP_201_CREATED,
                content={"message": "Absence created"},
            )

        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "Absence could not be created"},
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
        update_result = await request.app.mongodb["users"].update_one(
            {"_id": uid, "semesters._id": sid, "semesters.lessons._id": lid,},
            {"$pull": {"semesters.$[i].lessons.$[j].absences": absence["absence"]}},
            array_filters=[{"i._id": sid}, {"j._id": lid}],
        )

        if update_result.modified_count == 1:
            return JSONResponse(
                status_code=status.HTTP_200_OK, content={"message": "Absence deleted"},
            )

        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "Absence not found"},
        )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )
