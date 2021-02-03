from fastapi import APIRouter, Body, Request, HTTPException, status, Depends, Response
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

from .models import SemesterModel, UpdateSemesterModel, SemesterAPIModel
from apps.task import models

router = APIRouter()


@router.post("/{uid}/semesters", response_description="Add new semester")
async def create_semester(
    uid: str,
    request: Request,
    semester: SemesterModel = Body(...),
    token: str = Depends(models.oauth2_scheme),
):
    semester = jsonable_encoder(semester)
    if (
        auth_user := await models.get_current_user(request, token)
    ) is not None and auth_user["_id"] == uid:
        update_result = await request.app.mongodb["users"].update_one(
            {"_id": uid}, {"$push": {"semesters": semester}}
        )

        if update_result.modified_count == 1:
            if (
                created_semester := await request.app.mongodb["users"].find_one(
                    {"_id": uid}, {"semesters": {"$slice": -1}}
                )
            ) is not None:
                for semester in created_semester["semesters"]:
                    sid = semester["_id"]
                    lessons_url = (
                        f"api.kucukdev.org/users/{uid}/semesters/{sid}/lessons"
                    )
                    semesterAPI = SemesterAPIModel(
                        id=semester["_id"],
                        name=semester["name"],
                        startDate=semester["startDate"],
                        endDate=semester["endDate"],
                        startHour=semester["startHour"],
                        dLesson=semester["dLesson"],
                        dBreak=semester["dBreak"],
                        slotCount=semester["slotCount"],
                        lessons_url=lessons_url,
                    )

                    return semesterAPI

        raise HTTPException(status_code=404, detail=f"User not found")

    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="No right to access",
    )


@router.get("/{uid}/semesters", response_description="List all semesters")
async def list_semesters(
    uid: str, request: Request, token: str = Depends(models.oauth2_scheme)
):
    semesters_API = []
    if (
        auth_user := await models.get_current_user(request, token)
    ) is not None and auth_user["_id"] == uid:
        if auth_user["semesters"] is not None:
            for semester in auth_user["semesters"]:
                sid = semester["_id"]
                lessons_url = f"api.kucukdev.org/users/{uid}/semesters/{sid}/lessons"
                semesterAPI = SemesterAPIModel(
                    id=semester["_id"],
                    name=semester["name"],
                    startDate=semester["startDate"],
                    endDate=semester["endDate"],
                    startHour=semester["startHour"],
                    dLesson=semester["dLesson"],
                    dBreak=semester["dBreak"],
                    slotCount=semester["slotCount"],
                    lessons_url=lessons_url,
                )
                semesters_API.append(semesterAPI)

            return semesters_API

        raise HTTPException(status_code=404, detail=f"Semesters of user not found")

    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="No right to access",
    )


@router.get("/{uid}/semesters/{sid}", response_description="Get a single semester")
async def show_semester(
    uid: str, sid: str, request: Request, token: str = Depends(models.oauth2_scheme)
):
    if (
        auth_user := await models.get_current_user(request, token)
    ) is not None and auth_user["_id"] == uid:
        for semester in auth_user["semesters"]:
            if semester["_id"] == sid:
                sid = semester["_id"]
                lessons_url = f"api.kucukdev.org/users/{uid}/semesters/{sid}/lessons"
                semesterAPI = SemesterAPIModel(
                    id=semester["_id"],
                    name=semester["name"],
                    startDate=semester["startDate"],
                    endDate=semester["endDate"],
                    startHour=semester["startHour"],
                    dLesson=semester["dLesson"],
                    dBreak=semester["dBreak"],
                    slotCount=semester["slotCount"],
                    lessons_url=lessons_url,
                )

                return semesterAPI

        raise HTTPException(status_code=404, detail=f"Semester {sid} not found")

    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="No right to access",
    )


