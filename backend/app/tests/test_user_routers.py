from app.main import app, settings
from fastapi.testclient import TestClient
from motor.motor_asyncio import AsyncIOMotorClient

app.mongodb_client = AsyncIOMotorClient(settings.DB_URL)
app.mongodb = app.mongodb_client[settings.DB_NAME]

client = TestClient(app)


def test_create_user():
    """Test creating user and recreating with same email"""

    user = client.post("/users", json={"email": "hey@agu.edu.tr", "password": "123456"})
    assert user.status_code == 201
    assert user.json()["message"] == "User created"

    user = client.post("/users", json={"email": "hey@agu.edu.tr", "password": "123456"})
    assert user.status_code == 409
    assert user.json()["message"] == "Given email already exists"
