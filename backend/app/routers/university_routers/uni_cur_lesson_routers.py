from typing import List

from fastapi import APIRouter, Body, Depends, Request, status
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

from ...dependencies import get_current_user
from ...models.uni_models import CurriculumLessonModel
from ...models.user_models import Message, MessageCreate, UserModel

router = APIRouter()


@router.post(
    "/{unid}/departments/{depid}/curriculums/{curid}/semesters/{cursid}/lessons",
    response_description="Add new curriculum lesson",
    operation_id="createCurriculumLesson",
    response_model=MessageCreate,
    responses={
        201: {"model": MessageCreate},
        401: {"model": Message},
        403: {"model": Message},
        404: {"model": Message},
        409: {"model": Message},
    },
)
async def create_curriculum_lesson(
    unid: str,
    depid: str,
    curid: str,
    cursid: str,
    request: Request,
    curriculum_lesson: CurriculumLessonModel = Body(...),
    auth_user: UserModel = Depends(get_current_user),
):
    """Create lesson for a curriculum semester with given universityID, universityDepartmentID, departmentCurriculumID and curriculumSemesterID"""

    if auth_user["userGroup"] == "professor":
        curriculum_lesson = jsonable_encoder(curriculum_lesson)

        if (
            await request.app.mongodb["universities"].find_one(
                {
                    "_id": unid,
                    "departments._id": depid,
                    "departments.curriculums._id": curid,
                    "departments.curriculums.semesters._id": cursid,
                    "departments.curriculums.semesters.lessons.code": curriculum_lesson[
                        "code"
                    ],
                }
            )
        ) is not None:
            return JSONResponse(
                status_code=status.HTTP_409_CONFLICT,
                content={"message": "Curriculum lesson already exists"},
            )

        update_result = await request.app.mongodb["universities"].update_one(
            {
                "_id": unid,
                "departments._id": depid,
                "departments.curriculums._id": curid,
                "departments.curriculums.semesters._id": cursid,
            },
            {
                "$push": {
                    "departments.$[i].curriculums.$[j].semesters.$[k].lessons": curriculum_lesson
                }
            },
            array_filters=[{"i._id": depid}, {"j._id": curid}, {"k._id": cursid},],
        )

        if update_result.modified_count == 1:
            return JSONResponse(
                status_code=status.HTTP_201_CREATED,
                content=jsonable_encoder(
                    MessageCreate(
                        id=curriculum_lesson["_id"], message="Curriculum lesson created"
                    )
                ),
            )

        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "Curriculum semester not found"},
        )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )


@router.get(
    "/{unid}/departments/{depid}/curriculums/{curid}/semesters/{cursid}/lessons",
    response_description="List all curriculum lessons",
    operation_id="listCurriculumLessons",
    response_model=List[CurriculumLessonModel],
    responses={404: {"model": Message},},
)
async def list_curriculum_lessons(
    unid: str, depid: str, curid: str, cursid: str, request: Request
):
    """list all lessons of a curriculum semester of a department with given universityID, universityDepartmentID, departmentCurriculumID and curriculumSemesterID"""

    if (
        university := await request.app.mongodb["universities"]
        .aggregate(
            [
                {
                    "$match": {
                        "_id": unid,
                        "departments._id": depid,
                        "departments.curriculums._id": curid,
                    }
                },
                {"$unwind": "$departments"},
                {"$unwind": "$departments.curriculums"},
                {"$unwind": "$departments.curriculums.semesters"},
                {"$match": {"departments.curriculums.semesters._id": cursid}},
            ]
        )
        .to_list(length=None)
    ) :
        return university[0]["departments"]["curriculums"]["semesters"]["lessons"]

    return JSONResponse(
        status_code=status.HTTP_404_NOT_FOUND,
        content={"message": "Curriculum semester not found"},
    )


@router.get(
    "/{unid}/departments/{depid}/curriculums/{curid}/semesters/{cursid}/lessons/{curlid}",
    response_description="Show a curriculum semester lesson",
    operation_id="getSingleCurriculumLesson",
    response_model=CurriculumLessonModel,
    responses={404: {"model": Message},},
)
async def show_curriculum_lesson(
    unid: str, depid: str, curid: str, cursid: str, curlid: str, request: Request
):
    """Get a single lesson of a curriculum semester with given universityID, universityDepartmentID, departmentCurriculumID, curriculumSemesterID and curriculumLessonID"""

    if (
        university := await request.app.mongodb["universities"]
        .aggregate(
            [
                {
                    "$match": {
                        "_id": unid,
                        "departments._id": depid,
                        "departments.curriculums._id": curid,
                        "departments.curriculums.semesters._id": cursid,
                    }
                },
                {"$unwind": "$departments"},
                {"$unwind": "$departments.curriculums"},
                {"$unwind": "$departments.curriculums.semesters"},
                {"$unwind": "$departments.curriculums.semesters.lessons"},
                {"$match": {"departments.curriculums.semesters.lessons._id": curlid}},
            ]
        )
        .to_list(length=None)
    ) :
        return university[0]["departments"]["curriculums"]["semesters"]["lessons"]

    return JSONResponse(
        status_code=status.HTTP_404_NOT_FOUND,
        content={"message": "Curriculum lesson not found"},
    )


