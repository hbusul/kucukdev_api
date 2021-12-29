from fastapi import (
    APIRouter,
    Body,
    Request,
    status,
    Depends,
)
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from passlib.hash import bcrypt


from ...dependencies import get_current_user
from ...models.user_models import (
    UserModel,
    UserAPIModel,
    UpdatePasswordModel,
    UpdateSemesterModel,
    UpdateUniversityModel,
    UpdateEntranceYearModel,
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
    user["curSemesterID"] = "null"
    user["curUniversityID"] = "null"
    user["entranceYear"] = 0

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
        return created_user

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
    uid: str,
    request: Request,
    auth_user: UserModel = Depends(get_current_user),
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
            return auth_user

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

        password = {k: v for k, v in password.dict().items() if v is not None}

        if len(password) >= 1:

            password["password"] = bcrypt.hash(password["password"])
            update_result = await request.app.mongodb["users"].update_one(
                {"_id": uid}, {"$set": {"password": password["password"]}}
            )

            if update_result.modified_count == 1:
                return JSONResponse(
                    status_code=status.HTTP_200_OK,
                    content={"message": "Password updated"},
                )

            return JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND,
                content={"message": "Password couldn't be updated"},
            )

        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"message": "Invalid input"},
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
    auth_user: UserModel = Depends(get_current_user),
):
    """Delete a user with given userID"""

    if auth_user["_id"] == uid:

        delete_result = await request.app.mongodb["users"].delete_one({"_id": uid})

        if delete_result.deleted_count == 1:
            return JSONResponse(
                status_code=status.HTTP_200_OK,
                content={"message": "User deleted"},
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
    semester: UpdateSemesterModel = Body(...),
    auth_user: UserModel = Depends(get_current_user),
):
    """Update current semester ID of a user with given userID"""

    if auth_user["_id"] == uid:

        semester = {k: v for k, v in semester.dict().items() if v is not None}

        if len(semester) >= 1:

            update_result = await request.app.mongodb["users"].update_one(
                {"_id": uid}, {"$set": {"curSemesterID": semester["curSemesterID"]}}
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
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"message": "Invalid semester ID"},
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
    university: UpdateUniversityModel = Body(...),
    auth_user: UserModel = Depends(get_current_user),
):
    """Update current university ID of a user with given userID"""

    if auth_user["_id"] == uid:

        university = {k: v for k, v in university.dict().items() if v is not None}

        if len(university) >= 1:

            update_result = await request.app.mongodb["users"].update_one(
                {"_id": uid},
                {"$set": {"curUniversityID": university["curUniversityID"]}},
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
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"message": "Invalid university ID"},
        )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )


@router.put(
    "/{uid}/entrance-year",
    response_description="Update entrance year of a user",
    operation_id="updateEntranceyear",
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
    entranceYear: UpdateEntranceYearModel = Body(...),
    auth_user: UserModel = Depends(get_current_user),
):
    """Update entrance year of a user with given userID"""

    if auth_user["_id"] == uid:

        entranceYear = {k: v for k, v in entranceYear.dict().items() if v is not None}

        if len(entranceYear) >= 1:

            update_result = await request.app.mongodb["users"].update_one(
                {"_id": uid},
                {"$set": {"entranceYear": entranceYear["entranceYear"]}},
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
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"message": "Invalid entrance year"},
        )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )