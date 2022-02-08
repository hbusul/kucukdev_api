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
            "slots": [
                {"day": 2, "hour": 7, "isLab": 0},
                {"day": 2, "hour": 8, "isLab": 0},
            ],
        },
    )

    assert lesson.status_code == 201
    assert lesson.json()["message"] == "Lesson created"
    test_user.lesson_id = lesson.json()["_id"]


def test_create_lesson_with_another_user_id():
    """Test creating lesson with a user id other than auth user"""

    user_id = "non_exists_user_id"
    lesson = client.post(
        f"/users/{user_id}/semesters/{test_user.semester_id}/lessons",
        headers={"Authorization": f"Bearer {test_user.token}"},
        json={
            "name": "Test Lesson",
            "instructor": "Test Instructor",
            "absenceLimit": 0,
            "slots": [
                {"day": 2, "hour": 7, "isLab": 0},
                {"day": 2, "hour": 8, "isLab": 0},
            ],
        },
    )

    assert lesson.status_code == 403
    assert lesson.json()["message"] == "No right to access"


def test_create_lesson_with_invalid_semester_id():
    """Test creating lesson with an invalid semester id"""

    semester_id = "non_exists_semester_id"
    lesson = client.post(
        f"/users/{test_user.user_id}/semesters/{semester_id}/lessons",
        headers={"Authorization": f"Bearer {test_user.token}"},
        json={
            "name": "Test Lesson",
            "instructor": "Test Instructor",
            "absenceLimit": 0,
            "slots": [
                {"day": 2, "hour": 7, "isLab": 0},
                {"day": 2, "hour": 8, "isLab": 0},
            ],
        },
    )

    assert lesson.status_code == 404
    assert lesson.json()["message"] == "Lesson could not be created"


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
        "slots": [[2, 7, 0], [2, 8, 0]],
        "absences": [],
    }


def test_get_lesson_with_another_user_id():
    """Test getting lesson with a user id other than auth user"""

    user_id = "non_exists_user_id"
    lesson = client.get(
        f"/users/{user_id}/semesters/{test_user.semester_id}/lessons/{test_user.lesson_id}",
        headers={"Authorization": f"Bearer {test_user.token}"},
    )

    assert lesson.status_code == 403
    assert lesson.json()["message"] == "No right to access"


def test_get_lesson_with_invalid_semester_id():
    """Test getting lesson with an invalid semester id"""

    semester_id = "non_exists_semester_id"
    lesson = client.get(
        f"/users/{test_user.user_id}/semesters/{semester_id}/lessons/{test_user.lesson_id}",
        headers={"Authorization": f"Bearer {test_user.token}"},
    )

    assert lesson.status_code == 404
    assert lesson.json()["message"] == "Lesson not found"


def test_get_lesson_with_invalid_lesson_id():
    """Test getting lesson with an invalid lesson id"""

    lesson_id = "non_exists_lesson_id"
    lesson = client.get(
        f"/users/{test_user.user_id}/semesters/{test_user.semester_id}/lessons/{lesson_id}",
        headers={"Authorization": f"Bearer {test_user.token}"},
    )

    assert lesson.status_code == 404
    assert lesson.json()["message"] == "Lesson not found"


def test_update_lesson():
    """Test updating lesson"""

    lesson = client.put(
        f"/users/{test_user.user_id}/semesters/{test_user.semester_id}/lessons/{test_user.lesson_id}",
        headers={"Authorization": f"Bearer {test_user.token}"},
        json={
            "name": "Test Lesson 2",
            "instructor": "Test Instructor 2",
            "absenceLimit": 0,
            "slots": [
                {"day": 3, "hour": 5, "isLab": 0},
                {"day": 3, "hour": 6, "isLab": 1},
            ],
        },
    )

    assert lesson.status_code == 200
    assert lesson.json()["message"] == "Lesson updated"


def test_update_lesson_with_another_user_id():
    """Test updating lesson with a user id other than auth user"""

    user_id = "non_exists_user_id"
    lesson = client.put(
        f"/users/{user_id}/semesters/{test_user.semester_id}/lessons/{test_user.lesson_id}",
        headers={"Authorization": f"Bearer {test_user.token}"},
        json={
            "name": "Test Lesson 2",
            "instructor": "Test Instructor 2",
            "absenceLimit": 0,
            "slots": [
                {"day": 3, "hour": 5, "isLab": 0},
                {"day": 3, "hour": 6, "isLab": 1},
            ],
        },
    )

    assert lesson.status_code == 403
    assert lesson.json()["message"] == "No right to access"


def test_update_lesson_with_invalid_semester_id():
    """Test updating lesson with an invalid semester id"""

    semester_id = "non_exists_semester_id"
    lesson = client.put(
        f"/users/{test_user.user_id}/semesters/{semester_id}/lessons/{test_user.lesson_id}",
        headers={"Authorization": f"Bearer {test_user.token}"},
        json={
            "name": "Test Lesson 2",
            "instructor": "Test Instructor 2",
            "absenceLimit": 0,
            "slots": [
                {"day": 3, "hour": 5, "isLab": 0},
                {"day": 3, "hour": 6, "isLab": 1},
            ],
        },
    )

    assert lesson.status_code == 404
    assert lesson.json()["message"] == "Lesson not found"


def test_update_lesson_with_invalid_lesson_id():
    """Test updating lesson with an invalid lesson id"""

    lesson_id = "non_exists_lesson_id"
    lesson = client.put(
        f"/users/{test_user.user_id}/semesters/{test_user.semester_id}/lessons/{lesson_id}",
        headers={"Authorization": f"Bearer {test_user.token}"},
        json={
            "name": "Test Lesson 2",
            "instructor": "Test Instructor 2",
            "absenceLimit": 0,
            "slots": [
                {"day": 3, "hour": 5, "isLab": 0},
                {"day": 3, "hour": 6, "isLab": 1},
            ],
        },
    )

    assert lesson.status_code == 404
    assert lesson.json()["message"] == "Lesson not found"


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
            "slots": [[3, 5, 0], [3, 6, 1]],
            "absences": [],
        }
    ]


def test_list_lessons_with_another_user_id():
    """Test listing lessons with a user id other than auth user"""

    user_id = "non_exists_user_id"
    lessons = client.get(
        f"/users/{user_id}/semesters/{test_user.semester_id}/lessons",
        headers={"Authorization": f"Bearer {test_user.token}"},
    )

    assert lessons.status_code == 403
    assert lessons.json()["message"] == "No right to access"


def test_list_lessons_with_invalid_semester_id():
    """Test listing lessons with an invalid semester id"""

    semester_id = "non_exists_semester_id"
    lessons = client.get(
        f"/users/{test_user.user_id}/semesters/{semester_id}/lessons",
        headers={"Authorization": f"Bearer {test_user.token}"},
    )

    assert lessons.status_code == 404
    assert lessons.json()["message"] == "Semester not found"


def test_create_second_lesson():
    """Test creating second lesson"""

    lesson = client.post(
        f"/users/{test_user.user_id}/semesters/{test_user.semester_id}/lessons",
        headers={"Authorization": f"Bearer {test_user.token}"},
        json={
            "name": "Test Lesson 3",
            "instructor": "Test Instructor 3",
            "absenceLimit": 0,
            "slots": [
                {"day": 2, "hour": 7, "isLab": 0},
                {"day": 2, "hour": 8, "isLab": 0},
            ],
        },
    )

    assert lesson.status_code == 201
    assert lesson.json()["message"] == "Lesson created"


def test_list_lessons_with_two_lessons():
    """Test listing lessons with two lessons"""

    lessons = client.get(
        f"/users/{test_user.user_id}/semesters/{test_user.semester_id}/lessons",
        headers={"Authorization": f"Bearer {test_user.token}"},
    )

    assert lessons.status_code == 200
    assert lessons.json() == [
        {
            "_id": lessons.json()[0]["_id"],
            "name": "Test Lesson 2",
            "instructor": "Test Instructor 2",
            "absenceLimit": 0,
            "slots": [[3, 5, 0], [3, 6, 1]],
            "absences": [],
        },
        {
            "_id": lessons.json()[1]["_id"],
            "name": "Test Lesson 3",
            "instructor": "Test Instructor 3",
            "absenceLimit": 0,
            "slots": [[2, 7, 0], [2, 8, 0]],
            "absences": [],
        },
    ]


def test_create_absence():
    """Test creating absence"""

    absence = client.post(
        f"/users/{test_user.user_id}/semesters/{test_user.semester_id}/lessons/{test_user.lesson_id}/absences",
        headers={"Authorization": f"Bearer {test_user.token}"},
        json={"absence": {"week": 0, "day": 3, "hour": 5, "isLab": 0}},
    )

    assert absence.status_code == 201
    assert absence.json()["message"] == "Absence created"


def test_get_lesson_after_adding_absence():
    """Test getting lesson after adding absence"""

    lesson = client.get(
        f"/users/{test_user.user_id}/semesters/{test_user.semester_id}/lessons/{test_user.lesson_id}",
        headers={"Authorization": f"Bearer {test_user.token}"},
    )

    assert lesson.status_code == 200
    assert lesson.json() == {
        "_id": test_user.lesson_id,
        "name": "Test Lesson 2",
        "instructor": "Test Instructor 2",
        "absenceLimit": 0,
        "slots": [[3, 5, 0], [3, 6, 1]],
        "absences": [[0, 3, 5, 0]],
    }


def test_create_same_absence():
    """Test creating same absence"""

    absence = client.post(
        f"/users/{test_user.user_id}/semesters/{test_user.semester_id}/lessons/{test_user.lesson_id}/absences",
        headers={"Authorization": f"Bearer {test_user.token}"},
        json={"absence": {"week": 0, "day": 3, "hour": 5, "isLab": 0}},
    )

    assert absence.status_code == 400
    assert absence.json()["message"] == "Absence already exists"


def test_create_absence_with_another_user_id():
    """Test creating absence with a user id other than auth user"""

    user_id = "non_exists_user_id"
    absence = client.post(
        f"/users/{user_id}/semesters/{test_user.semester_id}/lessons/{test_user.lesson_id}/absences",
        headers={"Authorization": f"Bearer {test_user.token}"},
        json={"absence": {"week": 0, "day": 3, "hour": 5, "isLab": 0}},
    )

    assert absence.status_code == 403
    assert absence.json()["message"] == "No right to access"


def test_create_absence_with_invalid_semester_id():
    """Test creating absence with an invalid semester id"""

    semester_id = "non_exists_semester_id"
    absence = client.post(
        f"/users/{test_user.user_id}/semesters/{semester_id}/lessons/{test_user.lesson_id}/absences",
        headers={"Authorization": f"Bearer {test_user.token}"},
        json={"absence": {"week": 0, "day": 3, "hour": 5, "isLab": 0}},
    )

    assert absence.status_code == 404
    assert absence.json()["message"] == "Absence could not be created"


def test_create_absence_with_invalid_lesson_id():
    """Test creating absence with an invalid lesson id"""

    lesson_id = "non_exists_lesson_id"
    absence = client.post(
        f"/users/{test_user.user_id}/semesters/{test_user.semester_id}/lessons/{lesson_id}/absences",
        headers={"Authorization": f"Bearer {test_user.token}"},
        json={"absence": {"week": 0, "day": 3, "hour": 5, "isLab": 0}},
    )

    assert absence.status_code == 404
    assert absence.json()["message"] == "Absence could not be created"


def test_delete_absence():
    """Test deleting absence"""

    absence = client.delete(
        f"/users/{test_user.user_id}/semesters/{test_user.semester_id}/lessons/{test_user.lesson_id}/absences",
        headers={"Authorization": f"Bearer {test_user.token}"},
        json={"absence": {"week": 0, "day": 3, "hour": 5, "isLab": 0}},
    )

    assert absence.status_code == 200
    assert absence.json()["message"] == "Absence deleted"


def test_get_lesson_after_deleting_absence():
    """Test getting lesson after deleting absence"""

    lesson = client.get(
        f"/users/{test_user.user_id}/semesters/{test_user.semester_id}/lessons/{test_user.lesson_id}",
        headers={"Authorization": f"Bearer {test_user.token}"},
    )

    assert lesson.status_code == 200
    assert lesson.json() == {
        "_id": test_user.lesson_id,
        "name": "Test Lesson 2",
        "instructor": "Test Instructor 2",
        "absenceLimit": 0,
        "slots": [[3, 5, 0], [3, 6, 1]],
        "absences": [],
    }


