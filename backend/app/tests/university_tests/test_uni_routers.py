from app.main import app, settings
from app.tests.create_requirements import (
    create_professor_and_login,
    create_user_and_login,
    login_admin_user,
)
from fastapi.testclient import TestClient

with TestClient(app) as client:

    class TestUser:
        user_id = None
        token = None
        university_id = None
        second_university_id = None
        semester_id = None
        second_semester_id = None

    test_user = TestUser()
    default_user = TestUser()

    def test_prepare_test_data():
        admin_token = login_admin_user(client, settings)
        test_user.user_id, test_user.token = create_professor_and_login(
            client,
            admin_token,
            "professor_uni_routers@test.com",
            "test",
            "professor_first_name",
            "professor_test_last_name",
        )

        default_user.user_id, default_user.token = create_user_and_login(
            client,
            "default_user@test.com",
            "test",
            "default_first_name",
            "default_last_name",
        )

    def test_create_university():
        """Test creating university"""

        university = client.post(
            "/universities",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={
                "name": "University of Test",
                "website": "test.com",
                "country": "USA",
                "city": "Los Angeles",
                "address": "123 Main Street",
                "phone": "555-555-5555",
                "email": "info@test.com",
                "zip_code": "90210",
                "description": "Test University Description",
                "logo": "test_logo.png",
                "cover_photo": "test_cover_photo.png",
            },
        )
        assert university.status_code == 201
        assert university.json()["message"] == "University created"
        test_user.university_id = university.json()["_id"]

    def test_get_university():
        """Test getting university"""

        university = client.get(
            f"/universities/{test_user.university_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert university.status_code == 200
        assert university.json() == {
            "_id": test_user.university_id,
            "name": "University of Test",
            "website": "test.com",
            "country": "USA",
            "city": "Los Angeles",
            "address": "123 Main Street",
            "phone": "555-555-5555",
            "email": "info@test.com",
            "zip_code": "90210",
            "description": "Test University Description",
            "logo": "test_logo.png",
            "cover_photo": "test_cover_photo.png",
            "current_semester_id": "null",
        }

    def test_get_university_with_invalid_university_id():
        """Test getting university with invalid university id"""

        university_id = "non_exists_university_id"
        university = client.get(
            f"/universities/{university_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert university.status_code == 404
        assert university.json() == {"message": "University not found"}

    def test_create_same_university():
        """Test creating same university"""

        university = client.post(
            "/universities",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={
                "name": "University of Test",
                "website": "test.com",
                "country": "USA",
                "city": "Los Angeles",
                "address": "123 Main Street",
                "phone": "555-555-5555",
                "email": "info@test.com",
                "zip_code": "90210",
                "description": "Test University Description",
                "logo": "test_logo.png",
                "cover_photo": "test_cover_photo.png",
            },
        )
        assert university.status_code == 409
        assert university.json()["message"] == "University already exists"

    def test_create_university_with_default_user():
        """Test creating university with default user"""

        university = client.post(
            "/universities",
            headers={"Authorization": f"Bearer {default_user.token}"},
            json={
                "name": "University of Test 2",
                "website": "test.com",
                "country": "USA",
                "city": "Los Angeles",
                "address": "123 Main Street",
                "phone": "555-555-5555",
                "email": "info@test.com",
                "zip_code": "90210",
                "description": "Test University Description",
                "logo": "test_logo.png",
                "cover_photo": "test_cover_photo.png",
            },
        )
        assert university.status_code == 403
        assert university.json()["message"] == "No right to access"

    def test_update_university():
        """Test updating university"""

        university = client.put(
            f"/universities/{test_user.university_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={
                "name": "University of Test 3",
                "website": "test.com",
                "country": "USA",
                "city": "Los Angeles",
                "address": "123 Main Street",
                "phone": "555-555-5555",
                "email": "info@test.com",
                "zip_code": "90210",
                "description": "Test University Description",
                "logo": "test_logo.png",
                "cover_photo": "test_cover_photo.png",
            },
        )
        assert university.status_code == 200
        assert university.json()["message"] == "University updated"

    def test_update_university_with_default_user():
        """Test updating university name with default user"""

        university = client.put(
            f"/universities/{test_user.university_id}",
            headers={"Authorization": f"Bearer {default_user.token}"},
            json={
                "name": "University of Test 4",
                "website": "test.com",
                "country": "USA",
                "city": "Los Angeles",
                "address": "123 Main Street",
                "phone": "555-555-5555",
                "email": "info@test.com",
                "zip_code": "90210",
                "description": "Test University Description",
                "logo": "test_logo.png",
                "cover_photo": "test_cover_photo.png",
            },
        )
        assert university.status_code == 403
        assert university.json()["message"] == "No right to access"

    def test_update_university_with_invalid_id():
        """Test updating university name with invalid id"""

        university_id = "non_exists_university_id"
        university = client.put(
            f"/universities/{university_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={
                "name": "University of Test 5",
                "website": "test.com",
                "country": "USA",
                "city": "Los Angeles",
                "address": "123 Main Street",
                "phone": "555-555-5555",
                "email": "info@test.com",
                "zip_code": "90210",
                "description": "Test University Description",
                "logo": "test_logo.png",
                "cover_photo": "test_cover_photo.png",
            },
        )
        assert university.status_code == 404
        assert university.json()["message"] == "University could not be updated"

    def test_list_universities():
        """Test listing universities"""

        university = client.get(
            "/universities", headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert university.status_code == 200
        assert university.json() == [
            {
                "_id": test_user.university_id,
                "name": "University of Test 3",
                "website": "test.com",
                "country": "USA",
                "city": "Los Angeles",
                "address": "123 Main Street",
                "phone": "555-555-5555",
                "email": "info@test.com",
                "zip_code": "90210",
                "description": "Test University Description",
                "logo": "test_logo.png",
                "cover_photo": "test_cover_photo.png",
                "current_semester_id": "null",
            }
        ]

    def test_list_universities_with_default_user():
        """Test listing universities with default user"""

        university = client.get(
            "/universities", headers={"Authorization": f"Bearer {default_user.token}"},
        )
        assert university.status_code == 200
        assert university.json() == [
            {
                "_id": test_user.university_id,
                "name": "University of Test 3",
                "website": "test.com",
                "country": "USA",
                "city": "Los Angeles",
                "address": "123 Main Street",
                "phone": "555-555-5555",
                "email": "info@test.com",
                "zip_code": "90210",
                "description": "Test University Description",
                "logo": "test_logo.png",
                "cover_photo": "test_cover_photo.png",
                "current_semester_id": "null",
            }
        ]

    def test_create_second_university():
        """Test creating second university"""

        university = client.post(
            "/universities",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={
                "name": "University of Test 4",
                "website": "test.com",
                "country": "USA",
                "city": "Los Angeles",
                "address": "123 Main Street",
                "phone": "555-555-5555",
                "email": "info@test.com",
                "zip_code": "90210",
                "description": "Test University Description",
                "logo": "test_logo.png",
                "cover_photo": "test_cover_photo.png",
            },
        )
        assert university.status_code == 201
        assert university.json()["message"] == "University created"
        test_user.second_university_id = university.json()["_id"]

    def test_list_lessons_with_two_universities():
        """Test listing lessons with two universities"""

        universities = client.get(
            "/universities", headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert universities.status_code == 200
        assert universities.json() == [
            {
                "_id": test_user.university_id,
                "name": "University of Test 3",
                "website": "test.com",
                "country": "USA",
                "city": "Los Angeles",
                "address": "123 Main Street",
                "phone": "555-555-5555",
                "email": "info@test.com",
                "zip_code": "90210",
                "description": "Test University Description",
                "logo": "test_logo.png",
                "cover_photo": "test_cover_photo.png",
                "current_semester_id": "null",
            },
            {
                "_id": test_user.second_university_id,
                "name": "University of Test 4",
                "website": "test.com",
                "country": "USA",
                "city": "Los Angeles",
                "address": "123 Main Street",
                "phone": "555-555-5555",
                "email": "info@test.com",
                "zip_code": "90210",
                "description": "Test University Description",
                "logo": "test_logo.png",
                "cover_photo": "test_cover_photo.png",
                "current_semester_id": "null",
            },
        ]

    def test_get_current_semester_when_there_is_no_such_one():
        """Test getting current semester when there is no such one"""

        semester = client.get(
            f"/universities/{test_user.university_id}/current-semester",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert semester.status_code == 404
        assert semester.json()["message"] == "University current semester not found"

    def test_create_semester():
        """Create university semester"""

        semester = client.post(
            f"/universities/{test_user.university_id}/semesters",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={"name": "Test Semester"},
        )

        assert semester.status_code == 201
        assert semester.json()["message"] == "University semester created"
        test_user.semester_id = semester.json()["_id"]

    def test_get_current_semester():
        """Test getting current semester"""

        semester = client.get(
            f"/universities/{test_user.university_id}/current-semester",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert semester.status_code == 200
        assert semester.json() == {
            "_id": test_user.semester_id,
            "name": "Test Semester",
            "lessons": [],
        }

    def test_get_current_semester_wiith_invalid_university_id():
        """Test getting current semester with invalid university id"""

        university_id = "non_exists_university_id"
        semester = client.get(
            f"/universities/{university_id}/current-semester",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert semester.status_code == 404
        assert semester.json()["message"] == "University current semester not found"

    def test_create_second_semester():
        """Test creating second semester"""

        semester = client.post(
            f"/universities/{test_user.university_id}/semesters",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={"name": "Test Semester 2"},
        )

        assert semester.status_code == 201
        assert semester.json()["message"] == "University semester created"
        test_user.second_semester_id = semester.json()["_id"]

    def test_update_current_semester():
        """Test updating current semester"""

        semester = client.put(
            f"/universities/{test_user.university_id}/current-semester",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={"current_semester_id": test_user.second_semester_id},
        )

        assert semester.status_code == 200
        assert semester.json()["message"] == "University current semester updated"

    def test_get_updated_university():
        """Test getting updated university"""

        university = client.get(
            f"/universities/{test_user.university_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert university.status_code == 200
        assert university.json() == {
            "_id": test_user.university_id,
            "name": "University of Test 3",
            "website": "test.com",
            "country": "USA",
            "city": "Los Angeles",
            "address": "123 Main Street",
            "phone": "555-555-5555",
            "email": "info@test.com",
            "zip_code": "90210",
            "description": "Test University Description",
            "logo": "test_logo.png",
            "cover_photo": "test_cover_photo.png",
            "current_semester_id": test_user.second_semester_id,
        }

    def test_update_current_semester_with_default_user():
        """Test updating current semester with default user"""

        semester = client.put(
            f"/universities/{test_user.university_id}/current-semester",
            headers={"Authorization": f"Bearer {default_user.token}"},
            json={"current_semester_id": test_user.second_semester_id},
        )

        assert semester.status_code == 403
        assert semester.json()["message"] == "No right to access"

    def test_update_current_semester_with_invalid_semester_id():
        """Test updating current semester with invalid semester id"""

        semester_id = "non_exists_semester_id"
        semester = client.put(
            f"/universities/{test_user.university_id}/current-semester",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={"current_semester_id": semester_id},
        )
        assert semester.status_code == 404
        assert (
            semester.json()["message"] == "University or given semester doesn't exist"
        )

    def test_delete_same_university_twice():
        """Test deleting same university twice"""

        university = client.delete(
            f"/universities/{test_user.university_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert university.status_code == 200
        assert university.json()["message"] == "University deleted"

        university = client.delete(
            f"/universities/{test_user.university_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert university.status_code == 404
        assert university.json()["message"] == "University not found"

    def test_delete_university_with_invalid_university_id():
        """Test deleting university with invalid university id"""

        university_id = "non_exists_university_id"
        university = client.delete(
            f"/universities/{university_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert university.status_code == 404
        assert university.json()["message"] == "University not found"

    def test_delete_uni_with_default_user():
        """Test deleting university with default user"""

        university = client.delete(
            f"/universities/{test_user.university_id}",
            headers={"Authorization": f"Bearer {default_user.token}"},
        )
        assert university.status_code == 403
        assert university.json()["message"] == "No right to access"
