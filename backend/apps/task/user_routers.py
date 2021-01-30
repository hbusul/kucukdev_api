from fastapi import APIRouter, Body, Request, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

from .models import UserModel, UpdateUserModel

router = APIRouter()


@router.post("", response_description="Add new user")
async def create_user(request: Request, user: UserModel = Body(...)):
    user = jsonable_encoder(user)
    new_user = await request.app.mongodb["users"].insert_one(user)
    created_user = await request.app.mongodb["users"].find_one(
        {"_id": new_user.inserted_id}
    )

    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_user)


@router.get("", response_description="List all users")
async def list_users(request: Request):
    users = []
    for doc in await request.app.mongodb["users"].find().to_list(length=100):
        users.append(doc)
    return users


@router.get("/{uid}", response_description="Get a single user")
async def show_user(uid: str, request: Request):
    if (user := await request.app.mongodb["users"].find_one({"_id": uid})) is not None:
        return user

    raise HTTPException(status_code=404, detail=f"User {uid} not found")


@router.put("/{uid}", response_description="Update a user")
async def update_user(uid: str, request: Request, user: UpdateUserModel = Body(...)):
    user = {k: v for k, v in user.dict().items() if v is not None}

    if len(user) >= 1:
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

    if (
        existing_user := await request.app.mongodb["users"].find_one({"_id": uid})
    ) is not None:
        return existing_user

    raise HTTPException(status_code=404, detail=f"User {uid} not found")


@router.delete("/{uid}", response_description="Delete user")
async def delete_user(uid: str, request: Request):
    delete_result = await request.app.mongodb["users"].delete_one({"_id": uid})

    if delete_result.deleted_count == 1:
        return JSONResponse(status_code=status.HTTP_204_NO_CONTENT)

    raise HTTPException(status_code=404, detail=f"User {uid} not found")