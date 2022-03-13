import json
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
    UpdateSemesterGPAModel,
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

    semester = semester.json(by_alias=True, models_as_dict=False)
    semester = json.loads(semester.replace("\\", ""))

    if auth_user["_id"] == uid:
        update_result = await request.app.mongodb["users"].update_one(
            {"_id": uid}, {"$push": {"semesters": semester}}
        )

        if update_result.modified_count == 1:
            if len(auth_user["semesters"]) == 0:
                await update_current_semester(
                    uid,
                    request,
                    UpdateSemesterModel(current_semester_id=semester["_id"]),
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
    uid: str, auth_user: UserModel = Depends(get_current_user),
):
    """list all semesters of a user with given userID"""

    if auth_user["_id"] == uid:
        return auth_user["semesters"]

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
            return user[0]["semesters"]

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

    semester = semester.json(by_alias=True, models_as_dict=False)
    semester = json.loads(semester.replace("\\", ""))

    if auth_user["_id"] == uid:
        update_result = await request.app.mongodb["users"].update_one(
            {"_id": uid, "semesters._id": sid},
            {
                "$set": {
                    "semesters.$.name": semester["name"],
                    "semesters.$.start_date": semester["start_date"],
                    "semesters.$.end_date": semester["end_date"],
                    "semesters.$.start_hour": semester["start_hour"],
                    "semesters.$.duration_lesson": semester["duration_lesson"],
                    "semesters.$.duration_break": semester["duration_break"],
                    "semesters.$.slot_count": semester["slot_count"],
                }
            },
        )

        if update_result.modified_count == 1:
            return JSONResponse(
                status_code=status.HTTP_200_OK, content={"message": "Semester updated"},
            )

        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "Semester couldn't be updated"},
        )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )


@router.put(
    "/{uid}/semesters/{sid}/semester-gpa",
    response_description="Update gpa of a semester",
    operation_id="updateSemesterGPA",
    response_model=Message,
    responses={
        401: {"model": Message},
        403: {"model": Message},
        404: {"model": Message},
    },
)
async def update_semester_gpa(
    uid: str,
    sid: str,
    request: Request,
    semester_gpa: UpdateSemesterGPAModel = Body(...),
    auth_user: UserModel = Depends(get_current_user),
):
    """Update gpa of a semester with given userID and semesterID"""

    semester_gpa = jsonable_encoder(semester_gpa)

    if auth_user["_id"] == uid:
        update_result = await request.app.mongodb["users"].update_one(
            {"_id": uid, "semesters._id": sid},
            {"$set": {"semesters.$.semester_gpa": semester_gpa["semester_gpa"],}},
        )

        if update_result.modified_count == 1:
            return JSONResponse(
                status_code=status.HTTP_200_OK,
                content={"message": "Semester GPA updated"},
            )

        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "Semester GPA couldn't be updated"},
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
        if auth_user["current_semester_id"] == sid:
            return JSONResponse(
                status_code=status.HTTP_400_BAD_REQUEST,
                content={"message": "Cannot delete current semester"},
            )

        update_result = await request.app.mongodb["users"].update_one(
            {"_id": uid}, {"$pull": {"semesters": {"_id": sid}}}
        )

        if update_result.modified_count == 1:
            return JSONResponse(
                status_code=status.HTTP_200_OK, content={"message": "Semester deleted"},
            )

        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "Semester not found"},
        )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )
