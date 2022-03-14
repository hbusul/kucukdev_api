from fastapi import APIRouter, Body, Depends, Request, status
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from passlib.hash import bcrypt

from ...dependencies import get_current_user
from ...models.user_models import (
    Message,
    MessageCreate,
    UpdateCurrentGPAModel,
    UpdateEntranceYearModel,
    UpdatePasswordModel,
    UpdateSemesterModel,
    UpdateUniversityModel,
    UpdateUserGroupModel,
    UpdateUserNameModel,
    UserAPIModel,
    UserModel,
)

router = APIRouter()


@router.post(
    "",
    response_description="Add new user",
    operation_id="createUser",
    response_model=MessageCreate,
    responses={
        201: {"model": MessageCreate},
        400: {"model": Message},
        409: {"model": Message},
    },
)
async def create_user(request: Request, user: UserModel = Body(...)):
    """Create a user"""

    user = jsonable_encoder(user)
    user["user_group"] = "default"

    if (await request.app.mongodb["users"].find_one({"email": user["email"]})) is None:
        user["password"] = bcrypt.hash(user["password"])
        new_user = await request.app.mongodb["users"].insert_one(user)

        if new_user.inserted_id is not None:
            return JSONResponse(
                status_code=status.HTTP_201_CREATED,
                content=jsonable_encoder(
                    MessageCreate(id=user["_id"], message="User created")
                ),
            )

        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"message": "User not created"},
        )

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
async def get_current(auth_user: UserModel = Depends(get_current_user)):
    return auth_user


@router.get(
    "/{uid}",
    response_description="Get a single user",
    operation_id="getSingleUser",
    response_model=UserAPIModel,
    responses={403: {"model": Message}, 401: {"model": Message}},
)
async def show_user(
    uid: str, request: Request, auth_user: UserModel = Depends(get_current_user),
):
    """Get a single user with given userID"""

    if auth_user["_id"] == uid:
        if (
            user := await request.app.mongodb["users"].find_one({"_id": uid,})
        ) is not None:
            return user

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )


@router.put(
    "/{uid}/change-password",
    response_description="Update password of a user",
    operation_id="updatePassword",
    response_model=Message,
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
    auth_user: UserModel = Depends(get_current_user),
):
    """Update password of a user with given userID"""

    if auth_user["_id"] == uid:
        password = jsonable_encoder(password)

        password["password"] = bcrypt.hash(password["password"])
        update_result = await request.app.mongodb["users"].update_one(
            {"_id": uid}, {"$set": {"password": password["password"]}}
        )

        if update_result.modified_count == 1:
            return JSONResponse(
                status_code=status.HTTP_200_OK, content={"message": "Password updated"},
            )

        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "Password couldn't be updated"},
        )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )


@router.put(
    "/{uid}/change-name",
    response_description="Update first and last names of a user",
    operation_id="updateName",
    response_model=Message,
    responses={
        401: {"model": Message},
        403: {"model": Message},
        404: {"model": Message},
    },
)
async def update_user_name(
    uid: str,
    request: Request,
    user_name: UpdateUserNameModel = Body(...),
    auth_user: UserModel = Depends(get_current_user),
):
    """Update first and last names of a user with given userID"""

    if auth_user["_id"] == uid:
        user_name = jsonable_encoder(user_name)

        update_result = await request.app.mongodb["users"].update_one(
            {"_id": uid},
            {
                "$set": {
                    "first_name": user_name["first_name"],
                    "last_name": user_name["last_name"],
                }
            },
        )

        if update_result.matched_count == 1:
            return JSONResponse(
                status_code=status.HTTP_200_OK,
                content={"message": "Name of given user updated"},
            )

        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "Name of given user couldn't be updated"},
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
    uid: str, request: Request, auth_user: UserModel = Depends(get_current_user),
):
    """Delete a user with given userID"""

    if auth_user["_id"] == uid:

        delete_result = await request.app.mongodb["users"].delete_one({"_id": uid})

        if delete_result.deleted_count == 1:
            return JSONResponse(
                status_code=status.HTTP_200_OK, content={"message": "User deleted"},
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
    response_description="Update current semester ID of a user",
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
    current_semester: UpdateSemesterModel = Body(...),
    auth_user: UserModel = Depends(get_current_user),
):
    """Update current semester ID of a user with given userID"""

    if auth_user["_id"] == uid:
        current_semester = jsonable_encoder(current_semester)

        update_result = await request.app.mongodb["users"].update_one(
            {"_id": uid},
            {"$set": {"current_semester_id": current_semester["current_semester_id"]}},
        )

        if update_result.matched_count == 1:
            return JSONResponse(
                status_code=status.HTTP_200_OK,
                content={"message": "Current semester updated"},
            )

        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "Current semester couldn't be updated"},
        )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )


