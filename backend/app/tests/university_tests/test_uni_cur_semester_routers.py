from app.main import app, settings
from app.tests.create_requirements import (
    create_professor_and_login,
    create_user_and_login,
    login_admin_user,
    create_university,
    create_department,
    create_curriculum,
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
        second_curriculum_semester_id = None

    test_user = TestUser()
    default_user = TestUser()

    def test_prepare_test_data():
        admin_token = login_admin_user(client, settings)
        test_user.user_id, test_user.token = create_professor_and_login(
            client,
            admin_token,
            "professor_uni_cur_semester_routers@test.com",
            "test",
            "professor_first_name",
            "professor_last_name",
        )
        test_user.university_id = create_university(
            client, test_user.token, "Test University for Uni Cur Semester Routers"
        )
        test_user.department_id = create_department(
            client,
            test_user.token,
            test_user.university_id,
            "Test Department for Uni Cur Semester Routers",
        )
        test_user.curriculum_id = create_curriculum(
            client,
            test_user.token,
            test_user.university_id,
            test_user.department_id,
            "Test Curriculum for Uni Cur Lesson Routers",
        )

        default_user.user_id, default_user.token = create_user_and_login(
            client,
            "default_user_uni_cur_semester@test.com",
            "test",
            "default_first_name",
            "default_last_name",
        )

    def test_create_curriculum_semester():
        """Test creating a curriculum semester"""

        curriculum_semester = client.post(
            f"/universities/{test_user.university_id}/departments/{test_user.department_id}/curriculums/{test_user.curriculum_id}/semesters",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={"number": 1,},
        )

        assert curriculum_semester.status_code == 201
        assert curriculum_semester.json()["message"] == "Curriculum semester created"
        test_user.curriculum_semester_id = curriculum_semester.json()["_id"]

    def test_get_curriculum_semester():
        """Test getting a curriculum semester"""

        curriculum_semester = client.get(
            f"/universities/{test_user.university_id}/departments/{test_user.department_id}/curriculums/{test_user.curriculum_id}/semesters/{test_user.curriculum_semester_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )

        assert curriculum_semester.status_code == 200
        assert curriculum_semester.json() == {
            "_id": test_user.curriculum_semester_id,
            "number": 1,
            "lessons": [],
        }

    def test_get_curriculum_semester_with_default_user():
        """Test getting a curriculum semester with default user"""

        curriculum_semester = client.get(
            f"/universities/{test_user.university_id}/departments/{test_user.department_id}/curriculums/{test_user.curriculum_id}/semesters/{test_user.curriculum_semester_id}",
            headers={"Authorization": f"Bearer {default_user.token}"},
        )

        assert curriculum_semester.status_code == 200
        assert curriculum_semester.json() == {
            "_id": test_user.curriculum_semester_id,
            "number": 1,
            "lessons": [],
        }

    def test_get_curriculum_semester_with_invalid_semester_id():
        """Test getting a curriculum semester with invalid semester id"""

        curriculum_semester = client.get(
            f"/universities/{test_user.university_id}/departments/{test_user.department_id}/curriculums/{test_user.curriculum_id}/semesters/invalid_semester_id",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )

        assert curriculum_semester.status_code == 404
        assert curriculum_semester.json()["message"] == "Curriculum semester not found"

    def test_create_same_curriculum_semester():
        """Test creating a curriculum semester with the same name"""

        curriculum_semester = client.post(
            f"/universities/{test_user.university_id}/departments/{test_user.department_id}/curriculums/{test_user.curriculum_id}/semesters",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={"number": 1,},
        )

        assert curriculum_semester.status_code == 409
        assert (
            curriculum_semester.json()["message"]
            == "Curriculum semester already exists"
        )

    def test_create_curriculum_semester_with_invalid_university_id():
        """Test creating a curriculum semester with an invalid university id"""

        university_id = "non_exists_university_id"
        curriculum_semester = client.post(
            f"/universities/{university_id}/departments/{test_user.department_id}/curriculums/{test_user.curriculum_id}/semesters",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={"number": 1,},
        )

        assert curriculum_semester.status_code == 404
        assert (
            curriculum_semester.json()["message"]
            == "University or department or curriculum not found"
        )

    def test_create_curriculum_semester_with_invalid_department_id():
        """Test creating a curriculum semester with an invalid department id"""

        department_id = "non_exists_department_id"
        curriculum_semester = client.post(
            f"/universities/{test_user.university_id}/departments/{department_id}/curriculums/{test_user.curriculum_id}/semesters",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={"number": 1,},
        )

        assert curriculum_semester.status_code == 404
        assert (
            curriculum_semester.json()["message"]
            == "University or department or curriculum not found"
        )

    def test_create_curriculum_semester_with_invalid_curriculum_id():
        """Test creating a curriculum semester with an invalid university id"""

        curriculum_id = "non_exists_curriculum_id"
        curriculum_semester = client.post(
            f"/universities/{test_user.university_id}/departments/{test_user.department_id}/curriculums/{curriculum_id}/semesters",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={"number": 1,},
        )

        assert curriculum_semester.status_code == 404
        assert (
            curriculum_semester.json()["message"]
            == "University or department or curriculum not found"
        )

    def test_create_curriculum_semester_with_default_user():
        """Test creating a curriculum semester with a default user"""

        curriculum_semester = client.post(
            f"/universities/{test_user.university_id}/departments/{test_user.department_id}/curriculums/{test_user.curriculum_id}/semesters",
            headers={"Authorization": f"Bearer {default_user.token}"},
            json={"number": 1,},
        )

        assert curriculum_semester.status_code == 403
        assert curriculum_semester.json()["message"] == "No right to access"

    def test_list_curriculum_semesters():
        """Test listing curriculum semesters"""

        curriculum_semesters = client.get(
            f"/universities/{test_user.university_id}/departments/{test_user.department_id}/curriculums/{test_user.curriculum_id}/semesters",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )

        assert curriculum_semesters.status_code == 200
        assert curriculum_semesters.json() == [
            {"_id": test_user.curriculum_semester_id, "number": 1, "lessons": [],}
        ]

    def test_list_curriculum_semesters_with_default_user():
        """Test listing curriculum semesters with a default user"""

        curriculum_semesters = client.get(
            f"/universities/{test_user.university_id}/departments/{test_user.department_id}/curriculums/{test_user.curriculum_id}/semesters",
            headers={"Authorization": f"Bearer {default_user.token}"},
        )

        assert curriculum_semesters.status_code == 200
        assert curriculum_semesters.json() == [
            {"_id": test_user.curriculum_semester_id, "number": 1, "lessons": [],}
        ]

    def test_list_curriculum_semesters_with_invalid_university_id():
        """Test listing curriculum semesters with an invalid university id"""

        university_id = "non_exists_university_id"
        curriculum_semesters = client.get(
            f"/universities/{university_id}/departments/{test_user.department_id}/curriculums/{test_user.curriculum_id}/semesters",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )

        assert curriculum_semesters.status_code == 404
        assert curriculum_semesters.json()["message"] == "Curriculum semester not found"

    def test_list_curriculum_semesters_with_invalid_department_id():
        """Test listing curriculum semesters with an invalid department id"""

        department_id = "non_exists_department_id"
        curriculum_semesters = client.get(
            f"/universities/{test_user.university_id}/departments/{department_id}/curriculums/{test_user.curriculum_id}/semesters",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )

        assert curriculum_semesters.status_code == 404
        assert curriculum_semesters.json()["message"] == "Curriculum semester not found"

    def test_list_curriculum_semesters_with_invalid_curriculum_id():
        """Test listing curriculum semesters with an invalid curriculum id"""

        curriculum_id = "non_exists_curriculum_id"
        curriculum_semesters = client.get(
            f"/universities/{test_user.university_id}/departments/{test_user.department_id}/curriculums/{curriculum_id}/semesters",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )

        assert curriculum_semesters.status_code == 404
        assert curriculum_semesters.json()["message"] == "Curriculum semester not found"

    def test_update_curriculum_semester():
        """Test updating a curriculum semester"""

        curriculum_semester = client.put(
            f"/universities/{test_user.university_id}/departments/{test_user.department_id}/curriculums/{test_user.curriculum_id}/semesters/{test_user.curriculum_semester_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={"number": 2,},
        )

        assert curriculum_semester.status_code == 200
        assert curriculum_semester.json()["message"] == "Curriculum semester updated"

    def test_create_second_curriculum_semester():
        """Test creating a second curriculum semester"""

        curriculum_semester = client.post(
            f"/universities/{test_user.university_id}/departments/{test_user.department_id}/curriculums/{test_user.curriculum_id}/semesters",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={"number": 3,},
        )

        assert curriculum_semester.status_code == 201
        assert curriculum_semester.json()["message"] == "Curriculum semester created"
        test_user.second_curriculum_semester_id = curriculum_semester.json()["_id"]

    def test_list_curriculum_semesters_with_two_semester():
        """Test listing curriculum semesters with two semesters"""

        curriculum_semesters = client.get(
            f"/universities/{test_user.university_id}/departments/{test_user.department_id}/curriculums/{test_user.curriculum_id}/semesters",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )

        assert curriculum_semesters.status_code == 200
        assert curriculum_semesters.json() == [
            {"_id": test_user.curriculum_semester_id, "number": 2, "lessons": [],},
            {
                "_id": test_user.second_curriculum_semester_id,
                "number": 3,
                "lessons": [],
            },
        ]

    def test_update_curriculum_semester_with_exists_semester_name():
        """Test updating a curriculum semester with an exists semester code"""

        curriculum_semester = client.put(
            f"/universities/{test_user.university_id}/departments/{test_user.department_id}/curriculums/{test_user.curriculum_id}/semesters/{test_user.curriculum_semester_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={"number": 3,},
        )

        assert curriculum_semester.status_code == 400
        assert (
            curriculum_semester.json()["message"]
            == "Curriculum semester already exists"
        )

    def test_update_curriculum_semester_with_default_user():
        """Test updating a curriculum semester with the default user"""

        curriculum_semester = client.put(
            f"/universities/{test_user.university_id}/departments/{test_user.department_id}/curriculums/{test_user.curriculum_id}/semesters/{test_user.curriculum_semester_id}",
            headers={"Authorization": f"Bearer {default_user.token}"},
            json={"number": 4,},
        )

        assert curriculum_semester.status_code == 403
        assert curriculum_semester.json()["message"] == "No right to access"

    def test_delete_curriculum_semester():
        """Test deleting a curriculum semester"""

        curriculum_semester = client.delete(
            f"/universities/{test_user.university_id}/departments/{test_user.department_id}/curriculums/{test_user.curriculum_id}/semesters/{test_user.curriculum_semester_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )

        assert curriculum_semester.status_code == 200
        assert curriculum_semester.json()["message"] == "Curriculum semester deleted"

    def test_delete_same_curriculum_semester():
        """Test deleting a curriculum semester"""

        curriculum_semester = client.delete(
            f"/universities/{test_user.university_id}/departments/{test_user.department_id}/curriculums/{test_user.curriculum_id}/semesters/{test_user.curriculum_semester_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )

        assert curriculum_semester.status_code == 404
        assert curriculum_semester.json()["message"] == "Curriculum semester not found"

    def test_delete_same_curriculum_semester_with_default_user():
        """Test deleting a curriculum semester with the default user"""

        curriculum_semester = client.delete(
            f"/universities/{test_user.university_id}/departments/{test_user.department_id}/curriculums/{test_user.curriculum_id}/semesters/{test_user.curriculum_semester_id}",
            headers={"Authorization": f"Bearer {default_user.token}"},
        )

        assert curriculum_semester.status_code == 403
        assert curriculum_semester.json()["message"] == "No right to access"

    def test_delete_used_university():
        """Test deleting a university that has been used"""

        university = client.delete(
            f"/universities/{test_user.university_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )

        assert university.status_code == 200
        assert university.json()["message"] == "University deleted"
