from fastapi import FastAPI, HTTPException, status, Response, Depends, Request
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
import uvicorn
from motor.motor_asyncio import AsyncIOMotorClient
from config import settings
from datetime import datetime, timedelta
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from apps.task import models

from apps.task.user_routers import router as user_router
from apps.task.semester_routers import router as semester_router
from apps.task.lesson_routers import router as lesson_router

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


@app.on_event("shutdown")
async def shutdown_db_client():
    app.mongodb_client.close()


@app.post(
    "/token",
    response_description="Get token",
    response_model=models.Token,
    responses={401: {"model": models.Message}},
)
async def login_for_access_token(
    request: Request, form_data: OAuth2PasswordRequestForm = Depends()
):
    user = await models.authenticate_user(
        request, form_data.username, form_data.password
    )
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=models.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = models.create_access_token(
        data={"sub": user["email"]}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


app.include_router(user_router, tags=["users"], prefix="/users")
app.include_router(semester_router, tags=["semesters"], prefix="/users")
app.include_router(lesson_router, tags=["lessons"], prefix="/users")

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        reload=settings.DEBUG_MODE,
        port=settings.PORT,
    )