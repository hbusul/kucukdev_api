def create_user_and_login(client, email, password, first_name, last_name):
    """Create user and login. Return user id, token"""

    user = client.post(
        "/users",
        json={
            "email": email,
            "password": password,
            "first_name": first_name,
            "last_name": last_name,
        },
    )

    assert user.status_code == 201
    assert user.json()["message"] == "User created"

    user_login = client.post(
        "/token",
        data={"grant_type": "password", "username": email, "password": password,},
    )

    assert user_login.status_code == 200

    return user.json()["_id"], user_login.json()["access_token"]


def login_admin_user(client, settings):
    """Login admin user and return token"""

    admin_login = client.post(
        "/token",
        data={
            "grant_type": "password",
            "username": settings.ADMIN_USERNAME,
            "password": settings.ADMIN_PASSWORD,
        },
    )

    assert admin_login.status_code == 200

    return admin_login.json()["access_token"]


def create_professor_and_login(
    client, admin_token, email, password, first_name, last_name
):
    """Create professor and login. Return professor id, token"""

    professor = client.post(
        "/users/professors",
        headers={"Authorization": f"Bearer {admin_token}"},
        json={
            "email": email,
            "password": password,
            "first_name": first_name,
            "last_name": last_name,
        },
    )

    assert professor.status_code == 201
    assert professor.json()["message"] == "Professor created"

    professor_login = client.post(
        "/token",
        data={"grant_type": "password", "username": email, "password": password,},
    )

    assert professor_login.status_code == 200

    return professor.json()["_id"], professor_login.json()["access_token"]


def create_university(client, token, university_name):
    """Create university and return university id"""

    university = client.post(
        "/universities",
        headers={"Authorization": f"Bearer {token}"},
        json={
            "name": university_name,
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

    return university.json()["_id"]


def create_department(client, token, university_id, department_name):
    """Create department and return department id"""

    department = client.post(
        f"/universities/{university_id}/departments",
        headers={"Authorization": f"Bearer {token}"},
        json={"name": department_name},
    )

    assert department.status_code == 201
    assert department.json()["message"] == "University department created"

    return department.json()["_id"]


def create_curriculum(client, token, university_id, department_id, curriculum_name):
    """Create curriculum and return curriculum id"""

    curriculum = client.post(
        f"/universities/{university_id}/departments/{department_id}/curriculums",
        headers={"Authorization": f"Bearer {token}"},
        json={"name": curriculum_name, "start_year": 2020, "end_year": 2032,},
    )

    assert curriculum.status_code == 201
    assert curriculum.json()["message"] == "Department curriculum created"

    return curriculum.json()["_id"]


def create_curriculum_semester(
    client, token, university_id, department_id, curriculum_id, semester
):
    """Create curriculum semester and return curriculum semester id"""

    curriculum_semester = client.post(
        f"/universities/{university_id}/departments/{department_id}/curriculums/{curriculum_id}/semesters",
        headers={"Authorization": f"Bearer {token}"},
        json={"number": semester,},
    )

    assert curriculum_semester.status_code == 201
    assert curriculum_semester.json()["message"] == "Curriculum semester created"

    return curriculum_semester.json()["_id"]


def create_university_semester(client, token, university_id, semester_name):
    """Create university semester and return university semester id"""

    university_semester = client.post(
        f"/universities/{university_id}/semesters",
        headers={"Authorization": f"Bearer {token}"},
        json={"name": semester_name,},
    )

    assert university_semester.status_code == 201
    assert university_semester.json()["message"] == "University semester created"

    return university_semester.json()["_id"]


def create_semester(client, user_id, token):
    """Create semester and return semester id"""

    semester = client.post(
        f"/users/{user_id}/semesters",
        headers={"Authorization": f"Bearer {token}"},
        json={
            "name": "Test Semester",
            "start_date": "2022-02-18T00:00:00Z",
            "end_date": "2022-06-18T00:00:00Z",
            "start_hour": {"hour": 8, "minute": 20},
            "duration_lesson": 40,
            "duration_break": 20,
            "slot_count": 12,
        },
    )

    assert semester.status_code == 201
    assert semester.json()["message"] == "Semester created"

    return semester.json()["_id"]
