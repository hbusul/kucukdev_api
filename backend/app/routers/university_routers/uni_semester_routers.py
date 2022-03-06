from typing import List

from app.routers.university_routers.uni_routers import (
    update_university_current_semester,
)
from fastapi import APIRouter, Body, Depends, Request, status
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

from ...dependencies import get_current_user
from ...models.uni_models import UniversitySemesterAPIModel, UniversitySemesterModel
from ...models.user_models import Message, MessageCreate, UpdateSemesterModel, UserModel

router = APIRouter()


@router.post(
    "/{unid}/semesters",
    response_description="Add new university semester",
    operation_id="createUniversitySemester",
    response_model=UniversitySemesterModel,
    responses={
        400: {"model": Message},
        403: {"model": Message},
        404: {"model": Message},
    },
)
async def create_university_semester(
    unid: str,
    request: Request,
    university_semester: UniversitySemesterModel = Body(...),
    auth_user: UserModel = Depends(get_current_user),
):
    """Create semester for a university with given universityID"""

    if auth_user["user_group"] == "professor":
        university_semester = jsonable_encoder(university_semester)

        if await request.app.mongodb["universities"].find_one(
            {"_id": unid, "semesters.name": university_semester["name"]}
        ):
            return JSONResponse(
                status_code=status.HTTP_409_CONFLICT,
                content={"message": "University semester already exists"},
            )

        new_semester = await request.app.mongodb["universities"].update_one(
            {"_id": unid}, {"$push": {"semesters": university_semester}}
        )

        if new_semester.modified_count == 1:
            if (await request.app.mongodb["universities"].find_one({"_id": unid}))[
                "current_semester_id"
            ] == "null":
                await update_university_current_semester(
                    unid,
                    request,
                    UpdateSemesterModel(current_semester_id=university_semester["_id"]),
                    auth_user,
                )

            return JSONResponse(
                status_code=status.HTTP_201_CREATED,
                content=jsonable_encoder(
                    MessageCreate(
                        id=university_semester["_id"],
                        message="University semester created",
                    )
                ),
            )

        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "University not found"},
        )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN,
        content={"message": "No right to access"},
    )


@router.get(
    "/{unid}/semesters",
    response_description="List all university semeseters",
    operation_id="listUniversitySemesters",
    response_model=List[UniversitySemesterAPIModel],
    responses={404: {"model": Message},},
)
async def list_university_semesters(unid: str, request: Request):
    """list all semesters of a university with given universityID"""

    if (
        university := await request.app.mongodb["universities"].find_one({"_id": unid})
    ) is not None:
        return university["semesters"]

    return JSONResponse(
        status_code=status.HTTP_404_NOT_FOUND,
        content={"message": "University not found"},
    )


@router.get(
    "/{unid}/semesters/{unisid}",
    response_description="List a university semeseters",
    operation_id="getSingleUniversitySemesters",
    response_model=UniversitySemesterModel,
    responses={404: {"model": Message},},
)
async def show_university_semester(unid: str, unisid: str, request: Request):
    """Get a single semester of a university with given universityID and universitySemesterID"""

    if (
        university := await request.app.mongodb["universities"].find_one(
            {"_id": unid, "semesters._id": unisid}
        )
    ) is not None:
        for semester in university["semesters"]:
            if semester["_id"] == unisid:
                return semester

        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "University semester not found"},
        )

    return JSONResponse(
        status_code=status.HTTP_404_NOT_FOUND,
        content={"message": "University not found"},
    )


@router.put(
    "/{unid}/semesters/{unisid}",
    response_description="Update a university semester",
    operation_id="updateUniversitySemester",
    response_model=Message,
    responses={
        404: {"model": Message},
        403: {"model": Message},
        400: {"model": Message},
    },
)
async def update_university_semester(
    unid: str,
    unisid: str,
    request: Request,
    university_semester: UniversitySemesterModel = Body(...),
    auth_user: UserModel = Depends(get_current_user),
):
    """Update university of a semester with given universityID and universitySemesterID"""

    if auth_user["user_group"] == "professor":
        university_semester = {
            k: v for k, v in university_semester.dict().items() if v is not None
        }

        if (
            existing_university := await request.app.mongodb["universities"].find_one(
                {"_id": unid}
            )
        ) is None:
            return JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND,
                content={"message": "University not found"},
            )
        else:
            for semester in existing_university["semesters"]:
                if semester["name"] == university_semester["name"]:
                    return JSONResponse(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        content={"message": "University semester already exists"},
                    )

        if len(university_semester) >= 1:
            update_result = await request.app.mongodb["universities"].update_many(
                {"_id": unid, "semesters._id": unisid},
                {"$set": {"semesters.$.name": university_semester["name"]}},
            )

            if update_result.modified_count == 1:
                return JSONResponse(
                    status_code=status.HTTP_200_OK,
                    content={"message": "University semester updated"},
                )

            return JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND,
                content={"message": "University semester not found"},
            )

        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"message": "Invalid input"},
        )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )


@router.delete(
    "/{unid}/semesters/{unisid}",
    response_description="Delete university semester",
    operation_id="deleteUniversitySemester",
    response_model=Message,
    responses={404: {"model": Message}, 403: {"model": Message},},
)
async def delete_university_semester(
    unid: str,
    unisid: str,
    request: Request,
    auth_user: UserModel = Depends(get_current_user),
):
    """Delete a university semester with given universityID and universitySemesterID"""

    if auth_user["user_group"] == "professor":
        if (
            await request.app.mongodb["universities"].find_one(
                {"_id": unid, "current_semester_id": unisid}
            )
        ) is not None:
            return JSONResponse(
                status_code=status.HTTP_400_BAD_REQUEST,
                content={"message": "Cannot delete current semester"},
            )

        delete_result = await request.app.mongodb["universities"].update_one(
            {"_id": unid}, {"$pull": {"semesters": {"_id": unisid}}}
        )

        if delete_result.modified_count == 1:
            return JSONResponse(
                status_code=status.HTTP_200_OK,
                content={"message": "University semester deleted"},
            )

        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "University semester not found"},
        )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )
