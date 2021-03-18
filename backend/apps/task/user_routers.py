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
from .user_models import (
    UserModel,
    UserAPIModel,
    UpdatePasswordModel,
    UpdateSemesterModel,
    UpdateUniversityModel,
    Message,
)

router = APIRouter()


@router.post(
    "",
    response_description="Add new user",
    operation_id="createUser",
    response_model=UserAPIModel,
    responses={409: {"model": Message}},
)
async def create_user(request: Request, user: UserModel = Body(...)):
    """Create a user"""

    user = jsonable_encoder(user)
    user["userGroup"] = "default"
    user["currentSemester"] = "null"
    user["currentUniversity"] = "null"

    if (
        find_user := await request.app.mongodb["users"].find_one(
            {"email": user["email"]}
        )
    ) is None:
        user["password"] = bcrypt.hash(user["password"])
        new_user = await request.app.mongodb["users"].insert_one(user)
        created_user = await request.app.mongodb["users"].find_one(
            {"_id": new_user.inserted_id}
        )
        uid = created_user["_id"]
        semesters_url = f"api.kucukdev.org/users/{uid}/semesters"
        userAPI = UserAPIModel(
            id=created_user["_id"],
            email=created_user["email"],
            currentSemester=created_user["currentSemester"],
            currentUniversity=created_user["currentUniversity"],
            semesters_url=semesters_url,
        )
        jsonable_userAPI = jsonable_encoder(userAPI)

        return JSONResponse(status_code=status.HTTP_200_OK, content=jsonable_userAPI)

    return JSONResponse(
        status_code=status.HTTP_409_CONFLICT,
        content={"message": "Given email already exists"},
    )


@router.get(
    "",
    response_description="Get current user",
    operation_id="getCurrentUser",
    response_model=UserAPIModel,
    responses={401: {"model": Message}},
)
async def get_current(auth_user: UserModel = Depends(user_models.get_current_user)):

    uid = auth_user["_id"]
    semesters_url = f"api.kucukdev.org/users/{uid}/semesters"
    userAPI = UserAPIModel(
        id=auth_user["_id"],
        email=auth_user["email"],
        currentSemester=auth_user["currentSemester"],
        currentUniversity=auth_user["currentUniversity"],
        semesters_url=semesters_url,
    )
    jsonable_userAPI = jsonable_encoder(userAPI)

    return JSONResponse(status_code=status.HTTP_200_OK, content=jsonable_userAPI)


@router.get(
    "/{uid}",
    response_description="Get a single user",
    operation_id="getSingleUser",
    response_model=UserAPIModel,
    responses={403: {"model": Message}, 401: {"model": Message}},
)
async def show_user(
    uid: str,
    request: Request,
    auth_user: UserModel = Depends(user_models.get_current_user),
):
    """Get a single user with given userID"""

    if auth_user["_id"] == uid:
        if (
            user := await request.app.mongodb["users"].find_one(
                {
                    "_id": uid,
                }
            )
        ) is not None:
            semesters_url = f"api.kucukdev.org/users/{uid}/semesters"
            userAPI = UserAPIModel(
                id=user["_id"],
                email=user["email"],
                currentSemester=user["currentSemester"],
                currentUniversity=user["currentUniversity"],
                semesters_url=semesters_url,
            )
            jsonable_userAPI = jsonable_encoder(userAPI)

            return JSONResponse(
                status_code=status.HTTP_200_OK, content=jsonable_userAPI
            )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )


