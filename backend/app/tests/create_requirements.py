def create_user_and_login(client, email, password):
    """Create user and login. Return user id, token"""

    user = client.post("/users", json={"email": email, "password": password})

    assert user.status_code == 201
    assert user.json()["message"] == "User created"

    user_login = client.post(
        "/token",
        data={
            "grant_type": "password",
            "username": email,
            "password": password,
        },
    )

    assert user_login.status_code == 200

    return user.json()["_id"], user_login.json()["access_token"]


def create_semester(client, user_id, token):
    """Create semester and return semester id"""

    semester = client.post(
        f"/users/{user_id}/semesters",
        headers={"Authorization": f"Bearer {token}"},
        json={
            "name": "Test Semester",
            "startDate": "2022-02-18T00:00:00Z",
            "endDate": "2022-06-18T00:00:00Z",
            "startHour": "8.20",
            "dLesson": 40,
            "dBreak": 20,
            "slotCount": 12,
        },
    )

    assert semester.status_code == 201
    assert semester.json()["message"] == "Semester created"

    return semester.json()["_id"]
