from fastapi import FastAPI
import uvicorn
from motor.motor_asyncio import AsyncIOMotorClient
from config import settings

from apps.task.user_routers import router as user_router
from apps.task.semester_routers import router as semester_router
from apps.task.lesson_routers import router as lesson_router

app = FastAPI()


@app.on_event("startup")
async def startup_db_client():
    app.mongodb_client = AsyncIOMotorClient(settings.DB_URL)
    app.mongodb = app.mongodb_client[settings.DB_NAME]


@app.on_event("shutdown")
async def shutdown_db_client():
    app.mongodb_client.close()


app.include_router(user_router, tags=["users"], prefix="/users")
app.include_router(semester_router, tags=["semesters"], prefix="/users")
# app.include_router(lesson_router, tags=["lessons"], prefix="/lessons")

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        reload=settings.DEBUG_MODE,
        port=settings.PORT,
    )