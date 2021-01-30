from fastapi import APIRouter, Body, Request, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

from .models import SemesterModel, UpdateSemesterModel, LessonModel, UpdateLessonModel

router = APIRouter()


@router.post("/{uid}/semesters", response_description="Add new semester")
async def create_semester(
    uid: str,
    request: Request,
    semester: SemesterModel = Body(...),
):
    semester = jsonable_encoder(semester)

    if (user := await request.app.mongodb["users"].find_one({"_id": uid})) is not None:
        update_result = await request.app.mongodb["users"].update_one(
            {"_id": uid}, {"$push": {"semesters": semester}}
        )

        if update_result.modified_count == 1:
            if (
                user := await request.app.mongodb["users"].find_one({"_id": uid})
            ) is not None:
                return user["semesters"]

    if (user := await request.app.mongodb["users"].find_one({"_id": uid})) is not None:
        return user["semesters"]

    raise HTTPException(status_code=404, detail=f"User {uid} not found")


@router.get("/{uid}/semesters", response_description="List all semesters")
async def list_semesters(uid: str, request: Request):
    if (user := await request.app.mongodb["users"].find_one({"_id": uid})) is not None:
        return user["semesters"]

    raise HTTPException(status_code=404, detail=f"Semesters of user {uid} not found")


@router.get("/{uid}/semesters/{sid}", response_description="Get a single semester")
async def show_semester(uid: str, sid: str, request: Request):
    if (user := await request.app.mongodb["users"].find_one({"_id": uid})) is not None:
        for semester in user["semesters"]:
            if semester["_id"] == sid:
                return semester

    raise HTTPException(status_code=404, detail=f"Semester {sid} not found")


@router.put("/{uid}/semesters/{sid}", response_description="Update a semester")
async def update_semester(
    uid: str, sid: str, request: Request, semester: UpdateSemesterModel = Body(...)
):
    semester = {k: v for k, v in semester.dict().items() if v is not None}

    if len(semester) >= 1:
        update_result = await request.app.mongodb["users"].update_many(
            {"_id": uid, "semesters._id": sid},
            {
                "$set": {
                    "semesters.$.name": semester["name"],
                    "semesters.$.startDate": semester["startDate"],
                    "semesters.$.endDate": semester["endDate"],
                    "semesters.$.startHour": semester["startHour"],
                    "semesters.$.dLesson": semester["dLesson"],
                    "semesters.$.dBreak": semester["dBreak"],
                    "semesters.$.slotCount": semester["slotCount"],
                }
            },
        )

        if (
            updated_user := await request.app.mongodb["users"].find_one({"_id": uid})
        ) is not None:
            for semester in updated_user["semesters"]:
                if semester["_id"] == sid:
                    return semester

    if (
        existing_user := await request.app.mongodb["users"].find_one({"_id": uid})
    ) is not None:
        for semester in existing_user["semesters"]:
            if semester["_id"] == sid:
                return semester

    raise HTTPException(status_code=404, detail=f"Semester {sid} not found")


@router.delete("/{uid}/semesters/{sid}", response_description="Delete semester")
async def delete_semester(uid: str, sid: str, request: Request):

    if (user := await request.app.mongodb["users"].find_one({"_id": uid})) is not None:
        update_result = await request.app.mongodb["users"].update_one(
            {"_id": uid}, {"$pull": {"semesters": {"_id": sid}}}
        )

        if update_result.modified_count == 1:
            if (
                updated_user := await request.app.mongodb["users"].find_one(
                    {"_id": uid}
                )
            ) is not None:
                for semester in updated_user["semesters"]:
                    if semester["_id"] == sid:
                        return semester

    if (
        existing_user := await request.app.mongodb["users"].find_one({"_id": uid})
    ) is not None:
        for semester in user["semesters"]:
            if semester["_id"] == sid:
                return semester

    raise HTTPException(status_code=404, detail=f"Semester {sid} not found")