from fastapi import APIRouter, Body, Request, HTTPException, status, Depends, Response
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from typing import List
import json

from .models import (
    UserSemesterModel,
    UpdateSemesterModel,
    SemesterAPIModel,
    UpdateUserSemesterModel,
    Message,
)
from apps.task import models

router = APIRouter()


@router.post(
    "/{uid}/semesters",
    response_description="Add new semester",
    operation_id="createSemester",
    response_model=List[UserSemesterModel],
    responses={
        404: {"model": Message},
        403: {"model": Message},
        401: {"model": Message},
    },
)
async def create_semester(
    uid: str,
    request: Request,
    semester: UserSemesterModel = Body(...),
    token: str = Depends(models.oauth2_scheme),
):
    """Create a semester for a user with given userID"""

    semester = jsonable_encoder(semester)

    if (
        semester["dLesson"] < 0
        or semester["dBreak"] < 0
        or semester["slotCount"] < 3
        or semester["slotCount"] > 15
    ):
        return JSONResponse(
            status_code=status.HTTP_405_METHOD_NOT_ALLOWED,
            content={
                "message": "Lesson, break duration must be > 0 and slot count must be < 15 and > 3"
            },
        )

    if (
        auth_user := await models.get_current_user(request, token)
    ) is not None and auth_user["_id"] == uid:
        update_result = await request.app.mongodb["users"].update_one(
            {"_id": uid}, {"$push": {"semesters": semester}}
        )

        if update_result.modified_count == 1:
            if (
                created_semester := await request.app.mongodb["users"].find_one(
                    {"_id": uid}
                )
            ) is not None:
                return JSONResponse(
                    status_code=status.HTTP_200_OK,
                    content=created_semester["semesters"],
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
    operation_id="	listSemestersOfUser",
    response_model=List[SemesterAPIModel],
    responses={
        404: {"model": Message},
        403: {"model": Message},
        401: {"model": Message},
    },
)
async def list_semesters(
    uid: str, request: Request, token: str = Depends(models.oauth2_scheme)
):
    """list all semesters of a user with given userID"""

    semesters = []

    if (
        auth_user := await models.get_current_user(request, token)
    ) is not None and auth_user["_id"] == uid:
        if auth_user["semesters"] is not None:
            for semester in auth_user["semesters"]:
                sid = semester["_id"]
                lessons_url = f"api.kucukdev.org/users/{uid}/semesters/{sid}/lessons"
                semesterAPI = SemesterAPIModel(
                    id=sid,
                    name=semester["name"],
                    startDate=semester["startDate"],
                    endDate=semester["endDate"],
                    startHour=semester["startHour"],
                    dLesson=semester["dLesson"],
                    dBreak=semester["dBreak"],
                    slotCount=semester["slotCount"],
                    lessons_url=lessons_url,
                )

                jsonable_semesterAPI = jsonable_encoder(semesterAPI)

                semesters.append(jsonable_semesterAPI)

            return JSONResponse(status_code=status.HTTP_200_OK, content=semesters)

        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "Semesters of user not found"},
        )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )


