from typing import List

from fastapi import APIRouter, Body, Depends, Request, status
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

from ...dependencies import get_current_user
from ...models.uni_models import UniversityCurriculumModel
from ...models.user_models import Message, MessageCreate, UserModel

router = APIRouter()


@router.post(
    "/{unid}/departments/{depid}/curriculums",
    response_description="Add new university department curriculum",
    operation_id="createUniversityDepartmentCurriculum",
    response_model=MessageCreate,
    responses={
        201: {"model": MessageCreate},
        401: {"model": Message},
        403: {"model": Message},
        404: {"model": Message},
        409: {"model": Message},
    },
)
async def create_department_curriculum(
    unid: str,
    depid: str,
    request: Request,
    department_curriculum: UniversityCurriculumModel = Body(...),
    auth_user: UserModel = Depends(get_current_user),
):
    """Create department for a university with given universityID and universityDepartmentID"""

    if auth_user["userGroup"] == "professor":
        department_curriculum = jsonable_encoder(department_curriculum)

        if (
            await request.app.mongodb["universities"].find_one(
                {
                    "_id": unid,
                    "departments._id": depid,
                    "departments.curriculums.name": department_curriculum["name"],
                }
            )
        ) is not None:
            return JSONResponse(
                status_code=status.HTTP_409_CONFLICT,
                content={"message": "University department curriculum already exists"},
            )

        update_result = await request.app.mongodb["universities"].update_one(
            {"_id": unid, "departments._id": depid},
            {"$push": {"departments.$.curriculums": department_curriculum}},
        )

        if update_result.modified_count == 1:
            return JSONResponse(
                status_code=status.HTTP_201_CREATED,
                content=jsonable_encoder(
                    MessageCreate(
                        id=department_curriculum["_id"],
                        message="Department curriculum created",
                    )
                ),
            )

        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "University or department not found"},
        )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )


@router.get(
    "/{unid}/departments/{depid}/curriculums",
    response_description="List all university curriculums",
    operation_id="listUniversityDepartmentCurriculums",
    response_model=List[UniversityCurriculumModel],
    responses={404: {"model": Message},},
)
async def list_department_curriculums(unid: str, depid: str, request: Request):
    """list all curriculums of a department of a university with given universityID and universityDepartmentID"""

    if (
        university := await request.app.mongodb["universities"].find_one(
            {"_id": unid, "departments._id": depid}
        )
    ) is not None:
        for department in university["departments"]:
            if department["_id"] == depid:
                return department["curriculums"]

    return JSONResponse(
        status_code=status.HTTP_404_NOT_FOUND,
        content={"message": "University department not found"},
    )


@router.get(
    "/{unid}/departments/{depid}/curriculums/{curid}",
    response_description="Show a university department curriculum",
    operation_id="getSingleUniversityDepartmentCurriculum",
    response_model=UniversityCurriculumModel,
    responses={404: {"model": Message},},
)
async def show_department_curriculum(
    unid: str, depid: str, curid: str, request: Request
):
    """Get a single semester of a university with given universityID, universityDepartmentID and departmentCurriculumID"""

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
                        return curriculum

    return JSONResponse(
        status_code=status.HTTP_404_NOT_FOUND,
        content={"message": "University department curriculum not found"},
    )


@router.put(
    "/{unid}/departments/{depid}/curriculums/{curid}",
    response_description="Update a university department curriculum",
    operation_id="updateUniversityDepartmentCurriculum",
    response_model=Message,
    responses={
        404: {"model": Message},
        403: {"model": Message},
        400: {"model": Message},
    },
)
async def update_department_curriculum(
    unid: str,
    depid: str,
    curid: str,
    request: Request,
    department_curriculum: UniversityCurriculumModel = Body(...),
    auth_user: UserModel = Depends(get_current_user),
):
    """Update department of a university with given universityID, universityDepartmentID and departmentCurriculumID"""

    if auth_user["userGroup"] == "professor":
        department_curriculum = {
            k: v for k, v in department_curriculum.dict().items() if v is not None
        }

        if (
            university := await request.app.mongodb["universities"].find_one(
                {
                    "_id": unid,
                    "departments._id": depid,
                    "departments.curriculums._id": curid,
                }
            )
        ) is None:
            return JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND,
                content={"message": "University department curriculum not found"},
            )
        else:
            for department in university["departments"]:
                if department["_id"] == depid:
                    for curriculum in department["curriculums"]:
                        if curriculum["name"] == department_curriculum["name"]:
                            return JSONResponse(
                                status_code=status.HTTP_400_BAD_REQUEST,
                                content={
                                    "message": "University department curriculum already exists"
                                },
                            )

        if len(department_curriculum) >= 1:
            update_result = await request.app.mongodb["universities"].update_many(
                {
                    "_id": unid,
                    "departments._id": depid,
                    "departments.curriculums._id": curid,
                },
                {
                    "$set": {
                        "departments.$[i].curriculums.$[j].name": department_curriculum[
                            "name"
                        ],
                        "departments.$[i].curriculums.$[j].startYear": department_curriculum[
                            "startYear"
                        ],
                        "departments.$[i].curriculums.$[j].endYear": department_curriculum[
                            "endYear"
                        ],
                    }
                },
                array_filters=[{"i._id": depid}, {"j._id": curid}],
            )

            if update_result.modified_count == 1:
                return JSONResponse(
                    status_code=status.HTTP_200_OK,
                    content={"message": "Curriculum updated"},
                )

        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"message": "Curriculum name cannot be empty"},
        )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )


@router.delete(
    "/{unid}/departments/{depid}/curriculums/{curid}",
    response_description="Delete university department curriculum",
    operation_id="deleteUniversityDepartmentCurriculum",
    response_model=Message,
    responses={404: {"model": Message}, 403: {"model": Message},},
)
async def delete_department_curriculum(
    unid: str,
    depid: str,
    curid: str,
    request: Request,
    auth_user: UserModel = Depends(get_current_user),
):
    """Delete a university department with given universityID, universityDepartmentID and departmentCurriculumID"""

    if auth_user["userGroup"] == "professor":
        delete_result = await request.app.mongodb["universities"].update_one(
            {"_id": unid, "departments._id": depid,},
            {"$pull": {"departments.$.curriculums": {"_id": curid}}},
        )

        if delete_result.modified_count == 1:
            return JSONResponse(
                status_code=status.HTTP_200_OK,
                content={"message": "Curriculum deleted"},
            )

        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "University department curriculum not found"},
        )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )
