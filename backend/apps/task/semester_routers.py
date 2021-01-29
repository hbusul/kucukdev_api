from fastapi import APIRouter, Body, Request, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

from .models import SemesterModel, UpdateSemesterModel

router = APIRouter()

@router.post("", response_description="Add new semester")
async def create_semester(request: Request, semester: SemesterModel = Body(...)):
    semester = jsonable_encoder(semester)
    new_semester = await request.app.mongodb["semesters"].insert_one(semester)
    created_semester = await request.app.mongodb["semesters"].find_one(
        {"_id": new_semester.inserted_id}
    )

    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_semester)

@router.get("", response_description="List all semesters")
async def list_semesters(request: Request):
    semesters = []
    for doc in await request.app.mongodb["semesters"].find().to_list(length=100):
        semesters.append(doc)
    return semesters


@router.get("/{id}", response_description="Get a single semester")
async def show_semester(id: str, request: Request):
    if (semester := await request.app.mongodb["semesters"].find_one({"_id": id})) is not None:
        return semester

    raise HTTPException(status_code=404, detail=f"Semester {id} not found")


@router.put("/{id}", response_description="Update a semester")
async def update_semester(id: str, request: Request, semester: UpdateSemesterModel = Body(...)):
    semester = {k: v for k, v in semester.dict().items() if v is not None}

    if len(semester) >= 1:
        update_result = await request.app.mongodb["semesters"].update_one(
            {"_id": id}, {"$set": semester}
        )

        if update_result.modified_count == 1:
            if (
                updated_task := await request.app.mongodb["semesters"].find_one({"_id": id})
            ) is not None:
                return updated_task

    if (
        existing_semester := await request.app.mongodb["semesters"].find_one({"_id": id})
    ) is not None:
        return existing_semester

    raise HTTPException(status_code=404, detail=f"Semester {id} not found")


@router.delete("/{id}", response_description="Delete semester")
async def delete_semester(id: str, request: Request):
    delete_result = await request.app.mongodb["semesters"].delete_one({"_id": id})

    if delete_result.deleted_count == 1:
        return JSONResponse(status_code=status.HTTP_204_NO_CONTENT)

    raise HTTPException(status_code=404, detail=f"Semester {id} not found")


