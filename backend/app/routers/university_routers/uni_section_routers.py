from fastapi import (
    APIRouter,
    Body,
    Request,
    status,
    Response,
    Depends,
)
from fastapi.responses import JSONResponse

from ...dependencies import get_current_user
from ...models.uni_models import UniversitySectionModel
from ...models.user_models import UserModel, Message

router = APIRouter()


@router.put(
    "/{unid}/semesters/{unisid}/lessons/{unilid}/sections/{secid}",
    response_description="Update a lesson section",
    operation_id="updateLessonSection",
    response_model=Message,
    responses={
        404: {"model": Message},
        403: {"model": Message},
        400: {"model": Message},
    },
)
async def update_lesson_section(
    unid: str,
    unisid: str,
    unilid: str,
    secid: str,
    request: Request,
    new_section: UniversitySectionModel = Body(...),
    auth_user: UserModel = Depends(get_current_user),
):
    """Update section of a lesson with given universityID, universitySemesterID, universityLessonID and sectionID"""
    new_section = {k: v for k, v in new_section.dict().items() if v is not None}

    for slot in new_section["slots"]:
        cur_slot = slot.split(",")
        if len(cur_slot) == 3:
            if int(cur_slot[0]) < 0 or int(cur_slot[0]) > 4:
                return JSONResponse(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    content={"message": "Slot day cannot be < 0 or > 4"},
                )
            if int(cur_slot[1]) < 0 or int(cur_slot[1]) > 15:
                return JSONResponse(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    content={"message": "Slot hour cannot be < 0 or > 15"},
                )
            if int(cur_slot[2]) < 0 or int(cur_slot[2]) > 1:
                return JSONResponse(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    content={"message": "Slot lab hour must be 0 or 1"},
                )
        else:
            return JSONResponse(
                status_code=status.HTTP_400_BAD_REQUEST,
                content={"message": "Invalid lesson slot"},
            )

    if new_section["instructor"] == "" or new_section["section"] == "":
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"message": "Instructor name or section must be filled"},
        )

    if auth_user["userGroup"] == "professor":

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
                    {
                        "_id": unid,
                        "semesters._id": unisid,
                        "semesters.lessons._id": unilid,
                    }
                )
            ) is not None:
                for semester in updated_semester["semesters"]:
                    if semester["_id"] == unisid:
                        for lesson in semester["lessons"]:
                            if lesson["_id"] == unilid:
                                for section in lesson["sections"]:
                                    if section["_id"] == secid:
                                        return JSONResponse(
                                            status_code=status.HTTP_200_OK,
                                            content=section,
                                        )

        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "University lesson not found"},
        )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )


@router.delete(
    "/{unid}/semesters/{unisid}/lessons/{unilid}/sections/{secid}",
    response_description="Delete a lesson section",
    operation_id="deleteLessonSection",
    response_model=Message,
    responses={
        404: {"model": Message},
        403: {"model": Message},
    },
)
async def delete_lesson_section(
    unid: str,
    unisid: str,
    unilid: str,
    secid: str,
    request: Request,
    auth_user: UserModel = Depends(get_current_user),
):
    """Delete a lesson section with given universityID, universitySemesterID, universityLessonID and sectionID"""

    if auth_user["userGroup"] == "professor":
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

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )