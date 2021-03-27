from fastapi import (
    APIRouter,
    Body,
    Request,
    status,
    Response,
    Depends,
)
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from typing import List

from apps.task import user_models
from .user_models import UpdateSemesterModel
from .uni_models import (
    UniversityModel,
    UniversityAPIModel,
    UpdateUniversityNameModel,
    UniversitySemesterModel,
)
from .user_models import UserModel, Message

router = APIRouter()


@router.post(
    "",
    response_description="Add new university",
    operation_id="createUniversity",
    response_model=UniversityAPIModel,
    responses={
        400: {"model": Message},
        403: {"model": Message},
    },
)
async def create_university(
    request: Request,
    university: UniversityModel = Body(...),
    auth_user: UserModel = Depends(user_models.get_current_user),
):
    """Create a university"""

    if auth_user["userGroup"] == "professor":
        university = jsonable_encoder(university)
        university["curSemesterID"] = "null"

        for doc in await request.app.mongodb["universities"].find().to_list(length=100):
            if doc["name"] == university["name"]:
                return JSONResponse(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    content={"message": "University already exists"},
                )

        new_university = await request.app.mongodb["universities"].insert_one(
            university
        )
        created_university = await request.app.mongodb["universities"].find_one(
            {"_id": new_university.inserted_id}
        )

        return created_university

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )


@router.get(
    "",
    response_description="List all universities",
    operation_id="listUniversities",
    response_model=List[UniversityAPIModel],
    responses={
        404: {"model": Message},
    },
)
async def list_universities(request: Request):
    """list all universities"""

    universities = []
    for doc in await request.app.mongodb["universities"].find().to_list(length=100):
        universities.append(doc)

    if len(universities) > 0:
        return universities

    return JSONResponse(
        status_code=status.HTTP_404_NOT_FOUND,
        content={"message": "Universities not found"},
    )


@router.get(
    "/{unid}",
    response_description="Get a single university",
    operation_id="getSingleUniversity",
    response_model=UniversityModel,
    responses={404: {"model": Message}},
)
async def show_university(unid: str, request: Request):
    """Get a single university with given universityID"""
    if (
        university := await request.app.mongodb["universities"].find_one(
            {
                "_id": unid,
            }
        )
    ) is not None:
        return university

    return JSONResponse(
        status_code=status.HTTP_404_NOT_FOUND,
        content={"message": "University not found"},
    )


@router.put(
    "/{unid}/update-name",
    response_description="Update a university name",
    operation_id="updateUniversityName",
    response_model=Message,
    responses={
        404: {"model": Message},
        403: {"model": Message},
        400: {"model": Message},
    },
)
async def update_university_name(
    unid: str,
    request: Request,
    university_name: UpdateUniversityNameModel = Body(...),
    auth_user: UserModel = Depends(user_models.get_current_user),
):
    """Update name of a university with given universityID"""

    if auth_user["userGroup"] == "professor":
        university_name = {
            k: v for k, v in university_name.dict().items() if v is not None
        }

        if len(university_name) >= 1:
            for doc in (
                await request.app.mongodb["universities"].find().to_list(length=100)
            ):
                if doc["name"] == university_name["name"]:
                    return JSONResponse(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        content={"message": "University already exists"},
                    )

            update_result = await request.app.mongodb["universities"].update_one(
                {"_id": unid}, {"$set": {"name": university_name["name"]}}
            )

            if update_result.modified_count == 1:
                return JSONResponse(
                    status_code=status.HTTP_200_OK,
                    content={"message": "University name updated"},
                )

            return JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND,
                content={"message": "University not found"},
            )

        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"message": "Invalid university name"},
        )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )


@router.put(
    "/{unid}/current-semester",
    response_description="Update current semester of a university",
    operation_id="updateUniversityCurrentSemester",
    response_model=Message,
    responses={
        404: {"model": Message},
        403: {"model": Message},
        400: {"model": Message},
    },
)
async def update_university_current_semester(
    unid: str,
    request: Request,
    current_semester: UpdateSemesterModel = Body(...),
    auth_user: UserModel = Depends(user_models.get_current_user),
):
    """Update current semester of a university with given universityID"""

    if auth_user["userGroup"] == "professor":
        current_semester = {
            k: v for k, v in current_semester.dict().items() if v is not None
        }

        if len(current_semester) >= 1:
            update_result = await request.app.mongodb["universities"].update_one(
                {"_id": unid},
                {"$set": {"curSemesterID": current_semester["curSemesterID"]}},
            )

            if update_result.modified_count == 1:
                return JSONResponse(
                    status_code=status.HTTP_200_OK,
                    content={"message": "University current semester updated"},
                )

            return JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND,
                content={"message": "University not found"},
            )

        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"message": "Invalid semester ID"},
        )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )


@router.get(
    "/{unid}/current-semester",
    response_description="Get current semester of a university",
    operation_id="getCurrentUniversitySemester",
    response_model=UniversitySemesterModel,
    responses={404: {"model": Message}},
)
async def show_university_current_semester(unid: str, request: Request):
    """Get current semester of a university with given universityID"""
    if (
        university := await request.app.mongodb["universities"].find_one(
            {
                "_id": unid,
            }
        )
    ) is not None:
        for semester in university["semesters"]:
            if semester["_id"] == university["curSemesterID"]:
                return semester

    return JSONResponse(
        status_code=status.HTTP_404_NOT_FOUND,
        content={"message": "University current semester not found"},
    )


@router.delete(
    "/{unid}",
    response_description="Delete university",
    operation_id="deleteUniversity",
    response_model=Message,
    responses={
        404: {"model": Message},
        403: {"model": Message},
    },
)
async def delete_university(
    unid: str,
    request: Request,
    auth_user: UserModel = Depends(user_models.get_current_user),
):
    """Delete a university with given universityID"""

    if auth_user["userGroup"] == "professor":
        delete_result = await request.app.mongodb["universities"].delete_one(
            {"_id": unid}
        )

        if delete_result.deleted_count == 1:
            return JSONResponse(
                status_code=status.HTTP_200_OK,
                content={"message": "University deleted"},
            )

        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "University not found"},
        )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )
