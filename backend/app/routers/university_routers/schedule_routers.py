from fastapi import (
    APIRouter,
    Body,
    Request,
    status,
    Depends,
)
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from typing import List, Dict


from ...models.user_models import Message


from app.scheduler import schedule

router = APIRouter()


@router.post(
    "/{unid}/schedule",
    response_description="Create schedules for given lessons",
    operation_id="createSchedule",
    response_model=List[Dict[str, int]],
    responses={
        404: {"model": Message},
    },
)
async def create_schedule(unid: str, lesson_codes: List[str], request: Request):
    """Create schedules for given lessons"""

    university = await request.app.mongodb["universities"].find_one({"_id": unid})
    if not university:
        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "University not found"},
        )

    current_semester_id = university["curSemesterID"]
    if not current_semester_id:
        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "University does not have current semester set"},
        )

    current_semester = [
        x for x in university["semesters"] if x["_id"] == current_semester_id
    ][0]

    selected_lessons = [
        x for x in current_semester["lessons"] if x["code"] in lesson_codes
    ]

    selected_lesson_simple = {
        i: {
            j: [[int(z) for z in k.split(",")[:2]] for k in y["slots"]]
            for j, y in enumerate(x["sections"])
        }
        for i, x in enumerate(selected_lessons)
    }

    print(selected_lessons)
    print(selected_lesson_simple)

    schedules = schedule(selected_lesson_simple)
    print(schedules)

    meaningful_schedules = [
        {selected_lessons[k]["code"]: schedule[k] for k in schedule}
        for schedule in schedules
    ]

    return meaningful_schedules
