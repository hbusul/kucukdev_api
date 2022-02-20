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
            client, admin_token, "professor_uni_section_routers@test.com", "test"
        )
        test_user.university_id = create_university(
            client, test_user.token, "Test University for Uni Section Routers"
        )

        test_user.semester_id = create_university_semester(
            client,
            test_user.token,
            test_user.university_id,
            "Test University Semester for Uni Section Routers",
        )

        default_user.user_id, default_user.token = create_user_and_login(
            client, "default_user_uni_section@test.com", "test"
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

    def test_update_university_lesson_section():
        """Test updating university lesson section"""

        section = client.put(
            f"/universities/{test_user.university_id}/semesters/{test_user.semester_id}/lessons/{test_user.lesson_id}/sections/{test_user.section_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={
                "section": "01",
                "instructor": "Test University Instructor 2",
                "slots": [
                    {"day": 2, "hour": 7, "isLab": 0},
                    {"day": 2, "hour": 8, "isLab": 0},
                ],
            },
        )
        assert section.status_code == 200
        assert section.json()["message"] == "University lesson section updated"

    def test_update_university_lesson_section_with_exists_section():
        """Test updating university lesson section with exists section"""

        section = client.put(
            f"/universities/{test_user.university_id}/semesters/{test_user.semester_id}/lessons/{test_user.lesson_id}/sections/{test_user.section_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={
                "section": "02",
                "instructor": "Test University Instructor 2",
                "slots": [
                    {"day": 2, "hour": 7, "isLab": 0},
                    {"day": 2, "hour": 8, "isLab": 0},
                ],
            },
        )
        assert section.status_code == 409
        assert (
            section.json()["message"]
            == "University lesson section could not be found or there exists another section with given section number"
        )

    def test_update_university_lesson_section_with_same_section_data():
        """Test updating university lesson section with same section data"""

        section = client.put(
            f"/universities/{test_user.university_id}/semesters/{test_user.semester_id}/lessons/{test_user.lesson_id}/sections/{test_user.section_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={
                "section": "01",
                "instructor": "Test University Instructor 2",
                "slots": [
                    {"day": 2, "hour": 7, "isLab": 0},
                    {"day": 2, "hour": 8, "isLab": 0},
                ],
            },
        )
        assert section.status_code == 400
        assert (
            section.json()["message"]
            == "University lesson section could not be updated"
        )

    def test_update_university_lesson_section_with_default_user():
        """Test updating university lesson section with default user"""

        section = client.put(
            f"/universities/{test_user.university_id}/semesters/{test_user.semester_id}/lessons/{test_user.lesson_id}/sections/{test_user.section_id}",
            headers={"Authorization": f"Bearer {default_user.token}"},
            json={
                "section": "01",
                "instructor": "Test University Instructor 2",
                "slots": [
                    {"day": 2, "hour": 7, "isLab": 0},
                    {"day": 2, "hour": 8, "isLab": 0},
                ],
            },
        )
        assert section.status_code == 403
        assert section.json()["message"] == "No right to access"

    def test_update_university_lesson_section_with_invalid_semester_id():
        """Test updating university lesson section with invalid semester id"""

        semester_id = "non_exists_semester_id"
        section = client.put(
            f"/universities/{test_user.university_id}/semesters/{semester_id}/lessons/{test_user.lesson_id}/sections/{test_user.section_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={
                "section": "01",
                "instructor": "Test University Instructor 3",
                "slots": [
                    {"day": 2, "hour": 7, "isLab": 0},
                    {"day": 2, "hour": 8, "isLab": 0},
                ],
            },
        )
        assert section.status_code == 409
        assert (
            section.json()["message"]
            == "University lesson section could not be found or there exists another section with given section number"
        )

    def test_delete_university_lesson_section():
        """Test deleting university lesson section"""

        section = client.delete(
            f"/universities/{test_user.university_id}/semesters/{test_user.semester_id}/lessons/{test_user.lesson_id}/sections/{test_user.section_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert section.status_code == 200
        assert section.json()["message"] == "University lesson section deleted"

    def test_delete_same_university_lesson_section():
        """Test deleting same university lesson section"""

        section = client.delete(
            f"/universities/{test_user.university_id}/semesters/{test_user.semester_id}/lessons/{test_user.lesson_id}/sections/{test_user.section_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert section.status_code == 404
        assert section.json()["message"] == "University lesson section not found"

    def test_delete_university_lesson_section_with_default_user(): 
        """Test deleting university lesson section with default user"""

        section = client.delete(
            f"/universities/{test_user.university_id}/semesters/{test_user.semester_id}/lessons/{test_user.lesson_id}/sections/{test_user.section_id}",
            headers={"Authorization": f"Bearer {default_user.token}"},
        )
        assert section.status_code == 403
        assert section.json()["message"] == "No right to access"

    def test_delete_used_university():
        """Test deleting a university that has been used"""

        university = client.delete(
            f"/universities/{test_user.university_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )

        assert university.status_code == 200
        assert university.json()["message"] == "University deleted"
