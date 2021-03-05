from fastapi import APIRouter, Body, Request, HTTPException, status, Depends, Response
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from typing import List

from apps.task import user_models
from .user_models import LessonModel, UpdateLessonModel, AbsenceModel, Message

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
        400: {"model": Message},
    },
)
async def create_lesson(
    uid: str,
    sid: str,
    request: Request,
    lesson: LessonModel = Body(...),
    token: str = Depends(user_models.oauth2_scheme),
):
    """Create a lessons for a semester with given userID, semesterID"""

    lesson = jsonable_encoder(lesson)

    for slot in lesson["slots"]:
        cur_slot = slot.split(",")
        if cur_slot[0] < 0 or cur_slot[0] > 4:
            return JSONResponse(
                status_code=status.HTTP_400_BAD_REQUEST,
                content={"message": "Slot day cannot be < 0 or > 4"},
            )
        if cur_slot[1] < 0 or cur_slot[1] > 15:
            return JSONResponse(
                status_code=status.HTTP_400_BAD_REQUEST,
                content={"message": "Slot hour cannot be < 0 or > 15"},
            )
        if cur_slot[2] != 0 or cur_slot[2] != 1:
            return JSONResponse(
                status_code=status.HTTP_400_BAD_REQUEST,
                content={"message": "Slot lab hour must be 0 or 1"},
            )

    if lesson["name"] == "" or lesson["instructor"] == "":
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"message": "Lesson and instructor name must be filled"},
        )

    if (
        auth_user := await user_models.get_current_user(request, token)
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
                            absenceLimit=lesson["absenceLimit"],
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
    uid: str,
    sid: str,
    request: Request,
    token: str = Depends(user_models.oauth2_scheme),
):
    """List all lessons of a semester with given userID, semesterID"""

    if (
        auth_user := await user_models.get_current_user(request, token)
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
    token: str = Depends(user_models.oauth2_scheme),
):
    """Get a single lesson with given userID, semesterID and lessonID"""

    if (
        auth_user := await user_models.get_current_user(request, token)
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
    token: str = Depends(user_models.oauth2_scheme),
):
    """Update a lesson with given userID, semesterID and lessonID"""

    lesson = {k: v for k, v in lesson.dict().items() if v is not None}

    for slot in lesson["slots"]:
        cur_slot = slot.split(",")
        if cur_slot[0] < 0 or cur_slot[0] > 4:
            return JSONResponse(
                status_code=status.HTTP_400_BAD_REQUEST,
                content={"message": "Slot day cannot be < 0 or > 4"},
            )
        if cur_slot[1] < 0 or cur_slot[1] > 15:
            return JSONResponse(
                status_code=status.HTTP_400_BAD_REQUEST,
                content={"message": "Slot hour cannot be < 0 or > 15"},
            )
        if cur_slot[2] != 0 or cur_slot[2] != 1:
            return JSONResponse(
                status_code=status.HTTP_400_BAD_REQUEST,
                content={"message": "Slot lab hour must be 0 or 1"},
            )

    if (
        auth_user := await user_models.get_current_user(request, token)
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
                        "semesters.$[i].lessons.$[j].absenceLimit": lesson[
                            "absenceLimit"
                        ],
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
    token: str = Depends(user_models.oauth2_scheme),
):
    """Delete a lesson with given userID, semesterID and lessonID"""

    if (
        auth_user := await user_models.get_current_user(request, token)
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
    token: str = Depends(user_models.oauth2_scheme),
):
    """Create an absence for a lesson with given userID, semesterID and lessonID"""

    absence = jsonable_encoder(absence)

    if (
        auth_user := await user_models.get_current_user(request, token)
    ) is not None and auth_user["_id"] == uid:
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
    absence: AbsenceModel = Body(...),
    token: str = Depends(user_models.oauth2_scheme),
):
    """Delete an absence from a lesson with given userID, semesterID and lessonID"""

    absence = jsonable_encoder(absence)

    if (
        auth_user := await user_models.get_current_user(request, token)
    ) is not None and auth_user["_id"] == uid:

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
