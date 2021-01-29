from fastapi import APIRouter, Body, Request, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

from .models import UserModel, UpdateUserModel, SemesterModel, UpdateSemesterModel

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
                updated_user := await request.app.mongodb["users"].find_one({"_id": uid})
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


# Semester

# We post semester into semesters collection in the db
# /{id}/semesters doesn't necessary
@router.post("/{uid}/semesters", response_description="Add new semester")
async def create_semester(request: Request, semester: SemesterModel = Body(...)):
    semester = jsonable_encoder(semester)
    new_semester = await request.app.mongodb["semesters"].insert_one(semester)
    created_semester = await request.app.mongodb["semesters"].find_one(
        {"_id": new_semester.inserted_id}
    )

    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_semester)

@router.get("/{uid}/semesters", response_description="List all semesters")
async def list_semesters(uid: str, request: Request):
    semesters = []
    for doc in await request.app.mongodb["semesters"].find({"owner": uid}).to_list(length=100):
        semesters.append(doc)
    if (len(semesters) != 0):
        return semesters

    raise HTTPException(status_code=404, detail=f"Semesters of user {uid} not found")


@router.get("/{uid}/semesters/{sid}", response_description="Get a single semester")
async def show_semester(uid: str, sid: str, request: Request):
    if (semester := await request.app.mongodb["semesters"].find_one({"_id": sid, "owner": uid})) is not None:
        return semester

    raise HTTPException(status_code=404, detail=f"Semester {sid} not found")


@router.put("/{uid}/semesters/{sid}", response_description="Update a semester")
async def update_semester(uid: str, sid: str, request: Request, semester: UpdateSemesterModel = Body(...)):
    semester = {k: v for k, v in semester.dict().items() if v is not None}

    if len(semester) >= 1:
        update_result = await request.app.mongodb["semesters"].update_one(
            {"_id": sid, "owner": id}, {"$set": semester}
        )

        if update_result.modified_count == 1:
            if (
                updated_task := await request.app.mongodb["semesters"].find_one({"_id": sid, "owner": uid})
            ) is not None:
                return updated_task

    if (
        existing_semester := await request.app.mongodb["semesters"].find_one({"_id": sid, "owner": uid})
    ) is not None:
        return existing_semester

    raise HTTPException(status_code=404, detail=f"Semester {sid} not found")


@router.delete("/{uid}/semesters/{sid}", response_description="Delete semester")
async def delete_semester(sid: str, request: Request):
    delete_result = await request.app.mongodb["semesters"].delete_one({"_id": sid})

    if delete_result.deleted_count == 1:
        return JSONResponse(status_code=status.HTTP_204_NO_CONTENT)

    raise HTTPException(status_code=404, detail=f"Semester {sid} not found")
