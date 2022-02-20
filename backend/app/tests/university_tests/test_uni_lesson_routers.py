from app.main import app, settings
from app.tests.create_requirements import (
    create_professor_and_login,
    create_user_and_login,
    login_admin_user,
    create_university,
    create_university_semester,
)
from fastapi.testclient import TestClient

with TestClient(app) as client:

    class TestUser:
        user_id = None
        token = None
        university_id = None
        semester_id = None
        lesson_id = None
        section_id = None
        second_section_id = None

    test_user = TestUser()
    default_user = TestUser()

    def test_prepare_test_data():
        admin_token = login_admin_user(client, settings)
        test_user.user_id, test_user.token = create_professor_and_login(
            client, admin_token, "professor_uni_lesson_routers@test.com", "test"
        )
        test_user.university_id = create_university(
            client, test_user.token, "Test University for Uni Lesson Routers"
        )

        test_user.semester_id = create_university_semester(
            client,
            test_user.token,
            test_user.university_id,
            "Test University Semester for Uni Lesson Routers",
        )

        default_user.user_id, default_user.token = create_user_and_login(
            client, "default_user_uni_lesson@test.com", "test"
        )

    def test_create_university_lesson():
        """Test creating university lesson"""

        lesson = client.post(
            f"/universities/{test_user.university_id}/semesters/{test_user.semester_id}/lessons",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={
                "name": "Test University Lesson",
                "code": "TEST_UNI_LESSON",
                "ects": 5,
                "absenceLimit": 12,
                "section": "01",
                "instructor": "Test University Instructor",
                "slots": [
                    {"day": 2, "hour": 7, "isLab": 0},
                    {"day": 2, "hour": 8, "isLab": 0},
                ],
            },
        )
        assert lesson.status_code == 201
        assert lesson.json()["message"] == "University lesson created"
        test_user.lesson_id = lesson.json()["_id"]

    def test_get_university_lesson():
        """Test getting university lesson"""

        lesson = client.get(
            f"/universities/{test_user.university_id}/semesters/{test_user.semester_id}/lessons/{test_user.lesson_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert lesson.status_code == 200
        assert lesson.json() == {
            "_id": test_user.lesson_id,
            "name": "Test University Lesson",
            "code": "TEST_UNI_LESSON",
            "ects": 5,
            "absenceLimit": 12,
            "sections": [
                {
                    "_id": lesson.json()["sections"][0]["_id"],
                    "section": "01",
                    "instructor": "Test University Instructor",
                    "slots": [[2, 7, 0], [2, 8, 0],],
                }
            ],
        }
        test_user.section_id = lesson.json()["sections"][0]["_id"]

    def test_get_university_lesson_with_invalid_lesson_id():
        """Test getting university lesson with invalid lesson id"""

        lesson_id = "non_exists_lesson_id"
        lesson = client.get(
            f"/universities/{test_user.university_id}/semesters/{test_user.semester_id}/lessons/{lesson_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert lesson.status_code == 404
        assert lesson.json() == {"message": "University lesson not found"}

    def test_get_university_lesson_with_invalid_university_id():
        """Test getting university lesson with invalid university id"""

        university_id = "non_exists_university_id"
        lesson = client.get(
            f"/universities/{university_id}/semesters/{test_user.semester_id}/lessons/{test_user.lesson_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert lesson.status_code == 404
        assert lesson.json() == {"message": "University lesson not found"}

    def test_create_same_university_lesson():
        """Test creating university lesson with same section"""

        section = client.post(
            f"/universities/{test_user.university_id}/semesters/{test_user.semester_id}/lessons",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={
                "name": "Test University Lesson",
                "code": "TEST_UNI_LESSON",
                "ects": 5,
                "absenceLimit": 12,
                "section": "01",
                "instructor": "Test University Instructor 2",
                "slots": [
                    {"day": 3, "hour": 5, "isLab": 0},
                    {"day": 3, "hour": 6, "isLab": 0},
                ],
            },
        )
        assert section.status_code == 409
        assert section.json()["message"] == "University lesson section already exists"

    def test_create_university_lesson_section():
        """Test creating university lesson section"""

        section = client.post(
            f"/universities/{test_user.university_id}/semesters/{test_user.semester_id}/lessons",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={
                "name": "Test University Lesson",
                "code": "TEST_UNI_LESSON",
                "ects": 5,
                "absenceLimit": 12,
                "section": "02",
                "instructor": "Test University Instructor 2",
                "slots": [
                    {"day": 3, "hour": 5, "isLab": 0},
                    {"day": 3, "hour": 6, "isLab": 0},
                ],
            },
        )
        assert section.status_code == 201
        assert section.json()["message"] == "University lesson section created"
        test_user.second_section_id = section.json()["_id"]

    def test_create_university_lesson_with_invalid_semester_id():
        """Test creating university lesson with invalid semester id"""

        semester_id = "non_exists_semester_id"
        lesson = client.post(
            f"/universities/{test_user.university_id}/semesters/{semester_id}/lessons",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={
                "name": "Test University Lesson",
                "code": "TEST_UNI_LESSON",
                "ects": 5,
                "absenceLimit": 12,
                "section": "01",
                "instructor": "Test University Instructor",
                "slots": [
                    {"day": 2, "hour": 7, "isLab": 0},
                    {"day": 2, "hour": 8, "isLab": 0},
                ],
            },
        )
        assert lesson.status_code == 404
        assert lesson.json()["message"] == "University semester not found"

    def test_create_university_lesson_with_invalid_university_id():
        """Test creating university lesson with invalid university id"""

        university_id = "non_exists_university_id"
        lesson = client.post(
            f"/universities/{university_id}/semesters/{test_user.semester_id}/lessons",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={
                "name": "Test University Lesson",
                "code": "TEST_UNI_LESSON",
                "ects": 5,
                "absenceLimit": 12,
                "section": "01",
                "instructor": "Test University Instructor",
                "slots": [
                    {"day": 2, "hour": 7, "isLab": 0},
                    {"day": 2, "hour": 8, "isLab": 0},
                ],
            },
        )
        assert lesson.status_code == 404
        assert lesson.json()["message"] == "University semester not found"

    def create_university_lesson_with_default_user():
        """Test creating university lesson with default user"""

        lesson = client.post(
            f"/universities/{test_user.university_id}/semesters/{test_user.semester_id}/lessons",
            headers={"Authorization": f"Bearer {default_user.token}"},
            json={
                "name": "Test University Lesson",
                "code": "TEST_UNI_LESSON",
                "ects": 5,
                "absenceLimit": 12,
                "section": "01",
                "instructor": "Test University Instructor",
                "slots": [
                    {"day": 2, "hour": 7, "isLab": 0},
                    {"day": 2, "hour": 8, "isLab": 0},
                ],
            },
        )
        assert lesson.status_code == 403
        assert lesson.json()["message"] == "No right to access"

    def test_list_university_lessons_of_a_semester():
        """Test listing university lessons of a semester"""

        lessons = client.get(
            f"/universities/{test_user.university_id}/semesters/{test_user.semester_id}/lessons",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert lessons.status_code == 200
        assert lessons.json() == [
            {
                "_id": test_user.lesson_id,
                "name": "Test University Lesson",
                "code": "TEST_UNI_LESSON",
                "ects": 5,
                "absenceLimit": 12,
                "sections": [
                    {
                        "_id": test_user.section_id,
                        "section": "01",
                        "instructor": "Test University Instructor",
                        "slots": [[2, 7, 0], [2, 8, 0],],
                    },
                    {
                        "_id": test_user.second_section_id,
                        "section": "02",
                        "instructor": "Test University Instructor 2",
                        "slots": [[3, 5, 0], [3, 6, 0],],
                    },
                ],
            }
        ]

    def test_list_university_lessons_of_a_semester_with_invalid_semester_id():
        """Test listing university lessons of a semester with invalid semester id"""

        semester_id = "non_exists_semester_id"
        lessons = client.get(
            f"/universities/{test_user.university_id}/semesters/{semester_id}/lessons",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert lessons.status_code == 404
        assert lessons.json()["message"] == "University semester not found"

    def test_list_university_lessons_of_a_semester_with_invalid_university_id():
        """Test listing university lessons of a semester with invalid university id"""

        university_id = "non_exists_university_id"
        lessons = client.get(
            f"/universities/{university_id}/semesters/{test_user.semester_id}/lessons",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert lessons.status_code == 404
        assert lessons.json()["message"] == "University semester not found"

    def test_list_university_lessons_of_a_semester_with_default_user():
        """Test listing university lessons of a semester with default user"""

        lessons = client.get(
            f"/universities/{test_user.university_id}/semesters/{test_user.semester_id}/lessons",
            headers={"Authorization": f"Bearer {default_user.token}"},
        )
        assert lessons.status_code == 200
        assert lessons.json() == [
            {
                "_id": test_user.lesson_id,
                "name": "Test University Lesson",
                "code": "TEST_UNI_LESSON",
                "ects": 5,
                "absenceLimit": 12,
                "sections": [
                    {
                        "_id": test_user.section_id,
                        "section": "01",
                        "instructor": "Test University Instructor",
                        "slots": [[2, 7, 0], [2, 8, 0],],
                    },
                    {
                        "_id": test_user.second_section_id,
                        "section": "02",
                        "instructor": "Test University Instructor 2",
                        "slots": [[3, 5, 0], [3, 6, 0],],
                    },
                ],
            }
        ]

    def test_create_second_university_lesson():
        """Test creating second university lesson"""

        lesson = client.post(
            f"/universities/{test_user.university_id}/semesters/{test_user.semester_id}/lessons",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={
                "name": "Test University Lesson 2",
                "code": "TEST_UNI_LESSON_2",
                "ects": 5,
                "absenceLimit": 12,
                "section": "01",
                "instructor": "Test University Instructor",
                "slots": [
                    {"day": 2, "hour": 7, "isLab": 0},
                    {"day": 2, "hour": 8, "isLab": 0},
                ],
            },
        )
        assert lesson.status_code == 201
        assert lesson.json()["message"] == "University lesson created"

    def test_update_university_lesson():
        """Test updating university lesson"""

        lesson = client.put(
            f"/universities/{test_user.university_id}/semesters/{test_user.semester_id}/lessons/{test_user.lesson_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={
                "name": "Test University Lesson 3",
                "code": "TEST_UNI_LESSON",
                "ects": 5,
                "absenceLimit": 12,
            },
        )
        assert lesson.status_code == 200
        assert lesson.json()["message"] == "University lesson updated"

    def test_update_university_lesson_with_same_lesson_context():
        """Test updating university lesson with same lesson context"""

        lesson = client.put(
            f"/universities/{test_user.university_id}/semesters/{test_user.semester_id}/lessons/{test_user.lesson_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={
                "name": "Test University Lesson 3",
                "code": "TEST_UNI_LESSON",
                "ects": 5,
                "absenceLimit": 12,
            },
        )
        assert lesson.status_code == 400
        assert lesson.json()["message"] == "University lesson could not be updated"

    def test_update_university_lesson_with_exists_lesson_code():
        """Test updating university lesson with exists lesson code"""

        lesson = client.put(
            f"/universities/{test_user.university_id}/semesters/{test_user.semester_id}/lessons/{test_user.lesson_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={
                "name": "Test University Lesson 3",
                "code": "TEST_UNI_LESSON_2",
                "ects": 5,
                "absenceLimit": 12,
            },
        )
        assert lesson.status_code == 409
        assert (
            lesson.json()["message"]
            == "University lesson could not be found or there exists another lesson with given code"
        )

    def test_update_university_lesson_with_invalid_lesson_id():
        """Test updating university lesson with invalid lesson id"""

        lesson_id = "non_exists_lesson_id"
        lesson = client.put(
            f"/universities/{test_user.university_id}/semesters/{test_user.semester_id}/lessons/{lesson_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={
                "name": "Test University Lesson 3",
                "code": "TEST_UNI_LESSON",
                "ects": 5,
                "absenceLimit": 12,
            },
        )
        assert lesson.status_code == 409
        assert (
            lesson.json()["message"]
            == "University lesson could not be found or there exists another lesson with given code"
        )

    def test_update_university_lesson_with_default_user():
        """Test updating university lesson with default user"""

        lesson = client.put(
            f"/universities/{test_user.university_id}/semesters/{test_user.semester_id}/lessons/{test_user.lesson_id}",
            headers={"Authorization": f"Bearer {default_user.token}"},
            json={
                "name": "Test University Lesson 3",
                "code": "TEST_UNI_LESSON",
                "ects": 5,
                "absenceLimit": 12,
            },
        )
        assert lesson.status_code == 403
        assert lesson.json()["message"] == "No right to access"

    def test_delete_university_lesson():
        """Test deleting university lesson"""

        lesson = client.delete(
            f"/universities/{test_user.university_id}/semesters/{test_user.semester_id}/lessons/{test_user.lesson_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert lesson.status_code == 200
        assert lesson.json() == {"message": "University lesson deleted"}

    def test_delete_same_university_lesson():
        """Test deleting same university lesson"""

        lesson = client.delete(
            f"/universities/{test_user.university_id}/semesters/{test_user.semester_id}/lessons/{test_user.lesson_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert lesson.status_code == 404
        assert lesson.json() == {"message": "University lesson not found"}

    def test_delete_university_lesson_with_default_user():
        """Test deleting university lesson with default user"""

        lesson = client.delete(
            f"/universities/{test_user.university_id}/semesters/{test_user.semester_id}/lessons/{test_user.lesson_id}",
            headers={"Authorization": f"Bearer {default_user.token}"},
        )
        assert lesson.status_code == 403
        assert lesson.json() == {"message": "No right to access"}

    def test_delete_used_university():
        """Test deleting a university that has been used"""

        university = client.delete(
            f"/universities/{test_user.university_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )

        assert university.status_code == 200
        assert university.json()["message"] == "University deleted"
