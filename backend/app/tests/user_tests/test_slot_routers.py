from re import M
from unittest.mock import Mock
from app.main import app
from app.tests.create_requirements import create_semester, create_user_and_login
from fastapi.testclient import TestClient

with TestClient(app) as client:

    class TestUser:
        user_id = None
        token = None
        semester_id = None
        lesson_id = None
        lesson_id_list = []
        slot_id = None
        slot_id_list = []
        absence = None
        absence_list = []

    test_user = TestUser()

    def test_prepare_test_data():
        test_user.user_id, test_user.token = create_user_and_login(
            client, "slot_routers@test.com", "password", "name", "surname"
        )
        test_user.semester_id = create_semester(
            client, test_user.user_id, test_user.token
        )

    def test_create_lesson():
        """Test creating lesson"""

        lesson = client.post(
            f"/users/{test_user.user_id}/semesters/{test_user.semester_id}/lessons",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={
                "name": "Test Lesson",
                "code": "TEST",
                "instructor": "Test Instructor",
                "ects": 5,
                "absence_limit": 0,
                "grade": "3.0",
                "slots": [{"room": "B200", "day": 2, "hour": 7, "is_lab": 0},],
            },
        )

        assert lesson.status_code == 201
        assert lesson.json()["message"] == "Lesson created"
        test_user.lesson_id = lesson.json()["_id"]
        test_user.lesson_id_list.append(lesson.json()["_id"])

    def test_create_slot():
        response = client.post(
            f"/users/{test_user.user_id}/semesters/{test_user.semester_id}"
            + f"/lessons/{test_user.lesson_id}/slots",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={"room": "F0D01", "day": 1, "hour": 7, "is_lab": 0, "absences": []},
        )
        assert response.status_code == 201
        test_user.slot_id = response.json()["_id"]
        test_user.slot_id_list.append(test_user.slot_id)

    def test_create_slot_that_already_exists():
        response = client.post(
            f"/users/{test_user.user_id}/semesters/{test_user.semester_id}"
            + f"/lessons/{test_user.lesson_id}/slots",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={"room": "F0D01", "day": 1, "hour": 7, "is_lab": 0, "absences": []},
        )
        assert response.status_code == 409
        assert response.json()["message"] == "Given slot already exists"

    def test_create_slot_with_invalid_day():
        response = client.post(
            f"/users/{test_user.user_id}/semesters/{test_user.semester_id}"
            + f"/lessons/{test_user.lesson_id}/slots",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={"room": "F0D01", "day": 7, "hour": 7, "is_lab": 0},
        )
        assert response.status_code == 422

    def test_create_slot_with_invalid_hour():
        response = client.post(
            f"/users/{test_user.user_id}/semesters/{test_user.semester_id}"
            + f"/lessons/{test_user.lesson_id}/slots",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={"room": "F0D01", "day": 2, "hour": 17, "is_lab": 0},
        )
        assert response.status_code == 422

    def test_create_slot_with_empty_room():
        response = client.post(
            f"/users/{test_user.user_id}/semesters/{test_user.semester_id}"
            + f"/lessons/{test_user.lesson_id}/slots",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={"room": "", "day": 0, "hour": 7, "is_lab": 0},
        )
        assert response.status_code == 201

    def test_create_slot_with_invalid_is_lab():
        response = client.post(
            f"/users/{test_user.user_id}/semesters/{test_user.semester_id}"
            + f"/lessons/{test_user.lesson_id}/slots",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={"room": "F0D01", "day": 2, "hour": 7, "is_lab": 3},
        )
        assert response.status_code == 422

    ####### * UPDATE SLOT SECTION * #######

    def test_update_slot_without_room():
        response = client.put(
            f"/users/{test_user.user_id}/semesters/{test_user.semester_id}"
            + f"/lessons/{test_user.lesson_id}/slots/{test_user.slot_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={"day": 3, "hour": 7, "is_lab": 1,},
        )

        assert response.status_code == 200

    def test_update_slot():
        response = client.put(
            f"/users/{test_user.user_id}/semesters/{test_user.semester_id}"
            + f"/lessons/{test_user.lesson_id}/slots/{test_user.slot_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={"room": "updated_room", "day": 3, "hour": 7, "is_lab": 1,},
        )

        assert response.status_code == 200

    def test_update_slot_with_invalid_day():
        response = client.put(
            f"/users/{test_user.user_id}/semesters/{test_user.semester_id}"
            + f"/lessons/{test_user.lesson_id}/slots/{test_user.slot_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={"room": "updated_room", "day": 7, "hour": 7, "is_lab": 1},
        )
        assert response.status_code == 422

    def test_update_slot_with_invalid_hour():
        response = client.put(
            f"/users/{test_user.user_id}/semesters/{test_user.semester_id}"
            + f"/lessons/{test_user.lesson_id}/slots/{test_user.slot_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={"room": "updated_room", "day": 3, "hour": 25, "is_lab": 1},
        )
        assert response.status_code == 422

    def test_update_slot_with_invalid_is_lab():
        response = client.put(
            f"/users/{test_user.user_id}/semesters/{test_user.semester_id}"
            + f"/lessons/{test_user.lesson_id}/slots/{test_user.slot_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={"room": "updated_room", "day": 3, "hour": 7, "is_lab": 3},
        )
        assert response.status_code == 422

    def test_update_slot_with_invalid_lesson_id():
        mock_lesson_id = 44
        response = client.put(
            f"/users/{test_user.user_id}/semesters/{test_user.semester_id}"
            + f"/lessons/{mock_lesson_id}/slots/{test_user.slot_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={"room": "updated_room", "day": 3, "hour": 7, "is_lab": 1},
        )
        assert response.status_code == 404

    def test_update_slot_with_invalid_semester_id():
        mock_semester_id = 44
        response = client.put(
            f"/users/{test_user.user_id}/semesters/{mock_semester_id}"
            + f"/lessons/{test_user.lesson_id}/slots/{test_user.slot_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={"room": "updated_room", "day": 3, "hour": 7, "is_lab": 1},
        )
        assert response.status_code == 404

    def test_update_slot_with_invalid_user_id():
        mock_user_id = 44
        response = client.put(
            f"/users/{mock_user_id}"
            + f"/semesters/{test_user.semester_id}/lessons/{test_user.lesson_id}/slots/{test_user.slot_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={"room": "updated_room", "day": 3, "hour": 7, "is_lab": 1},
        )
        assert response.status_code == 403

    def test_create_second_slot():
        response = client.post(
            f"/users/{test_user.user_id}/semesters/{test_user.semester_id}"
            + f"/lessons/{test_user.lesson_id}/slots",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={"room": "second_room", "day": 4, "hour": 7, "is_lab": 0},
        )
        assert response.status_code == 201
        test_user.slot_id_list.append(response.json()["_id"])

    def test_update_slot_with_duplicate_slot():
        response = client.put(
            f"/users/{test_user.user_id}/semesters/{test_user.semester_id}"
            + f"/lessons/{test_user.lesson_id}/slots/{test_user.slot_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={"room": "duplicate second_room", "day": 4, "hour": 7, "is_lab": 0},
        )
        assert response.status_code == 409

    ######## * CREATE ABSENCE SECTION * ########

    def test_create_absence():
        response = client.post(
            f"/users/{test_user.user_id}/semesters/{test_user.semester_id}"
            + f"/lessons/{test_user.lesson_id}/absences/{test_user.slot_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={"week": 1},
        )
        assert response.status_code == 201
        test_user.absence = 1
        test_user.absence_list.append(1)

    def test_create_absence_with_invalid_week():
        response = client.post(
            f"/users/{test_user.user_id}/semesters/{test_user.semester_id}"
            + f"/lessons/{test_user.lesson_id}/absences/{test_user.slot_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={"week": 0},
        )
        assert response.status_code == 422

    def test_create_absence_with_invalid_lesson_id():
        mock_lesson_id = 44
        response = client.post(
            f"/users/{test_user.user_id}/semesters/{test_user.semester_id}"
            + f"/lessons/{mock_lesson_id}/absences/{test_user.slot_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={"week": 1},
        )
        assert response.status_code == 404

    def test_create_absence_with_invalid_semester_id():
        mock_semester_id = 44
        response = client.post(
            f"/users/{test_user.user_id}/semesters/{mock_semester_id}"
            + f"/lessons/{test_user.lesson_id}/absences/{test_user.slot_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={"week": 1},
        )
        assert response.status_code == 404

    def test_create_absence_with_invalid_user_id():
        mock_user_id = 44
        response = client.post(
            f"/users/{mock_user_id}"
            + f"/semesters/{test_user.semester_id}/lessons/{test_user.lesson_id}/absences/{test_user.slot_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={"week": 1},
        )
        assert response.status_code == 403

    def test_create_absence_with_duplicate_absence():
        response = client.post(
            f"/users/{test_user.user_id}/semesters/{test_user.semester_id}"
            + f"/lessons/{test_user.lesson_id}/absences/{test_user.slot_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={"week": 1},
        )
        assert response.status_code == 400

    def test_create_second_absence():
        response = client.post(
            f"/users/{test_user.user_id}/semesters/{test_user.semester_id}"
            + f"/lessons/{test_user.lesson_id}/absences/{test_user.slot_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={"week": 44},
        )
        assert response.status_code == 201
        test_user.absence_list.append(44)

    ######## * DELETE ABSENCE SECTION * ########

    def test_delete_absence():
        response = client.delete(
            f"/users/{test_user.user_id}/semesters/{test_user.semester_id}"
            + f"/lessons/{test_user.lesson_id}/absences/{test_user.slot_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={"week": 1},
        )
        assert response.status_code == 200

    def test_delete_absence_with_invalid_lesson_id():
        mock_lesson_id = 44
        response = client.delete(
            f"/users/{test_user.user_id}/semesters/{test_user.semester_id}"
            + f"/lessons/{mock_lesson_id}/absences/{test_user.slot_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={"week": 44},
        )
        assert response.status_code == 404

    def test_delete_absence_with_invalid_semester_id():
        mock_semester_id = 44
        response = client.delete(
            f"/users/{test_user.user_id}/semesters/{mock_semester_id}"
            + f"/lessons/{test_user.lesson_id}/absences/{test_user.slot_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={"week": 44},
        )
        assert response.status_code == 404

    def test_delete_absence_with_invalid_user_id():
        mock_user_id = 44
        response = client.delete(
            f"/users/{mock_user_id}"
            + f"/semesters/{test_user.semester_id}/lessons/{test_user.lesson_id}/absences/{test_user.slot_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={"week": 44},
        )
        assert response.status_code == 403

    def test_delete_absence_with_invalid_absence_id():
        mock_absence_id = 44
        response = client.delete(
            f"/users/{test_user.user_id}/semesters/{test_user.semester_id}"
            + f"/lessons/{test_user.lesson_id}/absences/{mock_absence_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={"week": 44},
        )
        assert response.status_code == 404

    def test_delete_second_absence():
        response = client.delete(
            f"/users/{test_user.user_id}/semesters/{test_user.semester_id}"
            + f"/lessons/{test_user.lesson_id}/absences/{test_user.slot_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={"week": 44},
        )
        assert response.status_code == 200
        test_user.absence_list.remove(44)

    ######## * DELETE SLOT SECTION * ########
    def test_delete_slot():
        response = client.delete(
            f"/users/{test_user.user_id}/semesters/{test_user.semester_id}"
            + f"/lessons/{test_user.lesson_id}/slots/{test_user.slot_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert response.status_code == 200

    def test_delete_slot_with_invalid_lesson_id():
        mock_lesson_id = 44
        response = client.delete(
            f"/users/{test_user.user_id}/semesters/{test_user.semester_id}"
            + f"/lessons/{mock_lesson_id}/slots/{test_user.slot_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert response.status_code == 404

    def test_delete_slot_with_invalid_semester_id():
        mock_semester_id = 44
        response = client.delete(
            f"/users/{test_user.user_id}/semesters/{mock_semester_id}"
            + f"/lessons/{test_user.lesson_id}/slots/{test_user.slot_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert response.status_code == 404

    def test_delete_slot_with_invalid_user_id():
        mock_user_id = 44
        response = client.delete(
            f"/users/{mock_user_id}"
            + f"/semesters/{test_user.semester_id}/lessons/{test_user.lesson_id}/slots/{test_user.slot_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert response.status_code == 403

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