@router.put(
    "/{uid}/current-university",
    response_description="Update current university ID of a user",
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
    current_university: UpdateUniversityModel = Body(...),
    auth_user: UserModel = Depends(get_current_user),
):
    """Update current university ID of a user with given userID"""

    if auth_user["_id"] == uid:

        current_university = jsonable_encoder(current_university)

        update_result = await request.app.mongodb["users"].update_one(
            {"_id": uid},
            {
                "$set": {
                    "current_university_id": current_university["current_university_id"]
                }
            },
        )

        if update_result.modified_count == 1:
            return JSONResponse(
                status_code=status.HTTP_200_OK,
                content={"message": "Current university ID updated"},
            )

        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "Current university ID couldn't be updated"},
        )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )


@router.put(
    "/{uid}/entrance-year",
    response_description="Update entrance year of a user",
    operation_id="updateEntranceYear",
    response_model=Message,
    responses={
        401: {"model": Message},
        403: {"model": Message},
        404: {"model": Message},
    },
)
async def update_entrance_year(
    uid: str,
    request: Request,
    entrance_year: UpdateEntranceYearModel = Body(...),
    auth_user: UserModel = Depends(get_current_user),
):
    """Update entrance year of a user with given userID"""

    if auth_user["_id"] == uid:
        entrance_year = jsonable_encoder(entrance_year)

        update_result = await request.app.mongodb["users"].update_one(
            {"_id": uid}, {"$set": {"entrance_year": entrance_year["entrance_year"]}},
        )

        if update_result.modified_count == 1:
            return JSONResponse(
                status_code=status.HTTP_200_OK,
                content={"message": "User entrance year updated"},
            )

        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "User entrance year couldn't be updated"},
        )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )


@router.put(
    "/{uid}/change-gpa",
    response_description="Update current gpa of a user",
    operation_id="updateCurrentGPA",
    response_model=Message,
    responses={
        401: {"model": Message},
        403: {"model": Message},
        404: {"model": Message},
    },
)
async def update_current_gpa(
    uid: str,
    request: Request,
    current_gpa: UpdateCurrentGPAModel = Body(...),
    auth_user: UserModel = Depends(get_current_user),
):
    """Update entrance year of a user with given userID"""

    if auth_user["_id"] == uid:
        current_gpa = jsonable_encoder(current_gpa)

        update_result = await request.app.mongodb["users"].update_one(
            {"_id": uid}, {"$set": {"current_gpa": current_gpa["current_gpa"]}},
        )

        if update_result.modified_count == 1:
            return JSONResponse(
                status_code=status.HTTP_200_OK,
                content={"message": "User current GPA updated"},
            )

        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "User current GPA couldn't be updated"},
        )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )


@router.put(
    "/admin/update-user-group/{uid}",
    response_description="Update group of a user",
    operation_id="updateUserGroup",
    response_model=Message,
    responses={
        401: {"model": Message},
        403: {"model": Message},
        404: {"model": Message},
    },
)
async def update_user_group(
    uid: str,
    request: Request,
    user_group: UpdateUserGroupModel = Body(...),
    auth_user: UserModel = Depends(get_current_user),
):
    """Update group of a user with given userID"""

    if auth_user["user_group"] == "admin":
        user_group = jsonable_encoder(user_group)

        update_result = await request.app.mongodb["users"].update_one(
            {"_id": uid}, {"$set": {"user_group": user_group["user_group"]}},
        )

        if update_result.modified_count == 1:
            return JSONResponse(
                status_code=status.HTTP_200_OK,
                content={"message": "Group of given user updated"},
            )

        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "Group of given user couldn't be updated"},
        )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )


@router.post(
    "/professors",
    response_description="Add new professor user",
    operation_id="createProfessorUser",
    response_model=MessageCreate,
    responses={
        201: {"model": MessageCreate},
        400: {"model": Message},
        409: {"model": Message},
    },
)
async def create_professor_user(
    request: Request,
    user: UserModel = Body(...),
    auth_user: UserModel = Depends(get_current_user),
):
    """Create a professor user"""

    if auth_user["user_group"] == "admin":

        user = jsonable_encoder(user)
        user["user_group"] = "professor"

        if (
            await request.app.mongodb["users"].find_one({"email": user["email"]})
        ) is None:
            user["password"] = bcrypt.hash(user["password"])
            new_user = await request.app.mongodb["users"].insert_one(user)

            if new_user.inserted_id is not None:
                return JSONResponse(
                    status_code=status.HTTP_201_CREATED,
                    content=jsonable_encoder(
                        MessageCreate(id=user["_id"], message="Professor created")
                    ),
                )

            return JSONResponse(
                status_code=status.HTTP_400_BAD_REQUEST,
                content={"message": "Professor not created"},
            )

        return JSONResponse(
            status_code=status.HTTP_409_CONFLICT,
            content={"message": "Given email already exists"},
        )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )
