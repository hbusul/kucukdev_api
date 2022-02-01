from typing import List

from fastapi import APIRouter, Body, Depends, Request, status
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

from ...dependencies import get_current_user
from ...models.user_models import (
    AbsenceModel,
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
        400: {"model": Message},
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

    lesson = jsonable_encoder(lesson)

    for slot in lesson["slots"]:
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

    if lesson["name"] == "" or lesson["instructor"] == "":
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"message": "Lesson and instructor name must be filled"},
        )

    if auth_user["_id"] == uid:
        update_result = await request.app.mongodb["users"].update_one(
            {"_id": uid, "semesters._id": sid},
            {"$push": {"semesters.$.lessons": lesson}},
        )

        if update_result.modified_count == 1:
            return JSONResponse(
                status_code=status.HTTP_201_CREATED,
                content={
                    "_id": lesson["_id"],
                    "message": "Lesson created",
                },
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
            user := await request.app.mongodb["users"].find_one(
                {"_id": uid, "semesters._id": sid}
            )
        ) is not None:
            for semester in user["semesters"]:
                if semester["_id"] == sid:
                    return semester["lessons"]

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
                            return lesson

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

    lesson = {k: v for k, v in lesson.dict().items() if v is not None}

    for slot in lesson["slots"]:
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
                content={"message": "Invalid lesson"},
            )

    if auth_user["_id"] == uid:
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
                        "semesters.$[i].lessons.$[j].absenceLimit": lesson[
                            "absenceLimit"
                        ],
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
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"message": "Invalid input"},
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
    absence: AbsenceModel = Body(...),
    auth_user: UserModel = Depends(get_current_user),
):
    """Create an absence for a lesson with given userID, semesterID and lessonID"""

    absence = jsonable_encoder(absence)

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
                                    status_code=status.HTTP_201_CREATED,
                                    content={"message": "Absence created"},
                                )

                            return JSONResponse(
                                status_code=status.HTTP_400_BAD_REQUEST,
                                content={"message": "Absence already exists"},
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
    absence: AbsenceModel = Body(...),
    auth_user: UserModel = Depends(get_current_user),
):
    """Delete an absence from a lesson with given userID, semesterID and lessonID"""

    absence = jsonable_encoder(absence)

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
                                content={"message": "Absence does not exist"},
                            )

        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "Lesson not found"},
        )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )
