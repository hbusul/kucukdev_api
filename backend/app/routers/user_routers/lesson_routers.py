from typing import List

from fastapi import APIRouter, Body, Depends, Request, status
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

from ...dependencies import get_current_user
from ...models.user_models import (
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
        409: {"model": Message},
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
            await request.app.mongodb["users"].update_one(
                {
                    "_id": uid,
                    "semesters._id": sid,
                    "semesters.lessons._id": lesson["_id"],
                },
                {
                    "$push": {
                        "semesters.$[i].lessons.$[j].slots": {
                            "$each": [],
                            "$sort": {"day": 1, "hour": 1},
                        },
                    },
                },
                array_filters=[{"i._id": sid}, {"j._id": lesson["_id"]}],
            )
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
                        {"$project": {"semesters.lessons.slots._id": 0}},
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
                        {"$match": {"semesters.lessons._id": lid}},
                        {"$project": {"semesters.lessons.slots._id": 0}},
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
        409: {"model": Message},
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

        updated_features = {}
        for key in lesson:
            if lesson[key] is not None:
                updated_features.update(
                    {f"semesters.$[i].lessons.$[j].{key}": lesson[key]}
                )

        update_result = await request.app.mongodb["users"].update_one(
            {"_id": uid, "semesters._id": sid, "semesters.lessons._id": lid,},
            {"$set": updated_features},
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
