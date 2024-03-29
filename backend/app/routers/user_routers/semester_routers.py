from typing import List

from app.routers.user_routers.user_routers import update_current_semester
from fastapi import APIRouter, Body, Depends, Request, status
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

from ...dependencies import get_current_user
from ...models.user_models import (
    Message,
    MessageCreate,
    SemesterAPIModel,
    UpdateSemesterModel,
    UpdateUserSemesterModel,
    UserModel,
    UserSemesterModel,
)

router = APIRouter()


@router.post(
    "/{uid}/semesters",
    response_description="Add new semester",
    operation_id="createSemester",
    response_model=MessageCreate,
    responses={
        201: {"model": MessageCreate},
        400: {"model": Message},
        401: {"model": Message},
        403: {"model": Message},
        404: {"model": Message},
    },
)
async def create_semester(
    uid: str,
    request: Request,
    semester: UserSemesterModel = Body(...),
    auth_user: UserModel = Depends(get_current_user),
):
    """Create a semester for a user with given userID"""

    semester = jsonable_encoder(semester)

    resStartHour = semester["startHour"].split(".")
    if (
        len(resStartHour) != 2
        or int(resStartHour[0]) < 0
        or int(resStartHour[0]) > 23
        or int(resStartHour[1]) < 0
        or int(resStartHour[1]) > 59
    ):
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"message": "Invalid start hour"},
        )

    if auth_user["_id"] == uid:
        update_result = await request.app.mongodb["users"].update_one(
            {"_id": uid}, {"$push": {"semesters": semester}}
        )

        if update_result.modified_count == 1:
            if len(auth_user["semesters"]) == 0:
                await update_current_semester(
                    uid,
                    request,
                    UpdateSemesterModel(curSemesterID=semester["_id"]),
                    auth_user,
                )

            return JSONResponse(
                status_code=status.HTTP_201_CREATED,
                content=jsonable_encoder(
                    MessageCreate(id=semester["_id"], message="Semester created")
                ),
            )

        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "User not found"},
        )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )


@router.get(
    "/{uid}/semesters",
    response_description="List all semesters",
    operation_id="listSemestersOfUser",
    response_model=List[SemesterAPIModel],
    responses={
        401: {"model": Message},
        403: {"model": Message},
        404: {"model": Message},
    },
)
async def list_semesters(
    uid: str,
    auth_user: UserModel = Depends(get_current_user),
):
    """list all semesters of a user with given userID"""

    if auth_user["_id"] == uid:
        semesters = []
        for semester in auth_user["semesters"]:
            semester.pop("lessons")
            semesters.append(semester)

        return semesters

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )


@router.get(
    "/{uid}/semesters/{sid}",
    response_description="Get a single semester",
    operation_id="getSingleSemester",
    response_model=SemesterAPIModel,
    responses={
        401: {"model": Message},
        403: {"model": Message},
        404: {"model": Message},
    },
)
async def show_semester(
    uid: str,
    sid: str,
    request: Request,
    auth_user: UserModel = Depends(get_current_user),
):
    """Get a single semester with given userID and semesterID"""

    if auth_user["_id"] == uid:
        for semester in auth_user["semesters"]:
            if semester["_id"] == sid:
                return semester

        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "Semester not found"},
        )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )


@router.put(
    "/{uid}/semesters/{sid}",
    response_description="Update a semester",
    operation_id="updateSemester",
    response_model=Message,
    responses={
        401: {"model": Message},
        403: {"model": Message},
        404: {"model": Message},
    },
)
async def update_semester(
    uid: str,
    sid: str,
    request: Request,
    semester: UpdateUserSemesterModel = Body(...),
    auth_user: UserModel = Depends(get_current_user),
):
    """Update a semester with given userID and semesterID"""

    semester = {k: v for k, v in semester.dict().items() if v is not None}
    semester = jsonable_encoder(semester)

    resStartHour = semester["startHour"].split(".")
    if (
        len(resStartHour) != 2
        or int(resStartHour[0]) < 0
        or int(resStartHour[0]) > 23
        or int(resStartHour[1]) < 0
        or int(resStartHour[1]) > 59
    ):
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"message": "Invalid start hour"},
        )

    if auth_user["_id"] == uid:
        if len(semester) >= 1:
            update_result = await request.app.mongodb["users"].update_many(
                {"_id": uid, "semesters._id": sid},
                {
                    "$set": {
                        "semesters.$.name": semester["name"],
                        "semesters.$.startDate": semester["startDate"],
                        "semesters.$.endDate": semester["endDate"],
                        "semesters.$.startHour": semester["startHour"],
                        "semesters.$.dLesson": semester["dLesson"],
                        "semesters.$.dBreak": semester["dBreak"],
                        "semesters.$.slotCount": semester["slotCount"],
                    }
                },
            )

            if update_result.modified_count == 1:
                return JSONResponse(
                    status_code=status.HTTP_200_OK,
                    content={"message": "Semester updated"},
                )

            return JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND,
                content={"message": "Semester couldn't be updated"},
            )

        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"message": "Invalid input"},
        )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )


@router.delete(
    "/{uid}/semesters/{sid}",
    response_description="Delete semester",
    operation_id="deleteSemester",
    response_model=Message,
    responses={
        400: {"model": Message},
        401: {"model": Message},
        403: {"model": Message},
        404: {"model": Message},
    },
)
async def delete_semester(
    uid: str,
    sid: str,
    request: Request,
    auth_user: UserModel = Depends(get_current_user),
):
    """Delete a semester with given userID and semesterID"""

    if auth_user["_id"] == uid:
        if auth_user["curSemesterID"] == sid:
            return JSONResponse(
                status_code=status.HTTP_400_BAD_REQUEST,
                content={"message": "Cannot delete current semester"},
            )

        update_result = await request.app.mongodb["users"].update_one(
            {"_id": uid}, {"$pull": {"semesters": {"_id": sid}}}
        )

        if update_result.modified_count == 1:
            return JSONResponse(
                status_code=status.HTTP_200_OK,
                content={"message": "Semester deleted"},
            )

        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "Semester not found"},
        )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )
