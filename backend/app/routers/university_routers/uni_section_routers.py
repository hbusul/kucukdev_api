import json

from fastapi import APIRouter, Body, Depends, Request, status
from fastapi.responses import JSONResponse

from ...dependencies import get_current_user
from ...models.uni_models import UniversitySectionModel
from ...models.user_models import Message, UserModel

router = APIRouter()


@router.put(
    "/{unid}/semesters/{unisid}/lessons/{unilid}/sections/{secid}",
    response_description="Update a lesson section",
    operation_id="updateLessonSection",
    response_model=Message,
    responses={
        403: {"model": Message},
        404: {"model": Message},
        409: {"model": Message},
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

    new_section = new_section.json(by_alias=True, models_as_dict=False)
    new_section = json.loads(new_section.replace("\\", ""))

    if auth_user["userGroup"] == "professor":

        if (
            await (
                request.app.mongodb["universities"]
                .aggregate(
                    [
                        {
                            "$match": {
                                "_id": unid,
                                "semesters._id": unisid,
                                "semesters.lessons._id": unilid,
                            },
                        },
                        {"$unwind": "$semesters"},
                        {"$unwind": "$semesters.lessons"},
                        {"$unwind": "$semesters.lessons.sections"},
                        {
                            "$match": {
                                "semesters.lessons._id": unilid,
                                "semesters.lessons.sections._id": secid,
                                "semesters.lessons.sections.section": new_section[
                                    "section"
                                ],
                            },
                        },
                    ]
                )
                .to_list(length=None)
            )
        ) == [] and (
            await (
                request.app.mongodb["universities"]
                .aggregate(
                    [
                        {
                            "$match": {
                                "_id": unid,
                                "semesters._id": unisid,
                                "semesters.lessons._id": unilid,
                            },
                        },
                        {"$unwind": "$semesters"},
                        {"$unwind": "$semesters.lessons"},
                        {"$unwind": "$semesters.lessons.sections"},
                        {
                            "$match": {
                                "semesters.lessons._id": unilid,
                                "semesters.lessons.sections.section": new_section[
                                    "section"
                                ],
                            },
                        },
                    ]
                )
                .to_list(length=None)
            )
        ):
            return JSONResponse(
                status_code=status.HTTP_409_CONFLICT,
                content={
                    "message": "Section could not be found or there exists another section with given section number"
                },
            )

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

        if update_result.modified_count == 1:
            return JSONResponse(
                status_code=status.HTTP_200_OK,
                content={"message": "Section updated"},
            )

        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"message": "Section could not be updated"},
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
        403: {"model": Message},
        404: {"model": Message},
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
            content={"message": "Section could not be deleted"},
        )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )
