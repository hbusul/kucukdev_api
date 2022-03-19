from fastapi import APIRouter, Body, Depends, Request, status
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

from ...dependencies import get_current_user
from ...models.user_models import (
    AbsenceModel,
    Message,
    MessageCreate,
    SlotModel,
    UpdateSlotModel,
    UserModel,
)

router = APIRouter()


@router.post(
    "/{uid}/semesters/{sid}/lessons/{lid}/slots",
    response_description="Add new slot into a lesson",
    operation_id="createSlot",
    response_model=MessageCreate,
    responses={
        201: {"model": MessageCreate},
        401: {"model": Message},
        403: {"model": Message},
        404: {"model": Message},
        409: {"model": Message},
    },
)
async def create_slot(
    uid: str,
    sid: str,
    lid: str,
    request: Request,
    slot: SlotModel = Body(...),
    auth_user: UserModel = Depends(get_current_user),
):
    """Create a slot for a lesson"""

    if auth_user["_id"] == uid:

        slot = jsonable_encoder(slot)

        if (
            await (
                request.app.mongodb["users"].find(
                    {
                        "_id": uid,
                        "semesters._id": sid,
                        "semesters.lessons._id": lid,
                        "semesters.lessons.slots": {
                            "$elemMatch": {"day": slot["day"], "hour": slot["hour"]}
                        },
                    }
                )
            ).to_list(length=None)
        ) != []:
            return JSONResponse(
                status_code=status.HTTP_409_CONFLICT,
                content={"message": "Given slot already exists"},
            )

        update_result = await request.app.mongodb["users"].update_one(
            {"_id": uid, "semesters._id": sid, "semesters.lessons._id": lid,},
            {
                "$push": {
                    "semesters.$[i].lessons.$[j].slots": {
                        "$each": [slot],
                        "$sort": {"day": 1, "hour": 1},
                    }
                }
            },
            array_filters=[{"i._id": sid}, {"j._id": lid},],
        )

        if update_result.modified_count == 1:
            return JSONResponse(
                status_code=status.HTTP_201_CREATED,
                content=jsonable_encoder(
                    MessageCreate(id=slot["_id"], message="Slot created")
                ),
            )

        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "Slot could not be created"},
        )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )


@router.put(
    "/{uid}/semesters/{sid}/lessons/{lid}/slots/{slid}",
    response_description="Update a slot",
    operation_id="updateSlot",
    response_model=Message,
    responses={
        401: {"model": Message},
        403: {"model": Message},
        404: {"model": Message},
        409: {"model": Message},
    },
)
async def update_slot(
    uid: str,
    sid: str,
    lid: str,
    slid: str,
    request: Request,
    slot: UpdateSlotModel = Body(...),
    auth_user: UserModel = Depends(get_current_user),
):
    """Update a slot of a lesson"""

    if auth_user["_id"] == uid:
        slot = jsonable_encoder(slot)

        if (
            await (
                request.app.mongodb["users"]
                .find(
                    {
                        "_id": uid,
                        "semesters._id": sid,
                        "semesters.lessons._id": lid,
                        "semesters.lessons.slots": {
                            "$elemMatch": {
                                "_id": slid,
                                "day": slot["day"],
                                "hour": slot["hour"],
                            }
                        },
                    }
                )
                .to_list(length=None)
            )
            == []
            and (
                await request.app.mongodb["users"]
                .find(
                    {
                        "_id": uid,
                        "semesters._id": sid,
                        "semesters.lessons._id": lid,
                        "semesters.lessons.slots": {
                            "$elemMatch": {"day": slot["day"], "hour": slot["hour"]}
                        },
                    }
                )
                .to_list(length=None)
            )
            != []
        ):
            return JSONResponse(
                status_code=status.HTTP_409_CONFLICT,
                content={"message": "Given slot already exists or slot not found"},
            )

        updated_features = {}
        for key in slot:
            if slot[key] is not None:
                updated_features.update(
                    {f"semesters.$[i].lessons.$[j].slots.$[k].{key}": slot[key]}
                )

        update_result = await request.app.mongodb["users"].update_one(
            {
                "_id": uid,
                "semesters._id": sid,
                "semesters.lessons._id": lid,
                "semesters.lessons.slots._id": slid,
            },
            {"$set": updated_features},
            array_filters=[{"i._id": sid}, {"j._id": lid}, {"k._id": slid},],
        )

        if update_result.modified_count == 1:
            await request.app.mongodb["users"].update_one(
                {"_id": uid, "semesters._id": sid, "semesters.lessons._id": lid,},
                {
                    "$push": {
                        "semesters.$[i].lessons.$[j].slots": {
                            "$each": [],
                            "$sort": {"day": 1, "hour": 1},
                        },
                    },
                },
                array_filters=[{"i._id": sid}, {"j._id": lid}],
            )
            return JSONResponse(
                status_code=status.HTTP_200_OK, content={"message": "Slot updated"},
            )

        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "Slot could not be updated"},
        )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )


@router.delete(
    "/{uid}/semesters/{sid}/lessons/{lid}/slots/{slid}",
    response_description="Delete a slot",
    operation_id="deleteSlot",
    response_model=Message,
    responses={
        401: {"model": Message},
        403: {"model": Message},
        404: {"model": Message},
    },
)
async def delete_slot(
    uid: str,
    sid: str,
    lid: str,
    slid: str,
    request: Request,
    auth_user: UserModel = Depends(get_current_user),
):
    """Delete a slot of a lesson"""

    if auth_user["_id"] == uid:
        update_result = await request.app.mongodb["users"].update_one(
            {"_id": uid, "semesters._id": sid, "semesters.lessons._id": lid,},
            {"$pull": {"semesters.$[i].lessons.$[j].slots": {"_id": slid}}},
            array_filters=[{"i._id": sid}, {"j._id": lid}],
        )

        if update_result.modified_count == 1:
            return JSONResponse(
                status_code=status.HTTP_200_OK, content={"message": "Slot deleted"},
            )

        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "Slot not found"},
        )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )


@router.post(
    "/{uid}/semesters/{sid}/lessons/{lid}/absences/{slid}",
    response_description="Add absence into a slot",
    operation_id="createAbsence",
    response_model=Message,
    responses={
        201: {"model": Message},
        400: {"model": Message},
        401: {"model": Message},
        403: {"model": Message},
        404: {"model": Message},
    },
)
async def create_absence(
    uid: str,
    sid: str,
    lid: str,
    slid: str,
    request: Request,
    absence: AbsenceModel = Body(...),
    auth_user: UserModel = Depends(get_current_user),
):
    """Create an absence for a slot"""

    if auth_user["_id"] == uid:
        absence = jsonable_encoder(absence)

        if (
            await request.app.mongodb["users"].find_one(
                {
                    "_id": uid,
                    "semesters._id": sid,
                    "semesters.lessons._id": lid,
                    "semesters.lessons.slots": {
                        "$elemMatch": {"_id": slid, "absences": absence["week"],}
                    },
                }
            )
        ) is not None:
            return JSONResponse(
                status_code=status.HTTP_400_BAD_REQUEST,
                content={"message": "Absence already exists"},
            )

        update_result = await request.app.mongodb["users"].update_one(
            {"_id": uid, "semesters._id": sid, "semesters.lessons._id": lid,},
            {
                "$push": {
                    "semesters.$[i].lessons.$[j].slots.$[k].absences": {
                        "$each": [absence["week"]],
                        "$sort": 1,
                    },
                },
            },
            array_filters=[{"i._id": sid}, {"j._id": lid}, {"k._id": slid}],
        )

        if update_result.modified_count == 1:
            return JSONResponse(
                status_code=status.HTTP_201_CREATED,
                content={"message": "Absence created"},
            )

        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "Absence could not be created"},
        )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )


@router.delete(
    "/{uid}/semesters/{sid}/lessons/{lid}/absences/{slid}",
    response_description="Delete absence into a slot",
    operation_id="deleteAbsence",
    response_model=Message,
    responses={
        404: {"model": Message},
        403: {"model": Message},
        401: {"model": Message},
        400: {"model": Message},
    },
)
async def delete_absence(
    uid: str,
    sid: str,
    lid: str,
    slid: str,
    request: Request,
    absence: AbsenceModel = Body(...),
    auth_user: UserModel = Depends(get_current_user),
):
    """Delete an absence from a slot"""

    if auth_user["_id"] == uid:
        absence = jsonable_encoder(absence)

        update_result = await request.app.mongodb["users"].update_one(
            {"_id": uid, "semesters._id": sid, "semesters.lessons._id": lid,},
            {
                "$pull": {
                    "semesters.$[i].lessons.$[j].slots.$[k].absences": absence["week"]
                }
            },
            array_filters=[{"i._id": sid}, {"j._id": lid}, {"k._id": slid}],
        )

        if update_result.modified_count == 1:
            return JSONResponse(
                status_code=status.HTTP_200_OK, content={"message": "Absence deleted"},
            )

        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "Absence not found"},
        )

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN, content={"message": "No right to access"}
    )