@router.get(
    "/{uid}/semesters/{sid}",
    response_description="Get a single semester",
    operation_id="getSingleSemester",
    response_model=SemesterAPIModel,
    responses={
        404: {"model": Message},
        403: {"model": Message},
        401: {"model": Message},
    },
)
async def show_semester(
    uid: str, sid: str, request: Request, token: str = Depends(models.oauth2_scheme)
):
    """Get a single semester with given userID and semesterID"""

    if (
        auth_user := await models.get_current_user(request, token)
    ) is not None and auth_user["_id"] == uid:
        for semester in auth_user["semesters"]:
            if semester["_id"] == sid:
                sid = semester["_id"]
                lessons_url = f"api.kucukdev.org/users/{uid}/semesters/{sid}/lessons"
                semesterAPI = SemesterAPIModel(
                    id=sid,
                    name=semester["name"],
                    startDate=semester["startDate"],
                    endDate=semester["endDate"],
                    startHour=semester["startHour"],
                    dLesson=semester["dLesson"],
                    dBreak=semester["dBreak"],
                    slotCount=semester["slotCount"],
                    lessons_url=lessons_url,
                )

                jsonable_semesterAPI = jsonable_encoder(semesterAPI)

                return JSONResponse(
                    status_code=status.HTTP_200_OK, content=jsonable_semesterAPI
                )

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
    response_model=SemesterAPIModel,
    responses={
        404: {"model": Message},
        403: {"model": Message},
        401: {"model": Message},
    },
)
async def update_semester(
    uid: str,
    sid: str,
    request: Request,
    semester: UpdateUserSemesterModel = Body(...),
    token: str = Depends(models.oauth2_scheme),
):
    """Update a semester with given userID and semesterID"""

    semester = {k: v for k, v in semester.dict().items() if v is not None}
    semester = jsonable_encoder(semester)
    if (
        auth_user := await models.get_current_user(request, token)
    ) is not None and auth_user["_id"] == uid:
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

            if (
                updated_user := await request.app.mongodb["users"].find_one(
                    {"_id": uid, "semesters._id": sid}
                )
            ) is not None:
                for semester in updated_user["semesters"]:
                    if semester["_id"] == sid:
                        sid = semester["_id"]
                        lessons_url = (
                            f"api.kucukdev.org/users/{uid}/semesters/{sid}/lessons"
                        )
                        semesterAPI = SemesterAPIModel(
                            id=sid,
                            name=semester["name"],
                            startDate=semester["startDate"],
                            endDate=semester["endDate"],
                            startHour=semester["startHour"],
                            dLesson=semester["dLesson"],
                            dBreak=semester["dBreak"],
                            slotCount=semester["slotCount"],
                            lessons_url=lessons_url,
                        )

                        jsonable_semesterAPI = jsonable_encoder(semesterAPI)

                        return JSONResponse(
                            status_code=status.HTTP_200_OK, content=jsonable_semesterAPI
                        )

        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "Semester not found"},
        )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )


@router.delete(
    "/{uid}/semesters/{sid}",
    response_description="Delete semester",
    operation_id="deleteSemester",
    response_model=SemesterAPIModel,
    responses={
        405: {"model": Message},
        404: {"model": Message},
        403: {"model": Message},
        401: {"model": Message},
    },
)
async def delete_semester(
    uid: str, sid: str, request: Request, token: str = Depends(models.oauth2_scheme)
):
    """Delete a semester with given userID and semesterID"""

    if (
        auth_user := await models.get_current_user(request, token)
    ) is not None and auth_user["_id"] == uid:
        find_user = await request.app.mongodb["users"].find_one(
            {"_id": uid, "semesters._id": sid}
        )

        if auth_user["currentSemester"] == sid:
            return JSONResponse(
                status_code=status.HTTP_405_METHOD_NOT_ALLOWED,
                content={"message": "Current semester cannot be deleted"},
            )

        update_result = await request.app.mongodb["users"].update_one(
            {"_id": uid}, {"$pull": {"semesters": {"_id": sid}}}
        )

        if (
            created_semester := await request.app.mongodb["users"].find_one(
                {"_id": uid}, {"semesters": {"$slice": -1}}
            )
        ) is None:
            print(create_semester["semesters"])

        print("not")

        if update_result.modified_count == 1:
            for semester in find_user["semesters"]:
                if semester["_id"] == sid:
                    sid = semester["_id"]
                    lessons_url = (
                        f"api.kucukdev.org/users/{uid}/semesters/{sid}/lessons"
                    )
                    semesterAPI = SemesterAPIModel(
                        id=sid,
                        name=semester["name"],
                        startDate=semester["startDate"],
                        endDate=semester["endDate"],
                        startHour=semester["startHour"],
                        dLesson=semester["dLesson"],
                        dBreak=semester["dBreak"],
                        slotCount=semester["slotCount"],
                        lessons_url=lessons_url,
                    )
                    jsonable_semesterAPI = jsonable_encoder(semesterAPI)

                    return JSONResponse(
                        status_code=status.HTTP_200_OK, content=jsonable_semesterAPI
                    )

        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "Semester not found"},
        )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )