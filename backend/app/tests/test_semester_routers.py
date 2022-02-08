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
    second_semester_id = None


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


def test_create_semester_with_another_user_id():
    """ "Test creating semester with a user id other than auth user"""

    user_id = "non_existent_user_id"
    semester = client.post(
        f"/users/{user_id}/semesters",
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

    assert semester.status_code == 403
    assert semester.json()["message"] == "No right to access"


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


def test_get_semester_with_another_user_id():
    """ "Test getting semester with a user id other than auth user"""

    user_id = "non_existent_user_id"
    semester = client.get(
        f"/users/{user_id}/semesters/{test_user.semester_id}",
        headers={"Authorization": f"Bearer {test_user.token}"},
    )

    assert semester.status_code == 403
    assert semester.json()["message"] == "No right to access"


def test_get_semester_with_invalid_semester_id():
    """ "Test getting semester with an invalid semester id"""

    semester_id = "non_existent_semester_id"
    semester = client.get(
        f"/users/{test_user.user_id}/semesters/{semester_id}",
        headers={"Authorization": f"Bearer {test_user.token}"},
    )

    assert semester.status_code == 404
    assert semester.json()["message"] == "Semester not found"


def test_update_semester():
    """Test updating semester"""

    semester = client.put(
        f"/users/{test_user.user_id}/semesters/{test_user.semester_id}",
        headers={"Authorization": f"Bearer {test_user.token}"},
        json={
            "name": "Test Semester 2",
            "startDate": "2022-02-18T00:00:00+00:00",
            "endDate": "2022-06-18T00:00:00+00:00",
            "startHour": "8.20",
            "dLesson": 40,
            "dBreak": 20,
            "slotCount": 12,
        },
    )

    assert semester.status_code == 200
    assert semester.json()["message"] == "Semester updated"


def test_update_semester_with_another_user_id():
    """ "Test updating semester with a user id other than auth user"""

    user_id = "non_existent_user_id"
    semester = client.put(
        f"/users/{user_id}/semesters/{test_user.semester_id}",
        headers={"Authorization": f"Bearer {test_user.token}"},
        json={
            "name": "Test Semester 2",
            "startDate": "2022-02-18T00:00:00+00:00",
            "endDate": "2022-06-18T00:00:00+00:00",
            "startHour": "8.20",
            "dLesson": 40,
            "dBreak": 20,
            "slotCount": 12,
        },
    )

    assert semester.status_code == 403
    assert semester.json()["message"] == "No right to access"


def test_update_semester_with_invalid_semester_id():
    """ "Test updating semester with an invalid semester id"""

    semester_id = "non_existent_semester_id"
    semester = client.put(
        f"/users/{test_user.user_id}/semesters/{semester_id}",
        headers={"Authorization": f"Bearer {test_user.token}"},
        json={
            "name": "Test Semester 2",
            "startDate": "2022-02-18T00:00:00+00:00",
            "endDate": "2022-06-18T00:00:00+00:00",
            "startHour": "8.20",
            "dLesson": 40,
            "dBreak": 20,
            "slotCount": 12,
        },
    )


def test_list_semesters():
    """Test listing semesters"""

    semesters = client.get(
        f"/users/{test_user.user_id}/semesters",
        headers={"Authorization": f"Bearer {test_user.token}"},
    )

    assert semesters.status_code == 200
    # semesters.json() only includes our last semester that created and updated
    assert semesters.json() == [
        {
            "_id": test_user.semester_id,
            "name": "Test Semester 2",
            "startDate": "2022-02-18T00:00:00+00:00",
            "endDate": "2022-06-18T00:00:00+00:00",
            "startHour": "8.20",
            "dLesson": 40,
            "dBreak": 20,
            "slotCount": 12,
        }
    ]


def test_list_semesters_with_another_user_id():
    """ "Test listing semesters with a user id other than auth user"""

    user_id = "non_existent_user_id"
    semesters = client.get(
        f"/users/{user_id}/semesters/{test_user.semester_id}",
        headers={"Authorization": f"Bearer {test_user.token}"},
    )

    assert semesters.status_code == 403
    assert semesters.json()["message"] == "No right to access"


def test_create_second_semester():
    """ "Test creating second semester"""

    semester = client.post(
        f"/users/{test_user.user_id}/semesters",
        headers={"Authorization": f"Bearer {test_user.token}"},
        json={
            "name": "Test Semester 3",
            "startDate": "2023-02-18T00:00:00+00:00",
            "endDate": "2023-06-18T00:00:00+00:00",
            "startHour": "8.20",
            "dLesson": 40,
            "dBreak": 20,
            "slotCount": 12,
        },
    )

    assert semester.status_code == 201
    assert semester.json()["message"] == "Semester created"
    test_user.second_semester_id = semester.json()["_id"]


def test_list_semesters_with_two_semesters():
    """ "Test listing semesters with two semesters"""

    semesters = client.get(
        f"/users/{test_user.user_id}/semesters",
        headers={"Authorization": f"Bearer {test_user.token}"},
    )

    assert semesters.status_code == 200
    assert semesters.json() == [
        {
            "_id": semesters.json()[0]["_id"],
            "name": "Test Semester 2",
            "startDate": "2022-02-18T00:00:00+00:00",
            "endDate": "2022-06-18T00:00:00+00:00",
            "startHour": "8.20",
            "dLesson": 40,
            "dBreak": 20,
            "slotCount": 12,
        },
        {
            "_id": semesters.json()[1]["_id"],
            "name": "Test Semester 3",
            "startDate": "2023-02-18T00:00:00+00:00",
            "endDate": "2023-06-18T00:00:00+00:00",
            "startHour": "8.20",
            "dLesson": 40,
            "dBreak": 20,
            "slotCount": 12,
        },
    ]


def test_delete_semester():
    """Test deleting semester"""

    semester = client.delete(
        f"/users/{test_user.user_id}/semesters/{test_user.second_semester_id}",
        headers={"Authorization": f"Bearer {test_user.token}"},
    )

    assert semester.status_code == 200
    assert semester.json()["message"] == "Semester deleted"


def test_delete_same_semester():
    """ "Test deleting same semester"""

    semester = client.delete(
        f"/users/{test_user.user_id}/semesters/{test_user.second_semester_id}",
        headers={"Authorization": f"Bearer {test_user.token}"},
    )

    assert semester.status_code == 404
    assert semester.json()["message"] == "Semester not found"


def test_delete_semester_with_another_user_id():
    """ "Test deleting semester with a user id other than auth user"""

    user_id = "non_existent_user_id"
    semester = client.delete(
        f"/users/{user_id}/semesters/{test_user.semester_id}",
        headers={"Authorization": f"Bearer {test_user.token}"},
    )

    assert semester.status_code == 403
    assert semester.json()["message"] == "No right to access"


def test_delete_semester_with_invalid_semester_id():
    """ "Test deleting semester with an invalid semester id"""

    semester_id = "non_existent_semester_id"
    semester = client.delete(
        f"/users/{test_user.user_id}/semesters/{semester_id}",
        headers={"Authorization": f"Bearer {test_user.token}"},
    )

    assert semester.status_code == 404
    assert semester.json()["message"] == "Semester not found"


def test_delete_current_semester():
    """ "Test deleting current semester"""

    semester = client.delete(
        f"/users/{test_user.user_id}/semesters/{test_user.semester_id}",
        headers={"Authorization": f"Bearer {test_user.token}"},
    )

    assert semester.status_code == 400
    assert semester.json()["message"] == "Cannot delete current semester"
