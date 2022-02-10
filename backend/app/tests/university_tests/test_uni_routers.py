from app.main import app, settings
from app.tests.create_requirements import create_professor_and_login, login_admin_user
from fastapi.testclient import TestClient

with TestClient(app) as client:

    class TestUser:
        user_id = None
        token = None
        university_id = None

    test_user = TestUser()
    admin_token = login_admin_user(client, settings)
    test_user.user_id, test_user.token = create_professor_and_login(
        client, admin_token, "professor_uni_routers@test.com", "test"
    )

    def test_create_university():
        university = client.post(
            "/universities",
            headers={"Authorization": f"Bearer {test_user.token}"},
            json={"name": "University of Test"},
        )
        assert university.status_code == 201
        assert university.json()["message"] == "University created"
        test_user.university_id = university.json()["_id"]

    def test_get_university():
        university = client.get(
            f"/universities/{test_user.university_id}",
            headers={"Authorization": f"Bearer {test_user.token}"},
        )
        assert university.status_code == 200
        assert university.json() == {
            "_id": test_user.university_id,
            "name": "University of Test",
            "curSemesterID": "null",
        }

