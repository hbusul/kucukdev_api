from fastapi import (
    APIRouter,
    Body,
    Request,
    status,
    Depends,
)
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from typing import List

from apps.task import user_models
from .uni_models import CurriculumLessonModel
from .user_models import UserModel, Message

router = APIRouter()


@router.post(
    "/{unid}/departments/{depid}/curriculums/{curid}/semesters{cursid}/lessons",
    response_description="Add new curriculum lesson",
    operation_id="createCurriculumLesson",
    response_model=CurriculumLessonModel,
    responses={
        400: {"model": Message},
        403: {"model": Message},
        404: {"model": Message},
    },
)
async def create_curriculum_lesson(
    unid: str,
    depid: str,
    curid: str,
    cursid: str,
    request: Request,
    curriculum_lesson: CurriculumLessonModel = Body(...),
    auth_user: UserModel = Depends(user_models.get_current_user),
):
    """Create lesson for a curriculum semester with given universityID, universityDepartmentID, departmentCurriculumID and curriculumSemesterID"""

    if auth_user["userGroup"] == "professor":
        curriculum_lesson = jsonable_encoder(curriculum_lesson)

        if (
            university := await request.app.mongodb["universities"].find_one(
                {
                    "_id": unid,
                    "departments._id": depid,
                    "departments.curriculums._id": curid,
                    "departments.curriculums.semesters._id": cursid,
                }
            )
        ) is not None:
            for department in university["departments"]:
                if department["_id"] == depid:
                    for curriculum in department["curriculums"]:
                        if curriculum["_id"] == curid:
                            for semester in curriculum["semesters"]:
                                if semester["_id"] == cursid:
                                    for lesson in semester["lessons"]:
                                        if lesson["name"] == curriculum_lesson["name"]:
                                            return JSONResponse(
                                                status_code=status.HTTP_400_BAD_REQUEST,
                                                content={
                                                    "message": "Curriculum lesson already exists"
                                                },
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
            array_filters=[
                {"i._id": depid},
                {"j._id": curid},
                {"k._id": cursid},
            ],
        )

        if update_result.modified_count == 1:
            if (
                created_department := await request.app.mongodb[
                    "universities"
                ].find_one({"_id": unid, "departments._id": depid})
            ) is not None:
                for department in created_department["departments"]:
                    if department["_id"] == depid:
                        for curriculum in department["curriculums"]:
                            if curriculum["_id"] == curid:
                                for semester in curriculum["semesters"]:
                                    if semester["_id"] == cursid:
                                        return JSONResponse(
                                            status_code=status.HTTP_200_OK,
                                            content=semester["lessons"],
                                        )

        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "Curriculum not found"},
        )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )


@router.get(
    "/{unid}/departments/{depid}/curriculums/{curid}/semesters{cursid}/lessons",
    response_description="List all curriculum lessons",
    operation_id="listCurriculumLessons",
    response_model=List[CurriculumLessonModel],
    responses={
        404: {"model": Message},
    },
)
async def list_curriculum_lessons(
    unid: str, depid: str, curid: str, cursid: str, request: Request
):
    """list all lessons of a curriculum semester of a department with given universityID, universityDepartmentID, departmentCurriculumID and curriculumSemesterID"""

    if (
        university := await request.app.mongodb["universities"].find_one(
            {
                "_id": unid,
                "departments._id": depid,
                "departments.curriculums._id": curid,
                "departments.curriculums.semesters._id": cursid,
            }
        )
    ) is not None:
        for department in university["departments"]:
            if department["_id"] == depid:
                for curriculum in department["curriculums"]:
                    if curriculum["_id"] == curid:
                        for semester in curriculum["semesters"]:
                            if semester["_id"] == cursid:
                                return JSONResponse(
                                    status_code=status.HTTP_200_OK,
                                    content=semester["lessons"],
                                )

    return JSONResponse(
        status_code=status.HTTP_404_NOT_FOUND,
        content={"message": "Curriculum lesson not found"},
    )


@router.get(
    "/{unid}/departments/{depid}/curriculums/{curid}/semesters/{cursid}/lessons/{curlid}",
    response_description="Show a curriculum semester lesson",
    operation_id="getSingleCurriculumLesson",
    response_model=CurriculumLessonModel,
    responses={
        404: {"model": Message},
    },
)
async def show_curriculum_lesson(
    unid: str, depid: str, curid: str, cursid: str, curlid: str, request: Request
):
    """Get a single semester of a curriculum with given universityID, universityDepartmentID, departmentCurriculumID, curriculumSemesterID and curriculumLessonID"""

    if (
        university := await request.app.mongodb["universities"].find_one(
            {
                "_id": unid,
                "departments._id": depid,
                "departments.curriculums._id": curid,
                "departments.curriculums.semesters._id": cursid,
                "departments.curriculums.semesters.lessons._id": curlid,
            }
        )
    ) is not None:
        for department in university["departments"]:
            if department["_id"] == depid:
                for curriculum in department["curriculums"]:
                    if curriculum["_id"] == curid:
                        for semester in curriculum["semesters"]:
                            if semester["_id"] == cursid:
                                for lesson in semester["lessons"]:
                                    if lesson["_id"] == curlid:
                                        return JSONResponse(
                                            status_code=status.HTTP_200_OK,
                                            content=lesson,
                                        )

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
        404: {"model": Message},
        403: {"model": Message},
        400: {"model": Message},
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
    auth_user: UserModel = Depends(user_models.get_current_user),
):
    """Update semester of a curriculum with given universityID, universityDepartmentID, departmentCurriculumID, curriculumSemesterID and curriculumLessonID"""

    if auth_user["userGroup"] == "professor":
        curriculum_lesson = {
            k: v for k, v in curriculum_lesson.dict().items() if v is not None
        }

        if (
            university := await request.app.mongodb["universities"].find_one(
                {
                    "_id": unid,
                    "departments._id": depid,
                    "departments.curriculums._id": curid,
                    "departments.curriculums.semesters._id": cursid,
                    "departments.curriculums.semesters.lessons._id": curlid,
                }
            )
        ) is None:
            return JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND,
                content={"message": "Curriculum lesson not found"},
            )
        else:
            for department in university["departments"]:
                if department["_id"] == depid:
                    for curriculum in department["curriculums"]:
                        if curriculum["_id"] == curid:
                            for semester in curriculum["semesters"]:
                                if semester["_id"] == cursid:
                                    for lesson in semester["lessons"]:
                                        if lesson["name"] == curriculum_lesson["name"]:
                                            return JSONResponse(
                                                status_code=status.HTTP_400_BAD_REQUEST,
                                                content={
                                                    "message": "Curriculum lesson already exists"
                                                },
                                            )

        if len(curriculum_lesson) >= 1:
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
            content={
                "message": "Curriculum lesson input cannot be same with others or empty"
            },
        )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )


@router.delete(
    "/{unid}/departments/{depid}/curriculums/{curid}/semesters/{cursid}/lessons/{curlid}",
    response_description="Delete curriculum lesson",
    operation_id="deleteCurriculumLesson",
    response_model=Message,
    responses={
        404: {"model": Message},
        403: {"model": Message},
    },
)
async def delete_curriculum_lesson(
    unid: str,
    depid: str,
    curid: str,
    cursid: str,
    curlid: str,
    request: Request,
    auth_user: UserModel = Depends(user_models.get_current_user),
):
    """Delete a university department with given universityID, universityDepartmentID, departmentCurriculumID, curriculumSemesterID and curriculumLessonID"""

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
            array_filters=[
                {"i._id": depid},
                {"j._id": curid},
                {"k._id": cursid},
            ],
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
