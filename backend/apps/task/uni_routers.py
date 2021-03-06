from fastapi import (
    APIRouter,
    Body,
    Request,
    HTTPException,
    status,
    Response,
    Depends,
    Request,
)
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from passlib.hash import bcrypt
from pydantic import BaseModel
from typing import List
from jose import JWTError, jwt

from apps.task import user_models
from .uni_models import (
    UniversityModel,
    UniversityAPIModel,
    UpdateSemesterModel,
    UpdateUniversityNameModel,
)
from .user_models import Message

router = APIRouter()


@router.post(
    "",
    response_description="Add new university",
    operation_id="createUniversity",
    response_model=UniversityModel,
    responses={
        400: {"model": Message},
        403: {"model": Message},
    },
)
async def create_university(
    request: Request,
    university: UniversityModel = Body(...),
    token: str = Depends(user_models.oauth2_scheme),
):
    """Create a university"""

    if (
        auth_user := await user_models.get_current_user(request, token)
    ) is not None and auth_user["userGroup"] == "professor":
        university = jsonable_encoder(university)
        university["currentSemester"] = "null"

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

        return JSONResponse(status_code=status.HTTP_200_OK, content=created_university)

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
        universityAPI = UniversityAPIModel(
            id=doc["_id"], name=doc["name"], currentSemester=doc["currentSemester"]
        )
        jsonable_universityAPI = jsonable_encoder(universityAPI)
        universities.append(jsonable_universityAPI)

    if len(universities) > 0:
        return JSONResponse(status_code=status.HTTP_200_OK, content=universities)

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
        univesity := await request.app.mongodb["universities"].find_one(
            {
                "_id": unid,
            }
        )
    ) is not None:
        return JSONResponse(status_code=status.HTTP_200_OK, content=univesity)

    return JSONResponse(
        status_code=status.HTTP_404_NOT_FOUND,
        content={"message": "University not found"},
    )


@router.put(
    "/{unid}",
    response_description="Update name of a university",
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
    university: UpdateUniversityNameModel = Body(...),
    token: str = Depends(user_models.oauth2_scheme),
):
    """Update university of a user with given universityID"""

    if (
        auth_user := await user_models.get_current_user(request, token)
    ) is not None and auth_user["userGroup"] == "professor":
        university = {k: v for k, v in university.dict().items() if v is not None}

        if len(university) >= 1:
            for doc in (
                await request.app.mongodb["universities"].find().to_list(length=100)
            ):
                if doc["name"] == university["name"]:
                    return JSONResponse(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        content={"message": "University already exists"},
                    )

            update_result = await request.app.mongodb["universities"].update_one(
                {"_id": unid}, {"$set": {"name": university["name"]}}
            )

            if update_result.modified_count == 1:
                if (
                    updated_name := await request.app.mongodb["universities"].find_one(
                        {"_id": unid}
                    )
                ) is not None:
                    return JSONResponse(
                        status_code=status.HTTP_200_OK,
                        content={"message": "University name updated"},
                    )

            return JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND,
                content={"message": "University not found"},
            )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )


@router.put(
    "/{unid}/update-current-semester",
    response_description="Update current semester of a university",
    operation_id="updateCurrentUniversitySemester",
    response_model=Message,
    responses={
        404: {"model": Message},
        403: {"model": Message},
        400: {"model": Message},
    },
)
async def update_current_university_semester(
    unid: str,
    request: Request,
    semester: UpdateSemesterModel = Body(...),
    token: str = Depends(user_models.oauth2_scheme),
):
    """Update current semester of a university of a user with given universityID"""

    if (
        auth_user := await user_models.get_current_user(request, token)
    ) is not None and auth_user["userGroup"] == "professor":
        semester = {k: v for k, v in semester.dict().items() if v is not None}

        if len(semester) >= 1:
            update_result = await request.app.mongodb["universities"].update_one(
                {"_id": unid},
                {"$set": {"currentSemester": semester["currentSemester"]}},
            )

            if update_result.modified_count == 1:
                if (
                    updated_name := await request.app.mongodb["universities"].find_one(
                        {"_id": unid}
                    )
                ) is not None:
                    return JSONResponse(
                        status_code=status.HTTP_200_OK,
                        content={
                            "message": "Current semester of the university updated"
                        },
                    )

            return JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND,
                content={"message": "University not found"},
            )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )


@router.get(
    "/{unid}/current-semester",
    response_description="Get current semester of a university",
    operation_id="getCurrentUniversitySemester",
    response_model=Message,
    responses={
        404: {"model": Message},
    },
)
async def get_current_university_semester(unid: str, request: Request):
    """Get a single semester of a university with given universityID and universitySemesterID"""

    if (
        university := await request.app.mongodb["universities"].find_one({"_id": unid})
    ) is not None:
        for semester in university["semesters"]:
            if semester["_id"] == university["currentSemester"]:
                return JSONResponse(
                    status_code=status.HTTP_200_OK,
                    content=semester,
                )

        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "Current semester not found"},
        )

    return JSONResponse(
        status_code=status.HTTP_404_NOT_FOUND,
        content={"message": "University not found"},
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
    unid: str, request: Request, token: str = Depends(user_models.oauth2_scheme)
):
    """Delete a university with given universityID"""

    if (
        auth_user := await user_models.get_current_user(request, token)
    ) is not None and auth_user["userGroup"] == "professor":
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
