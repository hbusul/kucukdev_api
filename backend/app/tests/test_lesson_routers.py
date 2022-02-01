from app.main import app, settings
from app.tests.create_requirements import create_semester, create_user_and_login
from fastapi.testclient import TestClient
from motor.motor_asyncio import AsyncIOMotorClient

app.mongodb_client = AsyncIOMotorClient(settings.DB_URL)
app.mongodb = app.mongodb_client[settings.DB_NAME]

client = TestClient(app)


class TestUser:
    user_id = None
    token = None
    semester_id = None
    lesson_id = None


test_user = TestUser()

test_user.user_id, test_user.token = create_user_and_login(
    client, "lesson_routers@test.com", "test"
)
test_user.semester_id = create_semester(client, test_user.user_id, test_user.token)


def test_create_lesson():
    """Test creating lesson"""

    lesson = client.post(
        f"/users/{test_user.user_id}/semesters/{test_user.semester_id}/lessons",
        headers={"Authorization": f"Bearer {test_user.token}"},
        json={
            "name": "Test Lesson",
            "instructor": "Test Instructor",
            "absenceLimit": 0,
            "slots": ["2,7,0", "2,8,0"],
        },
    )

    assert lesson.status_code == 201
    assert lesson.json()["message"] == "Lesson created"
    test_user.lesson_id = lesson.json()["_id"]


def test_get_lesson():
    """Test getting lesson"""

    lesson = client.get(
        f"/users/{test_user.user_id}/semesters/{test_user.semester_id}/lessons/{test_user.lesson_id}",
        headers={"Authorization": f"Bearer {test_user.token}"},
    )

    assert lesson.status_code == 200
    assert lesson.json() == {
        "_id": test_user.lesson_id,
        "name": "Test Lesson",
        "instructor": "Test Instructor",
        "absenceLimit": 0,
        "slots": ["2,7,0", "2,8,0"],
        "absences": [],
    }


def test_update_lesson():
    """Test updating lesson"""

    lesson = client.put(
        f"/users/{test_user.user_id}/semesters/{test_user.semester_id}/lessons/{test_user.lesson_id}",
        headers={"Authorization": f"Bearer {test_user.token}"},
        json={
            "name": "Test Lesson 2",
            "instructor": "Test Instructor 2",
            "absenceLimit": 0,
            "slots": ["2,7,0", "2,8,0"],
        },
    )

    assert lesson.status_code == 200
    assert lesson.json()["message"] == "Lesson updated"


def test_list_lessons():
    """Test listing lessons"""

    lessons = client.get(
        f"/users/{test_user.user_id}/semesters/{test_user.semester_id}/lessons",
        headers={"Authorization": f"Bearer {test_user.token}"},
    )

    assert lessons.status_code == 200
    # lesson.json() only includes our last lesson that created and updated
    assert lessons.json() == [
        {
            "_id": test_user.lesson_id,
            "name": "Test Lesson 2",
            "instructor": "Test Instructor 2",
            "absenceLimit": 0,
            "slots": ["2,7,0", "2,8,0"],
            "absences": [],
        }
    ]


def test_create_absence():
    """Test creating absence"""

    absence = client.post(
        f"/users/{test_user.user_id}/semesters/{test_user.semester_id}/lessons/{test_user.lesson_id}/absences",
        headers={"Authorization": f"Bearer {test_user.token}"},
        json={"absence": "2,7,0"},
    )

    assert absence.status_code == 201
    assert absence.json()["message"] == "Absence created"


def test_create_same_absence():
    """Test creating same absence"""

    absence = client.post(
        f"/users/{test_user.user_id}/semesters/{test_user.semester_id}/lessons/{test_user.lesson_id}/absences",
        headers={"Authorization": f"Bearer {test_user.token}"},
        json={"absence": "2,7,0"},
    )

    assert absence.status_code == 400
    assert absence.json()["message"] == "Absence already exists"


def test_delete_absence():
    """Test deleting absence"""

    absence = client.delete(
        f"/users/{test_user.user_id}/semesters/{test_user.semester_id}/lessons/{test_user.lesson_id}/absences",
        headers={"Authorization": f"Bearer {test_user.token}"},
        json={"absence": "2,7,0"},
    )

    assert absence.status_code == 200
    assert absence.json()["message"] == "Absence deleted"


def test_delete_same_absence():
    """Test deleting same absence"""

    absence = client.delete(
        f"/users/{test_user.user_id}/semesters/{test_user.semester_id}/lessons/{test_user.lesson_id}/absences",
        headers={"Authorization": f"Bearer {test_user.token}"},
        json={"absence": "2,7,0"},
    )

    assert absence.status_code == 400
    assert absence.json()["message"] == "Absence does not exist"


def test_delete_lesson():
    """Test deleting lesson"""

    lesson = client.delete(
        f"/users/{test_user.user_id}/semesters/{test_user.semester_id}/lessons/{test_user.lesson_id}",
        headers={"Authorization": f"Bearer {test_user.token}"},
    )

    assert lesson.status_code == 200
    assert lesson.json()["message"] == "Lesson deleted"
