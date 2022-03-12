from typing import Optional
from pydantic import BaseSettings


class CommonSettings(BaseSettings):
    APP_NAME: str = "Kucukdev"
    DEBUG_MODE: bool = False


class ServerSettings(BaseSettings):
    HOST: str = "0.0.0.0"
    PORT: int = 8000


class DatabaseSettings(BaseSettings):
    DB_URL: str
    DB_NAME: str


class AdminSettings(BaseSettings):
    ADMIN_USERNAME: Optional[str]
    ADMIN_PASSWORD: Optional[str]

class AuthSettings(BaseSettings):
    AUTH_API_MANAGE_USERS: bool = False # determines if API accepts login or sign-up requests
    AUTH_JWT_ALGORITHM: str = "RS256"
    AUTH_JWK_URL: str = "http://auth_server:8080/realms/kucukdev/protocol/openid-connect/certs"
    AUTH_AUDIENCE: str = "account"
    AUTH_SECRET_KEY: Optional[str] = ""
    AUTH_ACCESS_TOKEN_EXPIRE_MINUTES: int = 30


class Settings(CommonSettings, ServerSettings, DatabaseSettings, AdminSettings, AuthSettings):
    pass

