from typing import Optional
from pydantic import BaseSettings


class CommonSettings(BaseSettings):
    APP_NAME: str = "Kucukdev"
    DEBUG_MODE: bool = False
    SECRET_KEY: Optional[str]


class ServerSettings(BaseSettings):
    HOST: str = "0.0.0.0"
    PORT: int = 8000


class DatabaseSettings(BaseSettings):
    DB_URL: str
    DB_NAME: str


class Settings(CommonSettings, ServerSettings, DatabaseSettings):
    pass


settings = Settings()
