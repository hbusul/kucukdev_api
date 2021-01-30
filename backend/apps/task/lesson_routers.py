from fastapi import APIRouter, Body, Request, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

from .models import LessonModel, UpdateLessonModel

router = APIRouter()


@router.post(
    "/{uid}/semesters/{sid}/lessons",
    response_description="Add new lesson into a semester",
)
async def create_lesson(
    uid: str,
    sid: str,
    request: Request,
    lesson: LessonModel = Body(...),
):
    lesson = jsonable_encoder(lesson)

    if (user := await request.app.mongodb["users"].find_one({"_id": uid})) is not None:
        update_result = await request.app.mongodb["users"].update_one(
            {"_id": uid, "semesters._id": sid},
            {"$push": {"semesters.$.lessons": lesson}},
        )

    if (
        existing_user := await request.app.mongodb["users"].find_one({"_id": uid})
    ) is not None:
        for semester in existing_user["semesters"]:
            if semester["_id"] == sid:
                return semester["lessons"]

    raise HTTPException(
        status_code=404, detail=f"Semester {sid} of user {uid} not found"
    )


@router.get(
    "/{uid}/semesters/{sid}/lessons",
    response_description="List all lessons of a semester",
)
async def list_lessons(uid: str, sid: str, request: Request):
    if (
        user := await request.app.mongodb["users"].find_one(
            {"_id": uid, "semesters._id": sid}
        )
    ) is not None:
        for semester in user["semesters"]:
            if semester["_id"] == sid:
                return semester["lessons"]

    raise HTTPException(status_code=404, detail=f"Semesters of user {uid} not found")


@router.get(
    "/{uid}/semesters/{sid}/lessons/{lid}",
    response_description="Get a single lesson of a semester",
)
async def show_lesson(uid: str, sid: str, lid: str, request: Request):
    if (
        user := await request.app.mongodb["users"].find_one(
            {"_id": uid, "semesters._id": sid}
        )
    ) is not None:
        for semester in user["semesters"]:
            if semester["_id"] == sid:
                for lesson in semester["lessons"]:
                    if lesson["_id"] == lid:
                        return lesson

    raise HTTPException(status_code=404, detail=f"Lesson of semester {sid} not found")


# @router.put(
#     "/{uid}/semesters/{sid}/lessons/{lid}", response_description="Update a lesson"
# )
# async def update_lesson(
#     uid: str,
#     sid: str,
#     lid: str,
#     request: Request,
#     lesson: UpdateLessonModel = Body(...),
# ):
#     lesson = {k: v for k, v in lesson.dict().items() if v is not None}

#     if len(lesson) >= 1:
#         update_result = await request.app.mongodb["users"].update_many(
#             {"_id": uid, "semesters._id": sid, "semesters.lessons._id": lid},
#             {
#                 "$set": {
#                     "semesters.$.lessons.$.name": lesson["name"],
#                 }
#             },
#         )

#     if (
#         existing_user := await request.app.mongodb["users"].find_one(
#             {"_id": uid, "semesters._id": sid}
#         )
#     ) is not None:
#         for semester in existing_user["semesters"]:
#             if semester["_id"] == sid:
#                 for lesson in semester["lessons"]:
#                     if lesson["_id"] == lid:
#                         return lesson

#     raise HTTPException(status_code=404, detail=f"Lesson {lid} not found")


@router.delete(
    "/{uid}/semesters/{sid}/lessons/{lid}", response_description="Delete lesson"
)
async def delete_lesson(uid: str, sid: str, lid: str, request: Request):

    if (user := await request.app.mongodb["users"].find_one({"_id": uid})) is not None:
        update_result = await request.app.mongodb["users"].update_one(
            {"_id": uid, "semesters._id": sid},
            {"$pull": {"semesters.$.lessons": {"_id": lid}}},
        )

        if update_result.modified_count == 1:
            if (
                updated_user := await request.app.mongodb["users"].find_one(
                    {"_id": uid, "semesters._id": sid}
                )
            ) is not None:
                for semester in user["semesters"]:
                    if semester["_id"] == sid:
                        for lesson in semester["lessons"]:
                            if lesson["_id"] == lid:
                                return lesson

    raise HTTPException(status_code=404, detail=f"Lesson {lid} not found")