@router.put("/{uid}/semesters/{sid}", response_description="Update a semester")
async def update_semester(
    uid: str,
    sid: str,
    request: Request,
    semester: UpdateSemesterModel = Body(...),
    token: str = Depends(models.oauth2_scheme),
):
    semester = {k: v for k, v in semester.dict().items() if v is not None}

    if (
        auth_user := await models.get_current_user(request, token)
    ) is not None and auth_user["_id"] == uid:
        if len(semester) >= 1:
            update_result = await request.app.mongodb["users"].update_many(
                {"_id": uid, "semesters._id": sid},
                {
                    "$set": {
                        "semesters.$.name": semester["name"],
                        "semesters.$.startDate": semester["startDate"],
                        "semesters.$.endDate": semester["endDate"],
                        "semesters.$.startHour": semester["startHour"],
                        "semesters.$.dLesson": semester["dLesson"],
                        "semesters.$.dBreak": semester["dBreak"],
                        "semesters.$.slotCount": semester["slotCount"],
                    }
                },
            )

            if (
                updated_user := await request.app.mongodb["users"].find_one(
                    {"_id": uid, "semesters._id": sid}
                )
            ) is not None:
                for semester in updated_user["semesters"]:
                    if semester["_id"] == sid:
                        sid = semester["_id"]
                        lessons_url = (
                            f"api.kucukdev.org/users/{uid}/semesters/{sid}/lessons"
                        )
                        semesterAPI = SemesterAPIModel(
                            id=semester["_id"],
                            name=semester["name"],
                            startDate=semester["startDate"],
                            endDate=semester["endDate"],
                            startHour=semester["startHour"],
                            dLesson=semester["dLesson"],
                            dBreak=semester["dBreak"],
                            slotCount=semester["slotCount"],
                            lessons_url=lessons_url,
                        )

                        return semesterAPI

        if (
            existing_user := await request.app.mongodb["users"].find_one(
                {"_id": uid, "semesters._id": sid}
            )
        ) is not None:
            for semester in existing_user["semesters"]:
                if semester["_id"] == sid:
                    sid = semester["_id"]
                    lessons_url = (
                        f"api.kucukdev.org/users/{uid}/semesters/{sid}/lessons"
                    )
                    semesterAPI = SemesterAPIModel(
                        id=semester["_id"],
                        name=semester["name"],
                        startDate=semester["startDate"],
                        endDate=semester["endDate"],
                        startHour=semester["startHour"],
                        dLesson=semester["dLesson"],
                        dBreak=semester["dBreak"],
                        slotCount=semester["slotCount"],
                        lessons_url=lessons_url,
                    )

                    return semesterAPI

        raise HTTPException(status_code=404, detail=f"Semester {sid} not found")

    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="No right to access",
    )


@router.delete("/{uid}/semesters/{sid}", response_description="Delete semester")
async def delete_semester(
    uid: str, sid: str, request: Request, token: str = Depends(models.oauth2_scheme)
):

    if (
        auth_user := await models.get_current_user(request, token)
    ) is not None and auth_user["_id"] == uid:
        find_user = await request.app.mongodb["users"].find_one(
            {"_id": uid, "semesters._id": sid}
        )

        update_result = await request.app.mongodb["users"].update_one(
            {"_id": uid}, {"$pull": {"semesters": {"_id": sid}}}
        )

        if update_result.modified_count == 1:
            for semester in find_user["semesters"]:
                if semester["_id"] == sid:
                    sid = semester["_id"]
                    lessons_url = (
                        f"api.kucukdev.org/users/{uid}/semesters/{sid}/lessons"
                    )
                    semesterAPI = SemesterAPIModel(
                        id=semester["_id"],
                        name=semester["name"],
                        startDate=semester["startDate"],
                        endDate=semester["endDate"],
                        startHour=semester["startHour"],
                        dLesson=semester["dLesson"],
                        dBreak=semester["dBreak"],
                        slotCount=semester["slotCount"],
                        lessons_url=lessons_url,
                    )
                    jsonable_semesterAPI = jsonable_encoder(semesterAPI)

            return JSONResponse(status_code=status.HTTP_200_OK, content=jsonable_semesterAPI)

        raise HTTPException(status_code=404, detail=f"Semester {sid} not found")

    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="No right to access",
    )