@router.put(
    "/{unid}/departments/{depid}/curriculums/{curid}/semesters/{cursid}/lessons/{curlid}",
    response_description="Update a curriculum lesson",
    operation_id="updateCurriculumLesson",
    response_model=Message,
    responses={
        400: {"model": Message},
        401: {"model": Message},
        403: {"model": Message},
        409: {"model": Message},
    },
)
async def update_curriculum_lesson(
    unid: str,
    depid: str,
    curid: str,
    cursid: str,
    curlid: str,
    request: Request,
    curriculum_lesson: CurriculumLessonModel = Body(...),
    auth_user: UserModel = Depends(get_current_user),
):
    """Update lesson of a curriculum semester with given universityID, universityDepartmentID, departmentCurriculumID, curriculumSemesterID and curriculumLessonID"""

    if auth_user["userGroup"] == "professor":
        curriculum_lesson = jsonable_encoder(curriculum_lesson)

        if (
            await (
                request.app.mongodb["universities"]
                .aggregate(
                    [
                        {
                            "$match": {
                                "_id": unid,
                                "departments._id": depid,
                                "departments.curriculums._id": curid,
                                "departments.curriculums.semesters._id": cursid,
                            },
                        },
                        {"$unwind": "$departments"},
                        {"$unwind": "$departments.curriculums"},
                        {"$unwind": "$departments.curriculums.semesters"},
                        {"$unwind": "$departments.curriculums.semesters.lessons"},
                        {
                            "$match": {
                                "departments.curriculums.semesters.lessons._id": curlid,
                                "departments.curriculums.semesters.lessons.code": curriculum_lesson[
                                    "code"
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
                                "departments._id": depid,
                                "departments.curriculums._id": curid,
                                "departments.curriculums.semesters._id": cursid,
                            },
                        },
                        {"$unwind": "$departments"},
                        {"$unwind": "$departments.curriculums"},
                        {"$unwind": "$departments.curriculums.semesters"},
                        {"$unwind": "$departments.curriculums.semesters.lessons"},
                        {
                            "$match": {
                                "departments.curriculums.semesters.lessons.code": curriculum_lesson[
                                    "code"
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
                    "message": "Lesson could not be found or there exists another lesson with given lesson code"
                },
            )

        update_result = await request.app.mongodb["universities"].update_many(
            {
                "_id": unid,
                "departments._id": depid,
                "departments.curriculums._id": curid,
                "departments.curriculums.semesters._id": cursid,
                "departments.curriculums.semesters.lessons._id": curlid,
            },
            {
                "$set": {
                    "departments.$[i].curriculums.$[j].semesters.$[k].lessons.$[l].name": curriculum_lesson[
                        "name"
                    ],
                    "departments.$[i].curriculums.$[j].semesters.$[k].lessons.$[l].code": curriculum_lesson[
                        "code"
                    ],
                    "departments.$[i].curriculums.$[j].semesters.$[k].lessons.$[l].lessonType": curriculum_lesson[
                        "lessonType"
                    ],
                }
            },
            array_filters=[
                {"i._id": depid},
                {"j._id": curid},
                {"k._id": cursid},
                {"l._id": curlid},
            ],
        )

        if update_result.modified_count == 1:
            return JSONResponse(
                status_code=status.HTTP_200_OK,
                content={"message": "Curriculum lesson updated"},
            )

        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"message": "Curriculum lesson could not be updated"},
        )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )


@router.delete(
    "/{unid}/departments/{depid}/curriculums/{curid}/semesters/{cursid}/lessons/{curlid}",
    response_description="Delete curriculum lesson",
    operation_id="deleteCurriculumLesson",
    response_model=Message,
    responses={404: {"model": Message}, 403: {"model": Message},},
)
async def delete_curriculum_lesson(
    unid: str,
    depid: str,
    curid: str,
    cursid: str,
    curlid: str,
    request: Request,
    auth_user: UserModel = Depends(get_current_user),
):
    """Delete a lesson of a curriculum semester with given universityID, universityDepartmentID, departmentCurriculumID, curriculumSemesterID and curriculumLessonID"""

    if auth_user["userGroup"] == "professor":
        delete_result = await request.app.mongodb["universities"].update_one(
            {
                "_id": unid,
                "departments._id": depid,
                "departments.curriculums._id": curid,
                "departments.curriculums.semesters._id": cursid,
            },
            {
                "$pull": {
                    "departments.$[i].curriculums.$[j].semesters.$[k].lessons": {
                        "_id": curlid
                    }
                }
            },
            array_filters=[{"i._id": depid}, {"j._id": curid}, {"k._id": cursid},],
        )

        if delete_result.modified_count == 1:
            return JSONResponse(
                status_code=status.HTTP_200_OK,
                content={"message": "Curriculum lesson deleted"},
            )

        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "Curriculum lesson not found"},
        )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )
