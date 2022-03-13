from app.main import app, settings
from app.tests.create_requirements import (
    create_professor_and_login,
    create_user_and_login,
    login_admin_user,
    create_university,
)
from fastapi.testclient import TestClient

with TestClient(app) as client:

    class TestUser:
        user_id = None
        token = None
        university_id = None
        semester_id = None
        second_semester_id = None
        lesson_id = None
        second_lesson_id = None

    test_user = TestUser()
    default_user = TestUser()

    def test_prepare_test_data():
        admin_token = login_admin_user(client, settings)
        test_user.user_id, test_user.token = create_professor_and_login(
            client,
            admin_token,
            "professor_uni_semester_routers@test.com",
            "test",
            "professor_first_name",
            "professor_test_last_name",
        )
        test_user.university_id = create_university(
            client, test_user.token, "Test University for Uni Semester Routers"
        )

        default_user.user_id, default_user.token = create_user_and_login(
            client,
            "default_user_uni_semester@test.com",
            "test",
            "default_user_first_name",
            "default_user_last_name",
        )

    def test_create_university_semester():
        """Test creating semester"""

        semester = client.post(
            f"/universities/{test_user.university_id}/semesters",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={"name": "Test University Semester",},
        )
        assert semester.status_code == 201
        assert semester.json()["message"] == "University semester created"
        test_user.semester_id = semester.json()["_id"]

    def test_get_university_semester():
        """Test getting semester"""

        semester = client.get(
            f"/universities/{test_user.university_id}/semesters/{test_user.semester_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        print(semester.json())
        assert semester.status_code == 200

        assert semester.json() == {
            "_id": test_user.semester_id,
            "name": "Test University Semester",
            "lessons": [],
        }

    def test_get_university_semester_with_invalid_semester_id():
        """Test getting university semester with invalid semester id"""

        semester_id = "non_exists_semester_id"
        semester = client.get(
            f"/universities/{test_user.university_id}/semesters/{semester_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert semester.status_code == 404
        assert semester.json() == {"message": "University not found"}

    def test_get_university_semester_with_invalid_university_id():
        """Test getting university semester with invalid university id"""

        university_id = "non_exists_university_id"
        semester = client.get(
            f"/universities/{university_id}/semesters/{test_user.semester_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert semester.status_code == 404
        assert semester.json() == {"message": "University not found"}

    def create_same_university_semester():
        """Test creating same university semester with the same semester name"""

        semester = client.post(
            f"/universities/{test_user.university_id}/semesters",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={"name": "Test University Semester",},
        )
        assert semester.status_code == 409
        assert (
            semester.json()["message"] == "University semester section already exists"
        )

    def test_create_university_semester_with_invalid_university_id():
        """Test creating university semester with invalid university id"""

        university_id = "non_exists_university_id"
        semester = client.post(
            f"/universities/{university_id}/semesters",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={"name": "Test University Semester",},
        )
        assert semester.status_code == 404
        assert semester.json()["message"] == "University not found"

    def create_university_semester_with_default_user():
        """Test creating university semester with default user"""

        semester = client.post(
            f"/universities/{test_user.university_id}/semesters",
            headers={"Authorization": f"Bearer {default_user.token}"},
            json={"name": "Test University Semester",},
        )
        assert semester.status_code == 403
        assert semester.json()["message"] == "No right to access"

    def test_list_semesters_of_a_university():
        """Test semesters of a university"""

        semesters = client.get(
            f"/universities/{test_user.university_id}/semesters",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert semesters.status_code == 200
        assert semesters.json() == [
            {"_id": test_user.semester_id, "name": "Test University Semester",}
        ]

    def test_list_semesters_of_a_university_with_invalid_university_id():
        """Test listing semesters of a university with invalid university id"""

        university_id = "non_exists_university_id"
        semesters = client.get(
            f"/universities/{university_id}/semesters",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert semesters.status_code == 404
        assert semesters.json()["message"] == "University not found"

    def test_list_semesters_of_a_university_with_default_user():
        """Test listing semesters of a university with default user"""

        semesters = client.get(
            f"/universities/{test_user.university_id}/semesters",
            headers={"Authorization": f"Bearer {default_user.token}"},
        )
        assert semesters.status_code == 200
        assert semesters.json() == [
            {"_id": test_user.semester_id, "name": "Test University Semester",}
        ]

    def test_create_second_university_semester():
        """Test creating second university semester"""

        semester = client.post(
            f"/universities/{test_user.university_id}/semesters",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={"name": "Test University Semester 2",},
        )
        assert semester.status_code == 201
        assert semester.json()["message"] == "University semester created"
        test_user.second_semester_id = semester.json()["_id"]

    def test_list_all_semesters_of_a_university_if_more_than_one():
        """Test all semesters of a university if there exist more than one semester"""

        semesters = client.get(
            f"/universities/{test_user.university_id}/semesters",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert semesters.status_code == 200
        assert semesters.json() == [
            {"_id": test_user.semester_id, "name": "Test University Semester",},
            {
                "_id": test_user.second_semester_id,
                "name": "Test University Semester 2",
            },
        ]

    def test_update_university_semester():
        """Test updating university semester"""

        semester = client.put(
            f"/universities/{test_user.university_id}/semesters/{test_user.semester_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={"name": "Test University Semester 3",},
        )
        assert semester.status_code == 200
        assert semester.json()["message"] == "University semester updated"

    def test_update_university_semester_with_same_semester_context():
        """Test updating university semester with same semester context"""

        semester = client.put(
            f"/universities/{test_user.university_id}/semesters/{test_user.semester_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={"name": "Test University Semester 3",},
        )
        assert semester.status_code == 400
        assert semester.json()["message"] == "University semester already exists"

    def test_update_university_semester_with_default_user():
        """Test updating university semester with default user"""

        semester = client.put(
            f"/universities/{test_user.university_id}/semesters/{test_user.semester_id}",
            headers={"Authorization": f"Bearer {default_user.token}"},
            json={"name": "Test University Semester 3",},
        )
        assert semester.status_code == 403
        assert semester.json()["message"] == "No right to access"

    def test_delete_current_semester():
        """Test deleting university semester"""

        semester = client.delete(
            f"/universities/{test_user.university_id}/semesters/{test_user.semester_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert semester.status_code == 400
        assert semester.json() == {"message": "Cannot delete current semester"}

    def test_delete_semester_that_is_not_current():
        """Test deleting university semester that is not current semester"""

        semester = client.delete(
            f"/universities/{test_user.university_id}/semesters/{test_user.second_semester_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert semester.status_code == 200
        assert semester.json() == {"message": "University semester deleted"}

    def test_delete_same_university_semester():
        """Test deleting same university semester"""

        semester = client.delete(
            f"/universities/{test_user.university_id}/semesters/{test_user.second_semester_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert semester.status_code == 404
        assert semester.json() == {"message": "University semester not found"}

    def test_delete_university_semester_with_default_user():
        """Test deleting university semester with default user"""

        semester = client.delete(
            f"/universities/{test_user.university_id}/semesters/{test_user.semester_id}",
            headers={"Authorization": f"Bearer {default_user.token}"},
        )
        assert semester.status_code == 403
        assert semester.json() == {"message": "No right to access"}

    def test_delete_used_university():
        """Test deleting a university that has been used"""

        university = client.delete(
            f"/universities/{test_user.university_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )

        assert university.status_code == 200
        assert university.json()["message"] == "University deleted"
