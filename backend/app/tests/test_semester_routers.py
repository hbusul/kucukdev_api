from app.main import app, settings
from app.tests.create_requirements import create_user_and_login
from fastapi.testclient import TestClient
from motor.motor_asyncio import AsyncIOMotorClient

app.mongodb_client = AsyncIOMotorClient(settings.DB_URL)
app.mongodb = app.mongodb_client[settings.DB_NAME]

client = TestClient(app)


class TestUser:
    user_id = None
    token = None
    semester_id = None


test_user = TestUser()

test_user.user_id, test_user.token = create_user_and_login(
    client, "semester_routers@test.com", "test"
)


def test_create_semester():
    """Test creating semester"""

    semester = client.post(
        f"/users/{test_user.user_id}/semesters",
        headers={"Authorization": f"Bearer {test_user.token}"},
        json={
            "name": "Test Semester",
            "startDate": "2022-02-18T00:00:00Z",
            "endDate": "2022-06-18T00:00:00Z",
            "startHour": "8.20",
            "dLesson": 40,
            "dBreak": 20,
            "slotCount": 12,
        },
    )

    assert semester.status_code == 201
    assert semester.json()["message"] == "Semester created"

    test_user.semester_id = semester.json()["_id"]


def test_get_semester():
    """Test getting semester"""

    semester = client.get(
        f"/users/{test_user.user_id}/semesters/{test_user.semester_id}",
        headers={"Authorization": f"Bearer {test_user.token}"},
    )

    assert semester.status_code == 200
    assert semester.json() == {
        "_id": test_user.semester_id,
        "name": "Test Semester",
        "startDate": "2022-02-18T00:00:00+00:00",
        "endDate": "2022-06-18T00:00:00+00:00",
        "startHour": "8.20",
        "dLesson": 40,
        "dBreak": 20,
        "slotCount": 12,
    }
