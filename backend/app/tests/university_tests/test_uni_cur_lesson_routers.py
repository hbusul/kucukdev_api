from app.main import app, settings
from app.tests.create_requirements import (
    create_professor_and_login,
    create_user_and_login,
    login_admin_user,
    create_university,
    create_department,
    create_curriculum,
    create_curriculum_semester,
)
from fastapi.testclient import TestClient

with TestClient(app) as client:

    class TestUser:
        user_id = None
        token = None
        university_id = None
        department_id = None
        curriculum_id = None
        curriculum_semester_id = None
        curriculum_lesson_id = None
        second_curriculum_lesson_id = None

    test_user = TestUser()
    admin_token = login_admin_user(client, settings)
    test_user.user_id, test_user.token = create_professor_and_login(
        client, admin_token, "professor_uni_cur_lesson_routers@test.com", "test"
    )
    test_user.university_id = create_university(
        client, test_user.token, "Test University for Uni Cur Lesson Routers"
    )
    test_user.department_id = create_department(
        client,
        test_user.token,
        test_user.university_id,
        "Test Department for Uni Cur Lesson Routers",
    )
    test_user.curriculum_id = create_curriculum(
        client,
        test_user.token,
        test_user.university_id,
        test_user.department_id,
        "Test Curriculum for Uni Cur Lesson Routers",
    )
    test_user.curriculum_semester_id = create_curriculum_semester(
        client,
        test_user.token,
        test_user.university_id,
        test_user.department_id,
        test_user.curriculum_id,
        1,
    )

    default_user = TestUser()
    default_user.user_id, default_user.token = create_user_and_login(
        client, "default_user_uni_cur@test.com", "test"
    )

    def test_create_curriculum_lesson():
        """Test creating a curriculum lesson"""

        curriculum_lesson = client.post(
            f"/universities/{test_user.university_id}/departments/{test_user.department_id}/curriculums/{test_user.curriculum_id}/semesters/{test_user.curriculum_semester_id}/lessons",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={
                "name": "Test Curriculum Lesson",
                "code": "TEST_CUR_LESSON",
                "lessonType": "default",
            },
        )

        assert curriculum_lesson.status_code == 201
        assert curriculum_lesson.json()["message"] == "Curriculum lesson created"
        test_user.curriculum_lesson_id = curriculum_lesson.json()["_id"]

    def test_get_curriculum_lesson():
        """Test getting a curriculum lesson"""

        curriculum_lesson = client.get(
            f"/universities/{test_user.university_id}/departments/{test_user.department_id}/curriculums/{test_user.curriculum_id}/semesters/{test_user.curriculum_semester_id}/lessons/{test_user.curriculum_lesson_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )

        assert curriculum_lesson.status_code == 200
        assert curriculum_lesson.json() == {
            "_id": test_user.curriculum_lesson_id,
            "name": "Test Curriculum Lesson",
            "code": "TEST_CUR_LESSON",
            "lessonType": "default",
        }

    def test_get_curriculum_lesson_with_default_user():
        """Test getting a curriculum lesson with default user"""

        curriculum_lesson = client.get(
            f"/universities/{test_user.university_id}/departments/{test_user.department_id}/curriculums/{test_user.curriculum_id}/semesters/{test_user.curriculum_semester_id}/lessons/{test_user.curriculum_lesson_id}",
            headers={"Authorization": f"Bearer {default_user.token}"},
        )

        assert curriculum_lesson.status_code == 200
        assert curriculum_lesson.json() == {
            "_id": test_user.curriculum_lesson_id,
            "name": "Test Curriculum Lesson",
            "code": "TEST_CUR_LESSON",
            "lessonType": "default",
        }

    def test_get_curriculum_lesson_with_invalid_lesson_id():
        """Test getting a curriculum lesson with invalid lesson id"""

        curriculum_lesson = client.get(
            f"/universities/{test_user.university_id}/departments/{test_user.department_id}/curriculums/{test_user.curriculum_id}/semesters/{test_user.curriculum_semester_id}/lessons/invalid_lesson_id",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )

        assert curriculum_lesson.status_code == 404
        assert curriculum_lesson.json()["message"] == "Curriculum lesson not found"

    def test_create_same_curriculum_lesson():
        """Test creating a curriculum lesson with the same name"""

        curriculum_lesson = client.post(
            f"/universities/{test_user.university_id}/departments/{test_user.department_id}/curriculums/{test_user.curriculum_id}/semesters/{test_user.curriculum_semester_id}/lessons",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={
                "name": "Test Curriculum Lesson",
                "code": "TEST_CUR_LESSON",
                "lessonType": "default",
            },
        )

        assert curriculum_lesson.status_code == 409
        assert curriculum_lesson.json()["message"] == "Curriculum lesson already exists"

    def test_create_curriculum_lesson_with_invalid_semester_id():
        """Test creating a curriculum lesson with an invalid semester id"""

        curriculum_semester_id = "non_exists_curriculum_semester_id"
        curriculum_lesson = client.post(
            f"/universities/{test_user.university_id}/departments/{test_user.department_id}/curriculums/{test_user.curriculum_id}/semesters/{curriculum_semester_id}/lessons",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={
                "name": "Test Curriculum Lesson",
                "code": "TEST_CUR_LESSON",
                "lessonType": "default",
            },
        )

        assert curriculum_lesson.status_code == 404
        assert curriculum_lesson.json()["message"] == "Curriculum semester not found"

    def test_create_curriculum_lesson_with_invalid_university_id():
        """Test creating a curriculum lesson with an invalid university id"""

        university_id = "non_exists_university_id"
        curriculum_lesson = client.post(
            f"/universities/{university_id}/departments/{test_user.department_id}/curriculums/{test_user.curriculum_id}/semesters/{test_user.curriculum_semester_id}/lessons",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={
                "name": "Test Curriculum Lesson",
                "code": "TEST_CUR_LESSON",
                "lessonType": "default",
            },
        )

        assert curriculum_lesson.status_code == 404
        assert curriculum_lesson.json()["message"] == "Curriculum semester not found"

    def test_create_curriculum_lesson_with_default_user():
        """Test creating a curriculum lesson with a default user"""

        curriculum_lesson = client.post(
            f"/universities/{test_user.university_id}/departments/{test_user.department_id}/curriculums/{test_user.curriculum_id}/semesters/{test_user.curriculum_semester_id}/lessons",
            headers={"Authorization": f"Bearer {default_user.token}"},
            json={
                "name": "Test Curriculum Lesson",
                "code": "TEST_CUR_LESSON",
                "lessonType": "default",
            },
        )

        assert curriculum_lesson.status_code == 403
        assert curriculum_lesson.json()["message"] == "No right to access"

    def test_list_curriculum_lessons():
        """Test listing curriculum lessons"""

        curriculum_lessons = client.get(
            f"/universities/{test_user.university_id}/departments/{test_user.department_id}/curriculums/{test_user.curriculum_id}/semesters/{test_user.curriculum_semester_id}/lessons",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )

        assert curriculum_lessons.status_code == 200
        assert curriculum_lessons.json() == [
            {
                "_id": test_user.curriculum_lesson_id,
                "name": "Test Curriculum Lesson",
                "code": "TEST_CUR_LESSON",
                "lessonType": "default",
            }
        ]

    def test_list_curriculum_lessons_with_default_user():
        """Test listing curriculum lessons with a default user"""

        curriculum_lessons = client.get(
            f"/universities/{test_user.university_id}/departments/{test_user.department_id}/curriculums/{test_user.curriculum_id}/semesters/{test_user.curriculum_semester_id}/lessons",
            headers={"Authorization": f"Bearer {default_user.token}"},
        )

        assert curriculum_lessons.status_code == 200
        assert curriculum_lessons.json() == [
            {
                "_id": test_user.curriculum_lesson_id,
                "name": "Test Curriculum Lesson",
                "code": "TEST_CUR_LESSON",
                "lessonType": "default",
            }
        ]

    def test_list_curriculum_lessons_with_invalid_semester_id():
        """Test listing curriculum lessons with an invalid semester id"""

        curriculum_semester_id = "non_exists_curriculum_semester_id"
        curriculum_lessons = client.get(
            f"/universities/{test_user.university_id}/departments/{test_user.department_id}/curriculums/{test_user.curriculum_id}/semesters/{curriculum_semester_id}/lessons",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )

        assert curriculum_lessons.status_code == 404
        assert curriculum_lessons.json()["message"] == "Curriculum semester not found"

    def test_list_curriculum_lessons_with_invalid_university_id():
        """Test listing curriculum lessons with an invalid university id"""

        university_id = "non_exists_university_id"
        curriculum_lessons = client.get(
            f"/universities/{university_id}/departments/{test_user.department_id}/curriculums/{test_user.curriculum_id}/semesters/{test_user.curriculum_semester_id}/lessons",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )

        assert curriculum_lessons.status_code == 404
        assert curriculum_lessons.json()["message"] == "Curriculum semester not found"

    def test_update_curriculum_lesson():
        """Test updating a curriculum lesson"""

        curriculum_lesson = client.put(
            f"/universities/{test_user.university_id}/departments/{test_user.department_id}/curriculums/{test_user.curriculum_id}/semesters/{test_user.curriculum_semester_id}/lessons/{test_user.curriculum_lesson_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={
                "name": "Test Curriculum Lesson Updated",
                "code": "TEST_CUR_LESSON",
                "lessonType": "default",
            },
        )

        assert curriculum_lesson.status_code == 200
        assert curriculum_lesson.json()["message"] == "Curriculum lesson updated"

    def test_create_second_curriculum_lesson():
        """Test creating a second curriculum lesson"""

        curriculum_lesson = client.post(
            f"/universities/{test_user.university_id}/departments/{test_user.department_id}/curriculums/{test_user.curriculum_id}/semesters/{test_user.curriculum_semester_id}/lessons",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={
                "name": "Test Curriculum Lesson 2",
                "code": "TEST_CUR_LESSON_2",
                "lessonType": "default",
            },
        )

        assert curriculum_lesson.status_code == 201
        assert curriculum_lesson.json()["message"] == "Curriculum lesson created"
        test_user.second_curriculum_lesson_id = curriculum_lesson.json()["_id"]

    def test_list_curriculum_lessons_with_two_lessons():
        """Test listing curriculum lessons with two lessons"""

        curriculum_lessons = client.get(
            f"/universities/{test_user.university_id}/departments/{test_user.department_id}/curriculums/{test_user.curriculum_id}/semesters/{test_user.curriculum_semester_id}/lessons",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )

        assert curriculum_lessons.status_code == 200
        assert curriculum_lessons.json() == [
            {
                "_id": test_user.curriculum_lesson_id,
                "name": "Test Curriculum Lesson Updated",
                "code": "TEST_CUR_LESSON",
                "lessonType": "default",
            },
            {
                "_id": test_user.second_curriculum_lesson_id,
                "name": "Test Curriculum Lesson 2",
                "code": "TEST_CUR_LESSON_2",
                "lessonType": "default",
            },
        ]

    def test_update_curriculum_lesson_with_invalid_lesson_id():
        """Test updating a curriculum lesson with an invalid lesson id"""

        curriculum_lesson_id = "non_exists_curriculum_lesson_id"
        curriculum_lesson = client.put(
            f"/universities/{test_user.university_id}/departments/{test_user.department_id}/curriculums/{test_user.curriculum_id}/semesters/{test_user.curriculum_semester_id}/lessons/{curriculum_lesson_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={
                "name": "Test Curriculum Lesson Updated 3",
                "code": "TEST_CUR_LESSON_3",
                "lessonType": "default",
            },
        )

        assert curriculum_lesson.status_code == 400
        assert (
            curriculum_lesson.json()["message"]
            == "Curriculum lesson could not be updated"
        )

    def test_update_curriculum_lesson_with_exists_lesson_code():
        """Test updating a curriculum lesson with an exists lesson code"""

        curriculum_lesson = client.put(
            f"/universities/{test_user.university_id}/departments/{test_user.department_id}/curriculums/{test_user.curriculum_id}/semesters/{test_user.curriculum_semester_id}/lessons/{test_user.curriculum_lesson_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={
                "name": "Test Curriculum Lesson Updated 4",
                "code": "TEST_CUR_LESSON_2",
                "lessonType": "default",
            },
        )

        assert curriculum_lesson.status_code == 409
        assert (
            curriculum_lesson.json()["message"]
            == "Lesson could not be found or there exists another lesson with given lesson code"
        )

    def test_udpate_curriculum_lesson_with_same_lesson_context():
        """Test updating a curriculum lesson with the same lesson context"""

        curriculum_lesson = client.put(
            f"/universities/{test_user.university_id}/departments/{test_user.department_id}/curriculums/{test_user.curriculum_id}/semesters/{test_user.curriculum_semester_id}/lessons/{test_user.curriculum_lesson_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={
                "name": "Test Curriculum Lesson Updated",
                "code": "TEST_CUR_LESSON",
                "lessonType": "default",
            },
        )

        assert curriculum_lesson.status_code == 400
        assert (
            curriculum_lesson.json()["message"]
            == "Curriculum lesson could not be updated"
        )

    def test_update_curriculum_lesson_with_default_user():
        """Test updating a curriculum lesson with the default user"""

        curriculum_lesson = client.put(
            f"/universities/{test_user.university_id}/departments/{test_user.department_id}/curriculums/{test_user.curriculum_id}/semesters/{test_user.curriculum_semester_id}/lessons/{test_user.curriculum_lesson_id}",
            headers={"Authorization": f"Bearer {default_user.token}"},
            json={
                "name": "Test Curriculum Lesson Updated",
                "code": "TEST_CUR_LESSON_4",
                "lessonType": "default",
            },
        )

        assert curriculum_lesson.status_code == 403
        assert curriculum_lesson.json()["message"] == "No right to access"

    def test_delete_curriculum_lesson():
        """Test deleting a curriculum lesson"""

        curriculum_lesson = client.delete(
            f"/universities/{test_user.university_id}/departments/{test_user.department_id}/curriculums/{test_user.curriculum_id}/semesters/{test_user.curriculum_semester_id}/lessons/{test_user.curriculum_lesson_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )

        assert curriculum_lesson.status_code == 200
        assert curriculum_lesson.json()["message"] == "Curriculum lesson deleted"

    def test_delete_same_curriculum_lesson():
        """Test deleting a curriculum lesson"""

        curriculum_lesson = client.delete(
            f"/universities/{test_user.university_id}/departments/{test_user.department_id}/curriculums/{test_user.curriculum_id}/semesters/{test_user.curriculum_semester_id}/lessons/{test_user.curriculum_lesson_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )

        assert curriculum_lesson.status_code == 404
        assert curriculum_lesson.json()["message"] == "Curriculum lesson not found"

    def test_delete_same_curriculum_lesson_with_default_user():
        """Test deleting a curriculum lesson with the default user"""

        curriculum_lesson = client.delete(
            f"/universities/{test_user.university_id}/departments/{test_user.department_id}/curriculums/{test_user.curriculum_id}/semesters/{test_user.curriculum_semester_id}/lessons/{test_user.curriculum_lesson_id}",
            headers={"Authorization": f"Bearer {default_user.token}"},
        )

        assert curriculum_lesson.status_code == 403
        assert curriculum_lesson.json()["message"] == "No right to access"

    def test_delete_used_university():
        """Test deleting a university that has been used"""

        university = client.delete(
            f"/universities/{test_user.university_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )

        assert university.status_code == 200
        assert university.json()["message"] == "University deleted"
