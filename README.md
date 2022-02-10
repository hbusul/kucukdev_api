# Kucukdev, assistant for university students

Helps you with:

-   Tracking your attendance
-   Picking lessons in a way that they don't conflict and you like

We've picked an unpopular language(PHP) to write this solution, now it
is time we correct that wrong. This repo aims to re-write the backend
for Kucukdev in FastAPI.

[Kucukdev](https://www.kucukdev.org) is online and here the aim is to
replicate the behaviour for the back-end.

# Quick Start

1. Install `Docker`, `Docker Compose` and `npm`
1. `docker-compose build` to build the backend and frontend
1. `docker-compose up -d` to start the Kucukdev API
1. Go to `http://localhost:8000/docs` to see the swagger UI
1. `docker-compose down` to down it

# Development

Use auto-formatting and use `Black` for it.

# Tests

To run:
`docker-compose -f docker-compose.test.yaml up --build`

To down with cleaning the database:
`docker-compose -f docker-compose.test.yaml down -v`

To run university tests, an admin user is required to create professor users. Therefore, a file named `.env` should be added into `backend` folder. Content of the `.env` file is following:

```
ADMIN_USERNAME=<admin_email>
ADMIN_PASSWORD=<admin_password>
```
