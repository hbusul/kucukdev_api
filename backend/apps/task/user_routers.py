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
from typing import Optional
from jose import JWTError, jwt


from apps.task import models
from .models import UserModel, UpdateUserModel

router = APIRouter()


@router.post("", response_description="Add new user")
async def create_user(request: Request, user: UserModel = Body(...)):
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

        return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_user)

    raise HTTPException(status_code=400, detail="Given email already exists")


# It should stay for test purposes by now
@router.get("", response_description="List all users")
async def list_users(request: Request):
    users = []
    for doc in await request.app.mongodb["users"].find().to_list(length=100):
        users.append(doc)
    return users


@router.get("/{uid}", response_description="Get a single user")
async def show_user(
    uid: str, request: Request, token: str = Depends(models.oauth2_scheme)
):
    if (
        auth_user := await models.get_current_user(request, token)
    ) is not None and auth_user["_id"] == uid:
        return auth_user

    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="No right to access",
    )


@router.put("/{uid}", response_description="Update a user")
async def update_user(
    uid: str,
    request: Request,
    user: UpdateUserModel = Body(...),
    token: str = Depends(models.oauth2_scheme),
):
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
                        return updated_user

            raise HTTPException(status_code=400, detail="Given email already exists")

        if (
            existing_user := await request.app.mongodb["users"].find_one({"_id": uid})
        ) is not None:
            return existing_user

        raise HTTPException(status_code=404, detail=f"User not found")

    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN, detail="No right to access"
    )


@router.delete("/{uid}", response_description="Delete user")
async def delete_user(
    uid: str, request: Request, token: str = Depends(models.oauth2_scheme)
):
    if (
        auth_user := await models.get_current_user(request, token)
    ) is not None and auth_user["_id"] == uid:

        delete_result = await request.app.mongodb["users"].delete_one(
            {"_id": auth_user["_id"]}
        )

        if delete_result.deleted_count == 1:
            return Response(status_code=status.HTTP_200_OK)

        raise HTTPException(status_code=404, detail=f"User not found")

    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="No right to access",
    )