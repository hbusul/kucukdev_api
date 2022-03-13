from app.main import app, settings
from app.tests.create_requirements import (
    create_professor_and_login,
    create_university,
    create_university_semester,
    create_user_and_login,
    login_admin_user,
)
from fastapi.testclient import TestClient

with TestClient(app) as client:

    class TestUser:
        user_id = None
        token = None
        university_id = None
        semester_id = None
        lesson_id = None

    test_user = TestUser()
    default_user = TestUser()

    def test_prepare_test_data():
        admin_token = login_admin_user(client, settings)
        test_user.user_id, test_user.token = create_professor_and_login(
            client,
            admin_token,
            "professor_uni_lesson_routers@test.com",
            "test",
            "professor_first_name",
            "professor_last_name",
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
            client,
            "default_user_uni_lesson@test.com",
            "test",
            "default_first_name",
            "default_last_name",
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
                "absence_limit": 12,
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
            "absence_limit": 12,
            "sections": [],
        }

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
                "absence_limit": 12,
            },
        )
        assert section.status_code == 409
        assert section.json()["message"] == "Given lesson code already exists"

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
                "absence_limit": 12,
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
                "absence_limit": 12,
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
                "absence_limit": 12,
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
                "absence_limit": 12,
                "sections": [],
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
                "absence_limit": 12,
                "sections": [],
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
                "absence_limit": 12,
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
                "absence_limit": 12,
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
                "absence_limit": 12,
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
                "absence_limit": 12,
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
                "absence_limit": 12,
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
                "absence_limit": 12,
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