def test_delete_same_absence():
    """Test deleting same absence"""

    absence = client.delete(
        f"/users/{test_user.user_id}/semesters/{test_user.semester_id}/lessons/{test_user.lesson_id}/absences",
        headers={"Authorization": f"Bearer {test_user.token}"},
        json={"absence": {"week": 0, "day": 3, "hour": 5, "isLab": 0}},
    )

    assert absence.status_code == 404
    assert absence.json()["message"] == "Absence not found"


def test_delete_absence_with_another_user_id():
    """Test deleting absence with a user id other than auth user"""

    user_id = "non_exists_user_id"
    absence = client.delete(
        f"/users/{user_id}/semesters/{test_user.semester_id}/lessons/{test_user.lesson_id}/absences",
        headers={"Authorization": f"Bearer {test_user.token}"},
        json={"absence": {"week": 0, "day": 3, "hour": 5, "isLab": 0}},
    )

    assert absence.status_code == 403
    assert absence.json()["message"] == "No right to access"


def test_delete_absence_with_invalid_semester_id():
    """Test deleting absence with an invalid semester id"""

    semester_id = "non_exists_semester_id"
    absence = client.delete(
        f"/users/{test_user.user_id}/semesters/{semester_id}/lessons/{test_user.lesson_id}/absences",
        headers={"Authorization": f"Bearer {test_user.token}"},
        json={"absence": {"week": 0, "day": 3, "hour": 5, "isLab": 0}},
    )

    assert absence.status_code == 404
    assert absence.json()["message"] == "Absence not found"


def test_delete_absence_with_invalid_lesson_id():
    """Test deleting absence with an invalid lesson id"""

    lesson_id = "non_exists_lesson_id"
    absence = client.delete(
        f"/users/{test_user.user_id}/semesters/{test_user.semester_id}/lessons/{lesson_id}/absences",
        headers={"Authorization": f"Bearer {test_user.token}"},
        json={"absence": {"week": 0, "day": 3, "hour": 5, "isLab": 0}},
    )

    assert absence.status_code == 404
    assert absence.json()["message"] == "Absence not found"


def test_delete_lesson():
    """Test deleting lesson"""

    lesson = client.delete(
        f"/users/{test_user.user_id}/semesters/{test_user.semester_id}/lessons/{test_user.lesson_id}",
        headers={"Authorization": f"Bearer {test_user.token}"},
    )

    assert lesson.status_code == 200
    assert lesson.json()["message"] == "Lesson deleted"


def test_delete_same_lesson():
    """Test deleting same lesson"""

    lesson = client.delete(
        f"/users/{test_user.user_id}/semesters/{test_user.semester_id}/lessons/{test_user.lesson_id}",
        headers={"Authorization": f"Bearer {test_user.token}"},
    )

    assert lesson.status_code == 404
    assert lesson.json()["message"] == "Lesson not found"


def test_delete_lesson_with_another_user_id():
    """Test deleting lesson with a user id other than auth user"""

    user_id = "non_exists_user_id"
    lesson = client.delete(
        f"/users/{user_id}/semesters/{test_user.semester_id}/lessons/{test_user.lesson_id}",
        headers={"Authorization": f"Bearer {test_user.token}"},
    )

    assert lesson.status_code == 403
    assert lesson.json()["message"] == "No right to access"


def test_delete_lesson_with_invalid_semester_id():
    """Test deleting lesson with an invalid semester id"""

    semester_id = "non_exists_semester_id"
    lesson = client.delete(
        f"/users/{test_user.user_id}/semesters/{semester_id}/lessons/{test_user.lesson_id}",
        headers={"Authorization": f"Bearer {test_user.token}"},
    )

    assert lesson.status_code == 404
    assert lesson.json()["message"] == "Lesson not found"


def test_delete_lesson_with_invalid_lesson_id():
    """Test deleting lesson with an invalid lesson id"""

    lesson_id = "non_exists_lesson_id"
    lesson = client.delete(
        f"/users/{test_user.user_id}/semesters/{test_user.semester_id}/lessons/{lesson_id}",
        headers={"Authorization": f"Bearer {test_user.token}"},
    )

    assert lesson.status_code == 404
    assert lesson.json()["message"] == "Lesson not found"
