from app.main import app
from app.tests.create_requirements import create_semester, create_user_and_login
from fastapi.testclient import TestClient

with TestClient(app) as client:

    class TestUser:
        user_id = None
        token = None
        semester_id = None
        lesson_id = None
        lesson_id_list = []

    test_user = TestUser()

    def test_prepare_test_data():
        test_user.user_id, test_user.token = create_user_and_login(
            client, "lesson_routers@test.com", "password", "name", "surname"
        )
        test_user.semester_id = create_semester(
            client, test_user.user_id, test_user.token
        )

    def test_create_lesson():
        """Test creating lesson"""

        lesson = client.post(
            f"/users/{test_user.user_id}/semesters/{test_user.semester_id}/lessons",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={
                "name": "Test Lesson",
                "code": "TEST",
                "instructor": "Test Instructor",
                "ects": 5,
                "absence_limit": 0,
                "grade": 3.0,
                "slots": [
                    {"room": "B200", "day": 2, "hour": 7, "is_lab": 0},
                    {"room": "B200", "day": 2, "hour": 8, "is_lab": 0},
                ],
            },
        )

        assert lesson.status_code == 201
        assert lesson.json()["message"] == "Lesson created"
        test_user.lesson_id = lesson.json()["_id"]
        test_user.lesson_id_list.append(lesson.json()["_id"])

    def test_create_lesson_with_another_user_id():
        """Test creating lesson with a user id other than auth user"""

        user_id = "non_exists_user_id"
        lesson = client.post(
            f"/users/{user_id}/semesters/{test_user.semester_id}/lessons",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={
                "name": "Test Lesson",
                "code": "TEST",
                "instructor": "Test Instructor",
                "ects": 5,
                "absence_limit": 0,
                "grade": 3.0,
                "slots": [
                    {"room": "B200", "day": 2, "hour": 7, "is_lab": 0},
                    {"room": "B200", "day": 2, "hour": 8, "is_lab": 0},
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
                "code": "TEST",
                "instructor": "Test Instructor",
                "ects": 5,
                "absence_limit": 0,
                "grade": 3.0,
                "slots": [
                    {"room": "B200", "day": 2, "hour": 7, "is_lab": 0},
                    {"room": "B200", "day": 2, "hour": 8, "is_lab": 0},
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

        print(lesson.json())
        print(lesson.json()["slots"])
        assert lesson.status_code == 200
        assert lesson.json() == {
            "_id": test_user.lesson_id,
            "name": "Test Lesson",
            "code": "TEST",
            "instructor": "Test Instructor",
            "absence_limit": 0,
            "grade": 3.0,
            "ects": 5,
            "slots": [
                {
                    "_id": None,
                    "room": "B200",
                    "day": 2,
                    "hour": 7,
                    "is_lab": 0,
                    "absences": [],
                },
                {
                    "_id": None,
                    "room": "B200",
                    "day": 2,
                    "hour": 8,
                    "is_lab": 0,
                    "absences": [],
                },
            ],
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
                "name": "Updated Test Lesson",
                "code": "TEST",
                "instructor": "Updated Instructor",
                "ects": 5,
                "absence_limit": 0,
                "grade": 3.0,
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
                "name": "Updated Test Lesson",
                "code": "TEST",
                "instructor": "Updated Instructor",
                "ects": 5,
                "absence_limit": 0,
                "grade": 3.0,
                "slots": [
                    {"room": "B200", "day": 2, "hour": 7, "is_lab": 0},
                    {"room": "B201", "day": 2, "hour": 8, "is_lab": 0},
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
                "name": "Updated Test Lesson",
                "code": "TEST",
                "instructor": "Updated Instructor",
                "ects": 5,
                "absence_limit": 0,
                "grade": 3.0,
                "slots": [
                    {"room": "B200", "day": 2, "hour": 7, "is_lab": 0},
                    {"room": "B201", "day": 2, "hour": 8, "is_lab": 0},
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
                "name": "Updated Test Lesson",
                "code": "TEST",
                "instructor": "Updated Instructor",
                "ects": 5,
                "absence_limit": 0,
                "grade": 3.0,
                "slots": [
                    {"room": "B200", "day": 2, "hour": 7, "is_lab": 0},
                    {"room": "B201", "day": 2, "hour": 8, "is_lab": 0},
                ],
            },
        )

        assert lesson.status_code == 409
        assert (
            lesson.json()["message"]
            == "Given lesson code already exists or lesson not found"
        )

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
                "name": "Updated Test Lesson",
                "code": "TEST",
                "instructor": "Updated Instructor",
                "ects": 5,
                "absence_limit": 0,
                "grade": 3.0,
                "slots": [
                    {
                        "_id": None,
                        "room": "B200",
                        "day": 2,
                        "hour": 7,
                        "is_lab": 0,
                        "absences": [],
                    },
                    {
                        "_id": None,
                        "room": "B200",
                        "day": 2,
                        "hour": 8,
                        "is_lab": 0,
                        "absences": [],
                    },
                ],
            },
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
                "name": "Test Lesson 2",
                "code": "TEST 2",
                "instructor": "Test Instructor",
                "ects": 5,
                "absence_limit": 0,
                "grade": 3.0,
                "slots": [
                    {"room": "B200", "day": 2, "hour": 7, "is_lab": 0},
                    {"room": "B200", "day": 2, "hour": 8, "is_lab": 0},
                ],
            },
        )

        assert lesson.status_code == 201
        assert lesson.json()["message"] == "Lesson created"
        test_user.lesson_id_list.append(lesson.json()["_id"])

    def test_list_lessons_with_two_lessons():
        """Test listing lessons with two lessons"""

        lessons = client.get(
            f"/users/{test_user.user_id}/semesters/{test_user.semester_id}/lessons",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )

        assert lessons.status_code == 200
        assert lessons.json() == [
            {
                "_id": test_user.lesson_id,
                "name": "Updated Test Lesson",
                "code": "TEST",
                "instructor": "Updated Instructor",
                "ects": 5,
                "absence_limit": 0,
                "grade": 3.0,
                "slots": [
                    {
                        "_id": None,
                        "room": "B200",
                        "day": 2,
                        "hour": 7,
                        "is_lab": 0,
                        "absences": [],
                    },
                    {
                        "_id": None,
                        "room": "B200",
                        "day": 2,
                        "hour": 8,
                        "is_lab": 0,
                        "absences": [],
                    },
                ],
            },
            {
                "_id": test_user.lesson_id_list[1],
                "name": "Test Lesson 2",
                "code": "TEST 2",
                "instructor": "Test Instructor",
                "ects": 5,
                "absence_limit": 0,
                "grade": 3.0,
                "slots": [
                    {
                        "_id": None,
                        "room": "B200",
                        "day": 2,
                        "hour": 7,
                        "is_lab": 0,
                        "absences": [],
                    },
                    {
                        "_id": None,
                        "room": "B200",
                        "day": 2,
                        "hour": 8,
                        "is_lab": 0,
                        "absences": [],
                    },
                ],
            },
        ]

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

