from fastapi.testclient import TestClient
from motor.motor_asyncio import AsyncIOMotorClient

from app.main import app, settings

app.mongodb_client = AsyncIOMotorClient(settings.DB_URL)
app.mongodb = app.mongodb_client[settings.DB_NAME]

client = TestClient(app)


def test_create_user():
    """Creating user and recreating with same email"""
    response = client.post(
        "/users", json={"email": "hey@agu.edu.tr", "password": "123456"}
    )
    assert response.status_code == 200
    # assert response.json() == data # data will be the expected json format output

    response = client.post(
        "/users", json={"email": "hey@agu.edu.tr", "password": "123456"}
    )
    assert response.status_code == 409
    # assert response.json() == data # data will be the expected json format output
