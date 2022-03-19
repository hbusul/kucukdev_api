from app.main import app, settings
from app.tests.create_requirements import (
    create_semester,
    create_user_and_login,
    login_admin_user,
)
from fastapi.testclient import TestClient

with TestClient(app) as client:

    class TestUser:
        user_id = None
        token = None
        semester_id = None

    test_user = TestUser()

    def test_unauthorized_show_user():
        """Test trying to show user without authorization"""
        user = client.get(f"/users/{test_user.user_id}")
        assert user.status_code == 401

    # admin_token = login_admin_user(client, settings)

    test_user.user_id, test_user.token = create_user_and_login(
        client, "user_routers@test.com", "password", "name", "surname"
    )

    test_user.semester_id = create_semester(client, test_user.user_id, test_user.token)

    def test_create_user():
        """Test creating user and recreating with same email"""

        user = client.post(
            "/users",
            json={
                "email": "hey@agu.edu.tr",
                "password": "123456",
                "first_name": "name",
                "last_name": "surname",
            },
        )
        assert user.status_code == 201
        assert user.json()["message"] == "User created"

        user = client.post(
            "/users",
            json={
                "email": "hey@agu.edu.tr",
                "password": "123456",
                "first_name": "name",
                "last_name": "surname",
            },
        )
        assert user.status_code == 409
        assert user.json()["message"] == "Given email already exists"

    def test_get_current_user():
        """Test getting the current user"""
        user = client.get(
            f"/users/", headers={"Authorization": f"Bearer {test_user.token}"}
        )
        print(user.json())
        assert user.status_code == 200
        assert user.json()["_id"] == test_user.user_id

    def test_show_user():
        """Test showing user"""

        user = client.get(
            f"/users/{test_user.user_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )

        assert user.json()["_id"] == test_user.user_id

    def test_update_password():
        """Test updating password"""

        user = client.put(
            f"/users/{test_user.user_id}/change-password",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={"password": "test2"},
        )

        assert user.status_code == 200

    def test_update_user_name_with_empty_firstname():
        """Test updating username with empty username"""

        user = client.put(
            f"/users/{test_user.user_id}/change-name",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={"first_name": ""},
        )

        assert user.status_code == 422

    def test_update_user_name_with_empty_lastname():
        """Test updating username with empty username"""

        user = client.put(
            f"/users/{test_user.user_id}/change-name",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={"last_name": ""},
        )

        assert user.status_code == 422

    def test_update_user_name_with_long_firstname():
        """Test updating username with long username"""

        user = client.put(
            f"/users/{test_user.user_id}/change-name",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={"first_name": "a" * 33},
        )

        assert user.status_code == 422

    def test_update_first_name_without_token():
        """Test updating first name without token"""

        user = client.put(
            f"/users/{test_user.user_id}/change-name", json={"first_name": "test_name"},
        )

        assert user.status_code == 401

    def test_update_current_gpa():
        """Test updating current gpa"""

        user = client.put(
            f"/users/{test_user.user_id}/change-gpa",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={"current_gpa": 3.5},
        )

        assert user.status_code == 200

    def test_update_gpa_more_than_10():
        """Test updating gpa more than 10"""

        user = client.put(
            f"/users/{test_user.user_id}/change-gpa",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={"current_gpa": 11},
        )

        assert user.status_code == 422

    def test_update_gpa_without_token():
        """Test updating gpa without token"""

        user = client.put(
            f"/users/{test_user.user_id}/change-gpa", json={"current_gpa": 3.5},
        )

        assert user.status_code == 401

    def test_update_current_semester():
        """Test updating current semester"""

        user = client.put(
            f"/users/{test_user.user_id}/current-semester",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={"current_semester_id": test_user.semester_id},
        )

        assert user.status_code == 200

    def test_check_updated_semester():
        """Test updated current semester"""

        user = client.get(
            f"/users/{test_user.user_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )

        assert user.status_code == 200
        assert user.json()["current_semester_id"] == test_user.semester_id

    def test_update_current_university():
        """Test updating current university"""

        user = client.put(
            f"/users/{test_user.user_id}/current-university",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={"current_university_id": "5e9f9d9e8f8f8a0a0a0a0a0a"},
        )

        assert user.status_code == 200

    def test_check_updated_current_university():
        """Test updated current university"""

        user = client.get(
            f"/users/{test_user.user_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )

        assert user.json()["current_university_id"] == "5e9f9d9e8f8f8a0a0a0a0a0a"

    def test_update_entrance_year():
        """Test updating entrance year"""

        user = client.put(
            f"/users/{test_user.user_id}/entrance-year",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={"entrance_year": "2099"},
        )

        assert user.status_code == 200

    def test_check_updated_entrance_year():
        """Test updated entrance year"""

        user = client.get(
            f"/users/{test_user.user_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )

        assert user.json()["entrance_year"] == 2099

    def test_delete_user():
        """Test deleting user"""

        user = client.delete(
            f"/users/{test_user.user_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert user.status_code == 200

    def test_show_deleted_user():
        # Test for a user that is already deleted.
        user = client.get(
            f"/users/{test_user.user_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert user.status_code == 401
