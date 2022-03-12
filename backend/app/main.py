import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient

from .dependencies import (
    create_admin_user,
    settings,
    control_secret_key,
    router as token_router,
)
from .routers.university_routers.schedule_routers import router as schedule_router
from .routers.university_routers.uni_cur_lesson_routers import (
    router as uni_cur_lesson_router,
)
from .routers.university_routers.uni_cur_semester_routers import (
    router as uni_cur_semester_router,
)
from .routers.university_routers.uni_curriculum_routers import (
    router as uni_curriculum_router,
)
from .routers.university_routers.uni_department_routers import (
    router as uni_department_router,
)
from .routers.university_routers.uni_lesson_routers import router as uni_lesson_router
from .routers.university_routers.uni_routers import router as uni_router
from .routers.university_routers.uni_section_routers import router as uni_section_router
from .routers.university_routers.uni_semester_routers import (
    router as uni_semester_router,
)
from .routers.user_routers.lesson_routers import router as lesson_router
from .routers.user_routers.semester_routers import router as semester_router
from .routers.user_routers.user_routers import router as user_router

app = FastAPI()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_db_client():
    app.mongodb_client = AsyncIOMotorClient(settings.DB_URL)
    app.mongodb = app.mongodb_client[settings.DB_NAME]
    if settings.ADMIN_USERNAME is not None and settings.ADMIN_PASSWORD is not None:
        await create_admin_user(request=app.mongodb)
    if settings.AUTH_SECRET_KEY is None:
        await control_secret_key(request=app.mongodb)


@app.on_event("shutdown")
async def shutdown_db_client():
    app.mongodb_client.close()

if settings.AUTH_API_MANAGE_USERS:
    # API can choose to accept login/signup requests
    app.include_router(token_router, tags=["token"], prefix="/token")

app.include_router(user_router, tags=["users"], prefix="/users")
app.include_router(semester_router, tags=["semesters"], prefix="/users")
app.include_router(lesson_router, tags=["lessons"], prefix="/users")
app.include_router(uni_router, tags=["universities"], prefix="/universities")
app.include_router(
    uni_semester_router, tags=["university semesters"], prefix="/universities"
)
app.include_router(
    uni_lesson_router, tags=["university lessons"], prefix="/universities"
)
app.include_router(
    uni_section_router, tags=["university sections"], prefix="/universities"
)
app.include_router(uni_department_router, tags=["departments"], prefix="/universities")
app.include_router(uni_curriculum_router, tags=["curriculums"], prefix="/universities")
app.include_router(
    uni_cur_semester_router, tags=["curriculum semesters"], prefix="/universities"
)
app.include_router(
    uni_cur_lesson_router, tags=["curriculum lessons"], prefix="/universities"
)
app.include_router(schedule_router, tags=["scheduler"], prefix="/universities")


if __name__ == "__main__":
    uvicorn.run(
        "main:app", host=settings.HOST, reload=settings.DEBUG_MODE, port=settings.PORT,
    )
