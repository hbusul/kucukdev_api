from typing import List

from fastapi import APIRouter, Body, Depends, Request, status
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

from ...dependencies import get_current_user
from ...models.uni_models import (
    UniversityAPIModel,
    UniversityModel,
    UniversitySemesterModel,
    UpdateCurrentSemesterModel,
    UpdateUniversityModel,
)
from ...models.user_models import Message, MessageCreate, UserModel

router = APIRouter()


@router.post(
    "",
    response_description="Add new university",
    operation_id="createUniversity",
    response_model=MessageCreate,
    responses={
        201: {"model": MessageCreate},
        400: {"model": Message},
        403: {"model": Message},
        409: {"model": Message},
    },
)
async def create_university(
    request: Request,
    university: UniversityModel = Body(...),
    auth_user: UserModel = Depends(get_current_user),
):
    """Create a university"""

    if auth_user["user_group"] == "professor":
        university = jsonable_encoder(university)
        university["current_semester_id"] = "null"

        if await request.app.mongodb["universities"].find_one(
            {"name": university["name"]}
        ):
            return JSONResponse(
                status_code=status.HTTP_409_CONFLICT,
                content={"message": "University already exists"},
            )

        new_university = await request.app.mongodb["universities"].insert_one(
            university
        )

        if new_university.inserted_id is not None:
            return JSONResponse(
                status_code=status.HTTP_201_CREATED,
                content=jsonable_encoder(
                    MessageCreate(id=university["_id"], message="University created")
                ),
            )

        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"message": "University not created"},
        )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )


@router.get(
    "",
    response_description="List all universities",
    operation_id="listUniversities",
    response_model=List[UniversityAPIModel],
    responses={404: {"model": Message},},
)
async def list_universities(request: Request):
    """list all universities"""

    if (
        universities := await request.app.mongodb["universities"]
        .find()
        .to_list(length=None)
    ) is not None:
        return universities

    return JSONResponse(
        status_code=status.HTTP_404_NOT_FOUND,
        content={"message": "Universities not found"},
    )


@router.get(
    "/{unid}",
    response_description="Get a single university",
    operation_id="getSingleUniversity",
    response_model=UniversityAPIModel,
    responses={404: {"model": Message}},
)
async def show_university(unid: str, request: Request):
    """Get a single university with given universityID"""
    if (
        university := await request.app.mongodb["universities"].find_one({"_id": unid})
    ) is not None:
        return university

    return JSONResponse(
        status_code=status.HTTP_404_NOT_FOUND,
        content={"message": "University not found"},
    )


@router.put(
    "/{unid}",
    response_description="Update university",
    operation_id="updateUniversity",
    response_model=Message,
    responses={
        404: {"model": Message},
        403: {"model": Message},
        400: {"model": Message},
    },
)
async def update_university(
    unid: str,
    request: Request,
    university: UpdateUniversityModel = Body(...),
    auth_user: UserModel = Depends(get_current_user),
):
    """Update name of a university with given universityID"""

    if auth_user["user_group"] == "professor":
        university = jsonable_encoder(university)

        if (
            await (
                request.app.mongodb["universities"]
                .find({"_id": unid, "name": university["name"]})
                .to_list(length=None)
            )
            == []
            and await (
                request.app.mongodb["universities"]
                .find({"name": university["name"]})
                .to_list(length=None)
            )
            != []
        ):
            return JSONResponse(
                status_code=status.HTTP_409_CONFLICT,
                content={"message": "Given university name already exists"},
            )

        update_result = await request.app.mongodb["universities"].update_one(
            {"_id": unid},
            {
                "$set": {
                    "name": university["name"],
                    "website": university["website"],
                    "country": university["country"],
                    "city": university["city"],
                    "address": university["address"],
                    "phone": university["phone"],
                    "email": university["email"],
                    "zip_code": university["zip_code"],
                    "description": university["description"],
                    "logo": university["logo"],
                    "cover_photo": university["cover_photo"],
                }
            },
        )

        if update_result.modified_count == 1:
            return JSONResponse(
                status_code=status.HTTP_200_OK,
                content={"message": "University updated"},
            )

        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "University could not be updated"},
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
    current_semester: UpdateCurrentSemesterModel = Body(...),
    auth_user: UserModel = Depends(get_current_user),
):
    """Update current semester of a university with given universityID"""

    if auth_user["user_group"] == "professor":
        current_semester = jsonable_encoder(current_semester)

        if (
            await request.app.mongodb["universities"].find_one(
                {"_id": unid, "semesters._id": current_semester["current_semester_id"]}
            )
        ) is None:
            return JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND,
                content={"message": "University or given semester doesn't exist"},
            )

        update_result = await request.app.mongodb["universities"].update_one(
            {"_id": unid},
            {"$set": {"current_semester_id": current_semester["current_semester_id"]}},
        )

        if update_result.modified_count == 1:
            return JSONResponse(
                status_code=status.HTTP_200_OK,
                content={"message": "University current semester updated"},
            )

        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "University current semester not updated"},
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
        university := (
            await request.app.mongodb["universities"]
            .aggregate(
                [
                    {"$match": {"_id": unid}},
                    {"$unwind": "$semesters"},
                    {
                        "$match": {
                            "$expr": {"$eq": ["$semesters._id", "$current_semester_id"]}
                        }
                    },
                ]
            )
            .to_list(length=None)
        )
    ) :
        return university[0]["semesters"]

    return JSONResponse(
        status_code=status.HTTP_404_NOT_FOUND,
        content={"message": "University current semester not found"},
    )


@router.delete(
    "/{unid}",
    response_description="Delete university",
    operation_id="deleteUniversity",
    response_model=Message,
    responses={404: {"model": Message}, 403: {"model": Message},},
)
async def delete_university(
    unid: str, request: Request, auth_user: UserModel = Depends(get_current_user),
):
    """Delete a university with given universityID"""

    if auth_user["user_group"] == "professor":
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
