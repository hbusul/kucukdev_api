from typing import List

from fastapi import APIRouter, Body, Depends, Request, status
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

from ...dependencies import get_current_user
from ...models.uni_models import CurriculumSemesterModel
from ...models.user_models import Message, MessageCreate, UserModel

router = APIRouter()


@router.post(
    "/{unid}/departments/{depid}/curriculums/{curid}/semesters",
    response_description="Add new curriculum semester",
    operation_id="createCurriculumSemester",
    response_model=MessageCreate,
    responses={
        201: {"model": MessageCreate},
        401: {"model": Message},
        403: {"model": Message},
        404: {"model": Message},
        409: {"model": Message},
    },
)
async def create_curriculum_semester(
    unid: str,
    depid: str,
    curid: str,
    request: Request,
    curriculum_semester: CurriculumSemesterModel = Body(...),
    auth_user: UserModel = Depends(get_current_user),
):
    """Create semester for a curriculum with given universityID, universityDepartmentID and departmentCurriculumID"""

    if auth_user["userGroup"] == "professor":
        curriculum_semester = jsonable_encoder(curriculum_semester)

        if (
            await request.app.mongodb["universities"].find_one(
                {
                    "_id": unid,
                    "departments._id": depid,
                    "departments.curriculums._id": curid,
                    "departments.curriculums.semesters.semester": curriculum_semester[
                        "semester"
                    ],
                }
            )
        ) is not None:
            return JSONResponse(
                status_code=status.HTTP_409_CONFLICT,
                content={"message": "Curriculum semester already exists"},
            )

        update_result = await request.app.mongodb["universities"].update_one(
            {
                "_id": unid,
                "departments._id": depid,
                "departments.curriculums._id": curid,
            },
            {
                "$push": {
                    "departments.$[i].curriculums.$[j].semesters": curriculum_semester
                }
            },
            array_filters=[
                {"i._id": depid},
                {"j._id": curid},
            ],
        )

        if update_result.modified_count == 1:
            return JSONResponse(
                status_code=status.HTTP_201_CREATED,
                content=jsonable_encoder(
                    MessageCreate(
                        id=curriculum_semester["_id"],
                        message="Curriculum semester created",
                    )
                ),
            )

        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "University or department or curriculum not found"},
        )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )


@router.get(
    "/{unid}/departments/{depid}/curriculums/{curid}/semesters",
    response_description="List all curriculum semesters",
    operation_id="listCurriculumSemesters",
    response_model=List[CurriculumSemesterModel],
    responses={
        404: {"model": Message},
    },
)
async def list_curriculum_semesters(
    unid: str, depid: str, curid: str, request: Request
):
    """list all semesters of a curriculum of a department with given universityID, universityDepartmentID and departmentCurriculumID"""

    if (
        university := await request.app.mongodb["universities"].find_one(
            {
                "_id": unid,
                "departments._id": depid,
                "departments.curriculums._id": curid,
            }
        )
    ) is not None:
        for department in university["departments"]:
            if department["_id"] == depid:
                for curriculum in department["curriculums"]:
                    if curriculum["_id"] == curid:
                        return curriculum["semesters"]

    return JSONResponse(
        status_code=status.HTTP_404_NOT_FOUND,
        content={"message": "Curriculum semester not found"},
    )


@router.get(
    "/{unid}/departments/{depid}/curriculums/{curid}/semesters/{cursid}",
    response_description="Show a university curriculum semester",
    operation_id="getSingleCurriculumSemester",
    response_model=CurriculumSemesterModel,
    responses={
        404: {"model": Message},
    },
)
async def show_curriculum_semester(
    unid: str, depid: str, curid: str, cursid: str, request: Request
):
    """Get a single semester of a curriculum with given universityID, universityDepartmentID, departmentCurriculumID and curriculumSemesterID"""

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
                                return semester

    return JSONResponse(
        status_code=status.HTTP_404_NOT_FOUND,
        content={"message": "Curriculum semester not found"},
    )


@router.put(
    "/{unid}/departments/{depid}/curriculums/{curid}/semesters/{cursid}",
    response_description="Update a curriculum semester",
    operation_id="updateCurriculumSemester",
    response_model=Message,
    responses={
        404: {"model": Message},
        403: {"model": Message},
        400: {"model": Message},
    },
)
async def update_curriculum_semester(
    unid: str,
    depid: str,
    curid: str,
    cursid: str,
    request: Request,
    curriculum_semester: CurriculumSemesterModel = Body(...),
    auth_user: UserModel = Depends(get_current_user),
):
    """Update semester of a curriculum with given universityID, universityDepartmentID, departmentCurriculumID and curriculumSemesterID"""

    if auth_user["userGroup"] == "professor":
        curriculum_semester = {
            k: v for k, v in curriculum_semester.dict().items() if v is not None
        }

        if (
            university := await request.app.mongodb["universities"].find_one(
                {
                    "_id": unid,
                    "departments._id": depid,
                    "departments.curriculums._id": curid,
                    "departments.curriculums.semesters._id": cursid,
                }
            )
        ) is None:
            return JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND,
                content={"message": "Curriculum semester not found"},
            )
        else:
            for department in university["departments"]:
                if department["_id"] == depid:
                    for curriculum in department["curriculums"]:
                        if curriculum["_id"] == curid:
                            for semester in curriculum["semesters"]:
                                if (
                                    semester["semester"]
                                    == curriculum_semester["semester"]
                                ):
                                    return JSONResponse(
                                        status_code=status.HTTP_400_BAD_REQUEST,
                                        content={
                                            "message": "Curriculum semester already exists"
                                        },
                                    )

        if len(curriculum_semester) >= 1:
            update_result = await request.app.mongodb["universities"].update_many(
                {
                    "_id": unid,
                    "departments._id": depid,
                    "departments.curriculums._id": curid,
                    "departments.curriculums.semesters._id": cursid,
                },
                {
                    "$set": {
                        "departments.$[i].curriculums.$[j].semesters.$[k].semester": curriculum_semester[
                            "semester"
                        ],
                    }
                },
                array_filters=[{"i._id": depid}, {"j._id": curid}, {"k._id": cursid}],
            )

            if update_result.modified_count == 1:
                return JSONResponse(
                    status_code=status.HTTP_200_OK,
                    content={"message": "Curriculum semester updated"},
                )

        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"message": "Curriculum semester cannot be empty"},
        )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )


@router.delete(
    "/{unid}/departments/{depid}/curriculums/{curid}/semesters/{cursid}",
    response_description="Delete curriculum semester",
    operation_id="deleteCurriculumSemester",
    response_model=Message,
    responses={
        404: {"model": Message},
        403: {"model": Message},
    },
)
async def delete_curriculum_semester(
    unid: str,
    depid: str,
    curid: str,
    cursid: str,
    request: Request,
    auth_user: UserModel = Depends(get_current_user),
):
    """Delete a university department with given universityID, universityDepartmentID, departmentCurriculumID and curriculumSemesterID"""

    if auth_user["userGroup"] == "professor":
        delete_result = await request.app.mongodb["universities"].update_one(
            {
                "_id": unid,
                "departments._id": depid,
                "departments.curriculums._id": curid,
            },
            {"$pull": {"departments.$[i].curriculums.$[j].semesters": {"_id": cursid}}},
            array_filters=[
                {"i._id": depid},
                {"j._id": curid},
            ],
        )

        if delete_result.modified_count == 1:
            return JSONResponse(
                status_code=status.HTTP_200_OK,
                content={"message": "Curriculum semester deleted"},
            )

        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "Curriculum semester not found"},
        )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )
