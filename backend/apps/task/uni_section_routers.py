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

from .uni_models import UniversitySectionModel
from .user_models import Message

router = APIRouter()


@router.put(
    "/{unid}/semesters/{unisid}/lessons/{unilid}/sections/{secid}",
    response_description="Update a lesson section",
    operation_id="updateLessonSection",
    response_model=Message,
    responses={
        404: {"model": Message},
        400: {"model": Message},
    },
)
async def update_university_lesson(
    unid: str,
    unisid: str,
    unilid: str,
    secid: str,
    request: Request,
    new_section: UniversitySectionModel = Body(...),
):
    """Update section of a lesson with given universityID, universitySemesterID, universityLessonID and sectionID"""

    new_section = {k: v for k, v in new_section.dict().items() if v is not None}

    if (
        existing_university := await request.app.mongodb["universities"].find_one(
            {"_id": unid, "semesters._id": unisid, "semesters.lessons._id": unilid}
        )
    ) is not None:
        for semester in existing_university["semesters"]:
            if semester["_id"] == unisid:
                for lesson in semester["lessons"]:
                    if lesson["_id"] == unilid:
                        for section in lesson["sections"]:
                            if (
                                section["section"] == new_section["section"]
                                and section["_id"] != secid
                            ):
                                return JSONResponse(
                                    status_code=status.HTTP_400_BAD_REQUEST,
                                    content={"message": "Section already exists"},
                                )

    if len(new_section) >= 1:
        update_result = await request.app.mongodb["universities"].update_many(
            {
                "_id": unid,
                "semesters._id": unisid,
                "semesters.lessons._id": unilid,
                "semesters.lessons.sections._id": secid,
            },
            {
                "$set": {
                    "semesters.$[i].lessons.$[j].sections.$[k].section": new_section[
                        "section"
                    ],
                    "semesters.$[i].lessons.$[j].sections.$[k].instructor": new_section[
                        "instructor"
                    ],
                    "semesters.$[i].lessons.$[j].sections.$[k].slots": new_section[
                        "slots"
                    ],
                }
            },
            array_filters=[{"i._id": unisid}, {"j._id": unilid}, {"k._id": secid}],
        )

        if (
            updated_semester := await request.app.mongodb["universities"].find_one(
                {"_id": unid, "semesters._id": unisid, "semesters.lessons._id": unilid}
            )
        ) is not None:
            for semester in updated_semester["semesters"]:
                if semester["_id"] == unisid:
                    for lesson in semester["lessons"]:
                        if lesson["_id"] == unilid:
                            for section in lesson["sections"]:
                                if section["_id"] == secid:
                                    return JSONResponse(
                                        status_code=status.HTTP_200_OK, content=section
                                    )

    return JSONResponse(
        status_code=status.HTTP_404_NOT_FOUND,
        content={"message": "University lesson not found"},
    )


@router.delete(
    "/{unid}/semesters/{unisid}/lessons/{unilid}/sections/{secid}",
    response_description="Delete lesson section",
    operation_id="deleteLessonSection",
    response_model=Message,
    responses={
        404: {"model": Message},
    },
)
async def delete_lesson_section(
    unid: str,
    unisid: str,
    unilid: str,
    secid: str,
    request: Request,
):
    """Delete a lesson section with given universityID, universitySemesterID, universityLessonID and sectionID"""

    update_result = await request.app.mongodb["universities"].update_one(
        {
            "_id": unid,
            "semesters._id": unisid,
            "semesters.lessons._id": unilid,
        },
        {"$pull": {"semesters.$[i].lessons.$[j].sections": {"_id": secid}}},
        array_filters=[{"i._id": unisid}, {"j._id": unilid}],
    )

    if update_result.modified_count == 1:
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={"message": "Section deleted"},
        )

    return JSONResponse(
        status_code=status.HTTP_404_NOT_FOUND,
        content={"message": "Section not found"},
    )