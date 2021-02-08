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


from apps.task import models
from .models import UserModel, UpdateUserModel, UserAPIModel, Message

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
            currentSemester="null",
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
async def get_current(request: Request, token: str = Depends(models.oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, models.SECRET_KEY, algorithms=[models.ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = models.TokenData(email=email)
    except JWTError:
        raise credentials_exception
    user = await request.app.mongodb["users"].find_one({"email": token_data.email})
    if user is None:
        raise credentials_exception
    uid = user["_id"]
    semesters_url = f"api.kucukdev.org/users/{uid}/semesters"
    userAPI = UserAPIModel(
        id=user["_id"],
        email=user["email"],
        currentSemester=user["currentSemester"],
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
    uid: str, request: Request, token: str = Depends(models.oauth2_scheme)
):
    """Get a single user with given userID"""

    if (
        auth_user := await models.get_current_user(request, token)
    ) is not None and auth_user["_id"] == uid:
        semesters_url = f"api.kucukdev.org/users/{uid}/semesters"
        userAPI = UserAPIModel(
            id=auth_user["_id"],
            email=auth_user["email"],
            currentSemester=auth_user["currentSemester"],
            semesters_url=semesters_url,
        )
        jsonable_userAPI = jsonable_encoder(userAPI)

        return JSONResponse(status_code=status.HTTP_200_OK, content=jsonable_userAPI)

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )


@router.put(
    "/{uid}",
    response_description="Update a user",
    operation_id="updateUser",
    response_model=UserAPIModel,
    responses={
        401: {"model": Message},
        403: {"model": Message},
        404: {"model": Message},
        409: {"model": Message},
    },
)
async def update_user(
    uid: str,
    request: Request,
    user: UpdateUserModel = Body(...),
    token: str = Depends(models.oauth2_scheme),
):
    """Update a user with given userID"""

    if (
        auth_user := await models.get_current_user(request, token)
    ) is not None and auth_user["_id"] == uid:

        user = {k: v for k, v in user.dict().items() if v is not None}

        if len(user) >= 1:
            if (
                current_user := await request.app.mongodb["users"].find_one(
                    {"email": user["email"]}
                )
            ) is None or auth_user["email"] == user["email"]:
                user["password"] = bcrypt.hash(user["password"])
                update_result = await request.app.mongodb["users"].update_one(
                    {"_id": uid}, {"$set": user}
                )

                if update_result.modified_count == 1:
                    if (
                        updated_user := await request.app.mongodb["users"].find_one(
                            {"_id": uid}
                        )
                    ) is not None:
                        semesters_url = f"api.kucukdev.org/users/{uid}/semesters"
                        userAPI = UserAPIModel(
                            id=auth_user["_id"],
                            email=user["email"],
                            currentSemester=user["currentSemester"],
                            semesters_url=semesters_url,
                        )

                        jsonable_userAPI = jsonable_encoder(userAPI)

                        return JSONResponse(
                            status_code=status.HTTP_200_OK, content=jsonable_userAPI
                        )

            return JSONResponse(
                status_code=status.HTTP_409_CONFLICT,
                content={"message": "Given email already exists"},
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
    uid: str, request: Request, token: str = Depends(models.oauth2_scheme)
):
    """Delete a user with given userID"""

    if (
        auth_user := await models.get_current_user(request, token)
    ) is not None and auth_user["_id"] == uid:

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
