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

    test_user = TestUser()
    default_user = TestUser()

    def test_prepare_test_data():
        admin_token = login_admin_user(client, settings)
        test_user.user_id, test_user.token = create_professor_and_login(
            client,
            admin_token,
            "professor_uni_curriculum_routers@test.com",
            "test",
            "professor_first_name",
            "professor_last_name",
        )
        test_user.university_id = create_university(
            client, test_user.token, "Test University for Uni Curriculum Routers"
        )
        test_user.department_id = create_department(
            client,
            test_user.token,
            test_user.university_id,
            "Test Department for Uni Lesson Routers",
        )
        default_user.user_id, default_user.token = create_user_and_login(
            client,
            "default_user_uni_curriculum@test.com",
            "test",
            "default_first_name",
            "default_last_name",
        )

    def test_create_department_curriculum():
        """Create department curriculum"""

        response = client.post(
            f"/universities/{test_user.university_id}/departments/{test_user.department_id}/curriculums",
            json={
                "name": "Test Department Curriculum",
                "start_year": 2020,
                "end_year": 2040,
            },
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert response.status_code == 201
        assert response.json()["message"] == "Department curriculum created"
        test_user.curriculum_id = response.json()["_id"]

    def test_create_department_curriculum_that_already_exists():
        """Create department curriculum that already exists"""

        response = client.post(
            f"/universities/{test_user.university_id}/departments/{test_user.department_id}/curriculums",
            json={
                "name": "Test Department Curriculum",
                "start_year": 2020,
                "end_year": 2040,
            },
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert response.status_code == 409
        assert (
            response.json()["message"]
            == "University department curriculum already exists"
        )

    def test_create_department_curriculum_with_invalid_university_id():
        """Create department curriculum with invalid university id"""

        response = client.post(
            f"/universities/{default_user.university_id}/departments/{test_user.department_id}/curriculums",
            json={
                "name": "Test Department Curriculum",
                "start_year": 2020,
                "end_year": 2040,
            },
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert response.status_code == 404
        assert response.json()["message"] == "University or department not found"

    def test_create_department_curriculum_with_invalid_department_id():
        """Create department curriculum with invalid department id"""

        response = client.post(
            f"/universities/{test_user.university_id}/departments/{default_user.department_id}/curriculums",
            json={
                "name": "Test Department Curriculum",
                "start_year": 2020,
                "end_year": 2040,
            },
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert response.status_code == 404
        assert response.json()["message"] == "University or department not found"

    def test_create_department_curriculum_with_default_user():
        """Create department curriculum with invalid token"""

        response = client.post(
            f"/universities/{test_user.university_id}/departments/{test_user.department_id}/curriculums",
            json={
                "name": "Test Department Curriculum",
                "start_year": 2020,
                "end_year": 2040,
            },
            headers={"Authorization": f"Bearer {default_user.token}"},
        )
        assert response.status_code == 403
        assert response.json()["message"] == "No right to access"

    def test_create_department_curriculum_without_token():
        """Create department curriculum without token"""

        response = client.post(
            f"/universities/{test_user.university_id}/departments/{test_user.department_id}/curriculums",
            json={
                "name": "Test Department Curriculum",
                "start_year": 2020,
                "end_year": 2040,
            },
        )
        assert response.status_code == 401

    def test_create_department_curriculum_without_name():
        """Create department curriculum without name"""

        response = client.post(
            f"/universities/{test_user.university_id}/departments/{test_user.department_id}/curriculums",
            json={"name": "", "start_year": 2020, "end_year": 2040,},
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert response.status_code == 422

    def test_list_department_curriculums():
        """List department curriculums"""

        response = client.get(
            f"/universities/{test_user.university_id}/departments/{test_user.department_id}/curriculums",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert response.status_code == 200
        assert response.json()[0]["name"] == "Test Department Curriculum"

    def test_list_department_curriculums_with_invalid_university_id():
        """List department curriculums with invalid university id"""

        response = client.get(
            f"/universities/{default_user.university_id}/departments/{test_user.department_id}/curriculums",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert response.status_code == 404
        assert response.json()["message"] == "University or department not found"

    def test_list_department_curriculums_with_invalid_department_id():
        """List department curriculums with invalid department id"""

        response = client.get(
            f"/universities/{test_user.university_id}/departments/{default_user.department_id}/curriculums",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert response.status_code == 404
        assert response.json()["message"] == "University or department not found"

    def test_show_department_curriculum():
        """Show department curriculum"""

        response = client.get(
            f"/universities/{test_user.university_id}/departments/{test_user.department_id}/curriculums/{test_user.curriculum_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert response.status_code == 200
        assert response.json()["name"] == "Test Department Curriculum"

    def test_update_department_curriculum():
        """Update department curriculum"""

        response = client.put(
            f"/universities/{test_user.university_id}/departments/{test_user.department_id}/curriculums/{test_user.curriculum_id}",
            json={"name": "updated_name", "start_year": 2010, "end_year": 2022,},
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert response.status_code == 200
        assert response.json()["message"] == "Curriculum updated"

    def test_update_department_curriculum_with_invalid_university_id():
        """Update department curriculum with invalid university id"""

        response = client.put(
            f"/universities/{default_user.university_id}/departments/{test_user.department_id}/curriculums/{test_user.curriculum_id}",
            json={
                "name": "Test Department Curriculum Updated",
                "start_year": 2020,
                "end_year": 2040,
            },
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert response.status_code == 404
        assert (
            response.json()["message"] == "University department curriculum not found"
        )

    def test_update_departmen_curriculum_with_default_user():
        """Update department curriculum with invalid token"""

        response = client.put(
            f"/universities/{test_user.university_id}/departments/{test_user.department_id}/curriculums/{test_user.curriculum_id}",
            json={
                "name": "Test Department Curriculum Updated",
                "start_year": 2020,
                "end_year": 2040,
            },
            headers={"Authorization": f"Bearer {default_user.token}"},
        )
        assert response.status_code == 403
        assert response.json()["message"] == "No right to access"

    def test_delete_department_curriculum():
        """Delete department curriculum"""

        response = client.delete(
            f"/universities/{test_user.university_id}/departments/{test_user.department_id}/curriculums/{test_user.curriculum_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert response.status_code == 200
        assert response.json()["message"] == "Curriculum deleted"

    def test_delete_department_curriculum_with_default_user():
        """Delete department curriculum without token"""

        response = client.delete(
            f"/universities/{test_user.university_id}/departments/{test_user.department_id}/curriculums/{test_user.curriculum_id}",
            headers={"Authorization": f"Bearer {default_user.token}",},
        )
        assert response.status_code == 403
        assert response.json()["message"] == "No right to access"

    def test_delete_used_university():
        """Test deleting a university that has been used"""

        university = client.delete(
            f"/universities/{test_user.university_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )

        assert university.status_code == 200
        assert university.json()["message"] == "University deleted"
