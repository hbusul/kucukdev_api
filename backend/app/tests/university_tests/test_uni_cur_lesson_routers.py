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
            f"/universities/{test_user.university_id}/departments/{test_user.department_id}/curriculums/{test_user.curriculum_id}/semesters{test_user.curriculum_semester_id}/lessons",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={
                "name": "Test Curriculum Lesson",
                "code": "TEST_CUR_LESSON",
                "lessonType": "default",
            },
        )
        print(curriculum_lesson.json())

        assert curriculum_lesson.status_code == 201
        assert curriculum_lesson.json()["message"] == "Curriculum lesson created"

    def test_delete_used_university():
        """Test deleting a university that has been used"""

        university = client.delete(
            f"/universities/{test_user.university_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )

        assert university.status_code == 200
        assert university.json()["message"] == "University deleted"
