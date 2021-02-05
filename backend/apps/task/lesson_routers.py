from fastapi import APIRouter, Body, Request, HTTPException, status, Depends, Response
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from typing import List

from apps.task import models
from .models import LessonModel, UpdateLessonModel, Message

router = APIRouter()


@router.post(
    "/{uid}/semesters/{sid}/lessons",
    response_description="Add new lesson into a semester",
    operation_id="createLesson",
    response_model=LessonModel,
    responses={
        404: {"model": Message},
        403: {"model": Message},
        401: {"model": Message},
    },
)
async def create_lesson(
    uid: str,
    sid: str,
    request: Request,
    lesson: LessonModel = Body(...),
    token: str = Depends(models.oauth2_scheme),
):
    """Create a lessons for a semester with given userID, semesterID"""

    lesson = jsonable_encoder(lesson)

    if (
        auth_user := await models.get_current_user(request, token)
    ) is not None and auth_user["_id"] == uid:
        update_result = await request.app.mongodb["users"].update_one(
            {"_id": uid, "semesters._id": sid},
            {"$push": {"semesters.$.lessons": lesson}},
        )

        if (
            existing_user := await request.app.mongodb["users"].find_one(
                {"_id": uid, "semesters._id": sid},
                {"semesters.lessons": {"$slice": -1}},
            )
        ) is not None:
            for semester in existing_user["semesters"]:
                if semester["_id"] == sid:
                    for lesson in semester["lessons"]:
                        lessonAPI = UpdateLessonModel(
                            id=lesson["_id"],
                            name=lesson["name"],
                            instructor=lesson["instructor"],
                            slots=lesson["slots"],
                        )
                    jsonable_lessonAPI = jsonable_encoder(lessonAPI)

                    return JSONResponse(
                        status_code=status.HTTP_200_OK, content=jsonable_lessonAPI
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
    response_model=List[LessonModel],
    responses={
        404: {"model": Message},
        403: {"model": Message},
        401: {"model": Message},
    },
)
async def list_lessons(
    uid: str, sid: str, request: Request, token: str = Depends(models.oauth2_scheme)
):
    """List all lessons of a semester with given userID, semesterID"""

    if (
        auth_user := await models.get_current_user(request, token)
    ) is not None and auth_user["_id"] == uid:
        if (
            user := await request.app.mongodb["users"].find_one(
                {"_id": uid, "semesters._id": sid}
            )
        ) is not None:
            for semester in user["semesters"]:
                if semester["_id"] == sid:
                    return JSONResponse(
                        status_code=status.HTTP_200_OK, content=semester["lessons"]
                    )

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
    response_model=LessonModel,
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
    token: str = Depends(models.oauth2_scheme),
):
    """Get a single lesson with given userID, semesterID and lessonID"""

    if (
        auth_user := await models.get_current_user(request, token)
    ) is not None and auth_user["_id"] == uid:
        if (
            user := await request.app.mongodb["users"].find_one(
                {
                    "_id": uid,
                    "semesters._id": sid,
                    "semesters.lessons._id": lid,
                }
            )
        ) is not None:
            for semester in user["semesters"]:
                if semester["_id"] == sid:
                    for lesson in semester["lessons"]:
                        if lesson["_id"] == lid:
                            return JSONResponse(
                                status_code=status.HTTP_200_OK, content=lesson
                            )

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
    response_model=LessonModel,
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
    token: str = Depends(models.oauth2_scheme),
):
    """Update a lesson with given userID, semesterID and lessonID"""

    lesson = {k: v for k, v in lesson.dict().items() if v is not None}

    if (
        auth_user := await models.get_current_user(request, token)
    ) is not None and auth_user["_id"] == uid:
        if len(lesson) >= 1:
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
                        "semesters.$[i].lessons.$[j].slots": lesson["slots"],
                    }
                },
                array_filters=[{"i._id": sid}, {"j._id": lid}],
            )

            if (
                existing_user := await request.app.mongodb["users"].find_one(
                    {"_id": uid, "semesters._id": sid, "semesters.lessons._id": lid}
                )
            ) is not None:
                for semester in existing_user["semesters"]:
                    if semester["_id"] == sid:
                        for lesson in semester["lessons"]:
                            if lesson["_id"] == lid:
                                return JSONResponse(
                                    status_code=status.HTTP_200_OK, content=lesson
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
    token: str = Depends(models.oauth2_scheme),
):
    """Delete a lesson with given userID, semesterID and lessonID"""

    if (
        auth_user := await models.get_current_user(request, token)
    ) is not None and auth_user["_id"] == uid:
        update_result = await request.app.mongodb["users"].update_one(
            {"_id": uid, "semesters._id": sid},
            {"$pull": {"semesters.$.lessons": {"_id": lid}}},
        )

        if update_result.modified_count == 1:
            if (
                updated_user := await request.app.mongodb["users"].find_one(
                    {"_id": uid, "semesters._id": sid}
                )
            ) is not None:
                for semester in auth_user["semesters"]:
                    if semester["_id"] == sid:
                        for lesson in semester["lessons"]:
                            if lesson["_id"] == lid:
                                lessonAPI = lesson

            return JSONResponse(status_code=status.HTTP_200_OK, content=lessonAPI)

        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "Lesson not found"},
        )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )
