# Create tests for uni_department_routers.py
# Path: backend/app/tests/university_tests/test_uni_department_routers.py

from app.main import app, settings
from app.tests.create_requirements import (
    create_professor_and_login,
    create_user_and_login,
    login_admin_user,
    create_university,
    create_department,
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
            "professor_uni_department_routers@test.com",
            "test",
            "professor_first_name",
            "professor_last_name",
        )
        test_user.university_id = create_university(
            client, test_user.token, "Test University"
        )
        test_user.department_id = create_department(
            client, test_user.token, test_user.university_id, "Test Department",
        )
        default_user.user_id, default_user.token = create_user_and_login(
            client,
            "default_user_uni_department@test.com",
            "test",
            "default_first_name",
            "default_last_name",
        )

    def test_create_university_department_that_already_exists():
        response = client.post(
            f"universities/{test_user.university_id}/departments",
            json={"name": "Test Department"},
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        print(response.json())
        assert response.status_code == 409
        assert response.json()["message"] == "University department already exists"

    def test_create_second_university_department():
        response = client.post(
            f"universities/{test_user.university_id}/departments",
            json={"name": "Test Department 2"},
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert response.status_code == 201
        assert response.json()["message"] == "University department created"

    def test_create_university_department_with_invalid_university_id():
        response = client.post(
            f"universities/{default_user.university_id}/departments",
            json={"name": "Test Department for Uni Department Routers"},
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert response.status_code == 404
        assert response.json()["message"] == "University not found"

    def test_create_university_department_with_invalid_token():
        response = client.post(
            f"universities/{test_user.university_id}/departments",
            json={"name": "Test Department for Uni Department Routers"},
            headers={"Authorization": f"Bearer {default_user.token}"},
        )
        assert response.status_code == 403
        assert response.json()["message"] == "No right to access"

    def test_list_university_departments():
        response = client.get(
            f"universities/{test_user.university_id}/departments",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert response.status_code == 200
        assert len(response.json()) == 2

    def test_list_university_departments_with_invalid_university_id():
        response = client.get(
            f"universities/{default_user.university_id}/departments",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert response.status_code == 404
        assert response.json()["message"] == "University not found"

    def test_list_university_departments_with_invalid_token():
        response = client.get(
            f"universities/{test_user.university_id}/departments",
            headers={"Authorization": f"Bearer {default_user.token}"},
        )
        assert response.status_code == 200

    def test_show_university_department():
        response = client.get(
            f"universities/{test_user.university_id}/departments/{test_user.department_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert response.status_code == 200
        assert response.json()["name"] == "Test Department"

    def test_show_university_department_with_invalid_university_id():
        response = client.get(
            f"universities/{default_user.university_id}/departments/{test_user.department_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert response.status_code == 404
        assert response.json()["message"] == "University or department not found"

    def test_show_university_department_with_invalid_department_id():
        response = client.get(
            f"universities/{test_user.university_id}/departments/{default_user.department_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert response.status_code == 404
        assert response.json()["message"] == "University or department not found"

    def test_update_university_department():
        response = client.put(
            f"universities/{test_user.university_id}/departments/{test_user.department_id}",
            json={"name": "Test Department Updated"},
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert response.status_code == 200
        assert response.json()["message"] == "University department updated"

    def test_update_university_department_with_department_already_exists():
        response = client.put(
            f"universities/{test_user.university_id}/departments/{test_user.department_id}",
            json={"name": "Test Department 2"},
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert response.status_code == 400
        assert response.json()["message"] == "University department already exists"

    def test_update_university_department_with_invalid_university_id():
        response = client.put(
            f"universities/{default_user.university_id}/departments/{test_user.department_id}",
            json={"name": "Test Department for Uni Department Routers"},
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert response.status_code == 404
        assert response.json()["message"] == "University or department not found"

    def test_update_university_department_with_invalid_department_id():
        response = client.put(
            f"universities/{test_user.university_id}/departments/{default_user.department_id}",
            json={"name": "Test Department for Uni Department Routers"},
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert response.status_code == 404
        assert response.json()["message"] == "University or department not found"

    def test_update_university_department_with_invalid_token():
        response = client.put(
            f"universities/{test_user.university_id}/departments/{test_user.department_id}",
            json={"name": "Test Department for Uni Department Routers"},
            headers={"Authorization": f"Bearer {default_user.token}"},
        )
        assert response.status_code == 403
        assert response.json()["message"] == "No right to access"

    def test_update_university_department_with_invalid_input():
        response = client.put(
            f"universities/{test_user.university_id}/departments/{test_user.department_id}",
            # the name should be longer than 1 character
            json={"name": "A"},
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert response.status_code == 422
        # TODO: For invalid inputs, we may add more tests and change the model to have a custom validation

    def test_update_university_department_with_invalid_input_2():
        response = client.put(
            f"universities/{test_user.university_id}/departments/{test_user.department_id}",
            # the name should be less than 100 characters
            json={"name": "A" * 101},
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert response.status_code == 422

    def test_delete_university_department():
        response = client.delete(
            f"universities/{test_user.university_id}/departments/{test_user.department_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert response.status_code == 200
        assert response.json()["message"] == "University department deleted"

    def test_delete_university_department_with_invalid_university_id():
        response = client.delete(
            f"universities/{default_user.university_id}/departments/{test_user.department_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert response.status_code == 404
        assert response.json()["message"] == "University or department not found"

    def test_delete_university_department_with_invalid_department_id():
        response = client.delete(
            f"universities/{test_user.university_id}/departments/{default_user.department_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert response.status_code == 404
        assert response.json()["message"] == "University or department not found"

    def test_delete_university_department_with_invalid_token():
        response = client.delete(
            f"universities/{test_user.university_id}/departments/{test_user.department_id}",
            headers={"Authorization": f"Bearer {default_user.token}"},
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
