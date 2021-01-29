from fastapi import APIRouter, Body, Request, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

from .models import LessonModel, UpdateLessonModel

router = APIRouter()

@router.post("", response_description="Add new lesson")
async def create_lesson(request: Request, lesson: LessonModel = Body(...)):
    lesson = jsonable_encoder(lesson)
    new_lesson = await request.app.mongodb["lessons"].insert_one(lesson)
    created_lesson = await request.app.mongodb["lessons"].find_one(
        {"_id": new_lesson.inserted_id}
    )

    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_lesson)


@router.get("", response_description="List all lessons")
async def list_lessons(request: Request):
    lessons = []
    for doc in await request.app.mongodb["lessons"].find().to_list(length=100):
        lessons.append(doc)
    return lessons


@router.get("/{id}", response_description="Get a single lesson")
async def show_lesson(id: str, request: Request):
    if (lesson := await request.app.mongodb["lessons"].find_one({"_id": id})) is not None:
        return lesson

    raise HTTPException(status_code=404, detail=f"Lesson {id} not found")


@router.put("/{id}", response_description="Update a lesson")
async def update_lesson(id: str, request: Request, lesson: UpdateLessonModel = Body(...)):
    lesson = {k: v for k, v in lesson.dict().items() if v is not None}

    if len(lesson) >= 1:
        update_result = await request.app.mongodb["lessons"].update_one(
            {"_id": id}, {"$set": lesson}
        )

        if update_result.modified_count == 1:
            if (
                updated_lesson := await request.app.mongodb["lessons"].find_one({"_id": id})
            ) is not None:
                return updated_lesson

    if (
        existing_lesson := await request.app.mongodb["lessons"].find_one({"_id": id})
    ) is not None:
        return existing_lesson

    raise HTTPException(status_code=404, detail=f"Lesson {id} not found")


@router.delete("/{id}", response_description="Delete lesson")
async def delete_lesson(id: str, request: Request):
    delete_result = await request.app.mongodb["lessons"].delete_one({"_id": id})

    if delete_result.deleted_count == 1:
        return JSONResponse(status_code=status.HTTP_204_NO_CONTENT)

    raise HTTPException(status_code=404, detail=f"Lesson {id} not found")