@router.put(
    "/{uid}/change-password",
    response_description="Update password of a user",
    operation_id="updatePassword",
    response_model=UpdatePasswordModel,
    responses={
        401: {"model": Message},
        403: {"model": Message},
        404: {"model": Message},
    },
)
async def update_password(
    uid: str,
    request: Request,
    password: UpdatePasswordModel = Body(...),
    auth_user: UserModel = Depends(user_models.get_current_user),
):
    """Update password of a user with given userID"""

    if uth_user["_id"] == uid:

        password = {k: v for k, v in password.dict().items() if v is not None}

        if len(password) >= 1:

            password["password"] = bcrypt.hash(password["password"])
            update_result = await request.app.mongodb["users"].update_one(
                {"_id": uid}, {"$set": {"password": password["password"]}}
            )

            if update_result.modified_count == 1:
                if (
                    updated_user := await request.app.mongodb["users"].find_one(
                        {"_id": uid}
                    )
                ) is not None:
                    return JSONResponse(
                        status_code=status.HTTP_200_OK,
                        content={"message": "Password updated"},
                    )

        if (
            existing_user := await request.app.mongodb["users"].find_one({"_id": uid})
        ) is not None:
            return existing_user

        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "User not found"},
        )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )


@router.delete(
    "/{uid}",
    response_description="Delete user",
    operation_id="deleteUser",
    response_model=UserAPIModel,
    responses={
        401: {"model": Message},
        403: {"model": Message},
        404: {"model": Message},
    },
)
async def delete_user(
    uid: str,
    request: Request,
    auth_user: UserModel = Depends(user_models.get_current_user),
):
    """Delete a user with given userID"""

    if auth_user["_id"] == uid:

        delete_result = await request.app.mongodb["users"].delete_one({"_id": uid})

        if delete_result.deleted_count == 1:
            semesters_url = f"api.kucukdev.org/users/{uid}/semesters"
            userAPI = UserAPIModel(
                id=uid,
                email=auth_user["email"],
                semesters_url=semesters_url,
            )
            jsonable_userAPI = jsonable_encoder(userAPI)

            return JSONResponse(
                status_code=status.HTTP_200_OK, content=jsonable_userAPI
            )

        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "User not found"},
        )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )


@router.put(
    "/{uid}/current-semester",
    response_description="Update current semester of a user",
    operation_id="updateCurrentSemester",
    response_model=Message,
    responses={
        401: {"model": Message},
        403: {"model": Message},
        404: {"model": Message},
    },
)
async def update_current_semester(
    uid: str,
    request: Request,
    semester: UpdateSemesterModel = Body(...),
    auth_user: UserModel = Depends(user_models.get_current_user),
):
    """Update current semester ID of a user with given userID"""

    if auth_user["_id"] == uid:

        semester = {k: v for k, v in semester.dict().items() if v is not None}

        if len(semester) >= 1:

            update_result = await request.app.mongodb["users"].update_one(
                {"_id": uid}, {"$set": {"currentSemester": semester["currentSemester"]}}
            )

            if update_result.matched_count == 1:
                return JSONResponse(
                    status_code=status.HTTP_200_OK,
                    content={"message": "Current semester updated"},
                )

        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"message": "Invalid input"},
        )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )


@router.put(
    "/{uid}/current-university",
    response_description="Update current university of a user",
    operation_id="updateCurrentUniversity",
    response_model=Message,
    responses={
        401: {"model": Message},
        403: {"model": Message},
        404: {"model": Message},
    },
)
async def update_current_university(
    uid: str,
    request: Request,
    university: UpdateUniversityModel = Body(...),
    auth_user: UserModel = Depends(user_models.get_current_user),
):
    """Update current university ID of a user with given userID"""

    if auth_user["_id"] == uid:

        university = {k: v for k, v in university.dict().items() if v is not None}

        if len(university) >= 1:

            update_result = await request.app.mongodb["users"].update_one(
                {"_id": uid},
                {"$set": {"currentUniversity": university["currentUniversity"]}},
            )

            if update_result.modified_count == 1:
                return JSONResponse(
                    status_code=status.HTTP_200_OK,
                    content={"message": "Current university ID updated"},
                )

        if (
            existing_user := await request.app.mongodb["users"].find_one({"_id": uid})
        ) is not None:
            return existing_user

        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "User not found"},
        )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )