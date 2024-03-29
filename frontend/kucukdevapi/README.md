# kucukdevapi

Kucukdevapi - JavaScript client for kucukdevapi
No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
This SDK is automatically generated by the [OpenAPI Generator](https://openapi-generator.tech) project:

- API version: 1.0.0
- Package version: 1.0.0
- Build package: org.openapitools.codegen.languages.JavascriptClientCodegen

## Installation

### For [Node.js](https://nodejs.org/)

#### npm

To publish the library as a [npm](https://www.npmjs.com/), please follow the procedure in ["Publishing npm packages"](https://docs.npmjs.com/getting-started/publishing-npm-packages).

Then install it via:

```shell
npm install kucukdevapi --save
```

Finally, you need to build the module:

```shell
npm run build
```

##### Local development

To use the library locally without publishing to a remote npm registry, first install the dependencies by changing into the directory containing `package.json` (and this README). Let's call this `JAVASCRIPT_CLIENT_DIR`. Then run:

```shell
npm install
```

Next, [link](https://docs.npmjs.com/cli/link) it globally in npm with the following, also from `JAVASCRIPT_CLIENT_DIR`:

```shell
npm link
```

To use the link you just defined in your project, switch to the directory you want to use your kucukdevapi from, and run:

```shell
npm link /path/to/<JAVASCRIPT_CLIENT_DIR>
```

Finally, you need to build the module:

```shell
npm run build
```

#### git

If the library is hosted at a git repository, e.g.https://github.com/GIT_USER_ID/GIT_REPO_ID
then install it via:

```shell
    npm install GIT_USER_ID/GIT_REPO_ID --save
```

### For browser

The library also works in the browser environment via npm and [browserify](http://browserify.org/). After following
the above steps with Node.js and installing browserify with `npm install -g browserify`,
perform the following (assuming *main.js* is your entry file):

```shell
browserify main.js > bundle.js
```

Then include *bundle.js* in the HTML pages.

### Webpack Configuration

Using Webpack you may encounter the following error: "Module not found: Error:
Cannot resolve module", most certainly you should disable AMD loader. Add/merge
the following section to your webpack config:

```javascript
module: {
  rules: [
    {
      parser: {
        amd: false
      }
    }
  ]
}
```

## Getting Started

Please follow the [installation](#installation) instruction and execute the following JS code:

```javascript
var Kucukdevapi = require('kucukdevapi');

var defaultClient = Kucukdevapi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
var OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = "YOUR ACCESS TOKEN"

var api = new Kucukdevapi.CurriculumLessonsApi()
var unid = "unid_example"; // {String} 
var depid = "depid_example"; // {String} 
var curid = "curid_example"; // {String} 
var cursid = "cursid_example"; // {String} 
var curriculumLessonModel = new Kucukdevapi.CurriculumLessonModel(); // {CurriculumLessonModel} 
var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
api.createCurriculumLesson(unid, depid, curid, cursid, curriculumLessonModel, callback);

```

## Documentation for API Endpoints

All URIs are relative to *http://localhost:8000*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*Kucukdevapi.CurriculumLessonsApi* | [**createCurriculumLesson**](docs/CurriculumLessonsApi.md#createCurriculumLesson) | **POST** /universities/{unid}/departments/{depid}/curriculums/{curid}/semesters/{cursid}/lessons | Create Curriculum Lesson
*Kucukdevapi.CurriculumLessonsApi* | [**deleteCurriculumLesson**](docs/CurriculumLessonsApi.md#deleteCurriculumLesson) | **DELETE** /universities/{unid}/departments/{depid}/curriculums/{curid}/semesters/{cursid}/lessons/{curlid} | Delete Curriculum Lesson
*Kucukdevapi.CurriculumLessonsApi* | [**getSingleCurriculumLesson**](docs/CurriculumLessonsApi.md#getSingleCurriculumLesson) | **GET** /universities/{unid}/departments/{depid}/curriculums/{curid}/semesters/{cursid}/lessons/{curlid} | Show Curriculum Lesson
*Kucukdevapi.CurriculumLessonsApi* | [**listCurriculumLessons**](docs/CurriculumLessonsApi.md#listCurriculumLessons) | **GET** /universities/{unid}/departments/{depid}/curriculums/{curid}/semesters/{cursid}/lessons | List Curriculum Lessons
*Kucukdevapi.CurriculumLessonsApi* | [**updateCurriculumLesson**](docs/CurriculumLessonsApi.md#updateCurriculumLesson) | **PUT** /universities/{unid}/departments/{depid}/curriculums/{curid}/semesters/{cursid}/lessons/{curlid} | Update Curriculum Lesson
*Kucukdevapi.CurriculumSemestersApi* | [**createCurriculumSemester**](docs/CurriculumSemestersApi.md#createCurriculumSemester) | **POST** /universities/{unid}/departments/{depid}/curriculums/{curid}/semesters | Create Curriculum Semester
*Kucukdevapi.CurriculumSemestersApi* | [**deleteCurriculumSemester**](docs/CurriculumSemestersApi.md#deleteCurriculumSemester) | **DELETE** /universities/{unid}/departments/{depid}/curriculums/{curid}/semesters/{cursid} | Delete Curriculum Semester
*Kucukdevapi.CurriculumSemestersApi* | [**getSingleCurriculumSemester**](docs/CurriculumSemestersApi.md#getSingleCurriculumSemester) | **GET** /universities/{unid}/departments/{depid}/curriculums/{curid}/semesters/{cursid} | Show Curriculum Semester
*Kucukdevapi.CurriculumSemestersApi* | [**listCurriculumSemesters**](docs/CurriculumSemestersApi.md#listCurriculumSemesters) | **GET** /universities/{unid}/departments/{depid}/curriculums/{curid}/semesters | List Curriculum Semesters
*Kucukdevapi.CurriculumSemestersApi* | [**updateCurriculumSemester**](docs/CurriculumSemestersApi.md#updateCurriculumSemester) | **PUT** /universities/{unid}/departments/{depid}/curriculums/{curid}/semesters/{cursid} | Update Curriculum Semester
*Kucukdevapi.CurriculumsApi* | [**createUniversityDepartmentCurriculum**](docs/CurriculumsApi.md#createUniversityDepartmentCurriculum) | **POST** /universities/{unid}/departments/{depid}/curriculums | Create Department Curriculum
*Kucukdevapi.CurriculumsApi* | [**deleteUniversityDepartmentCurriculum**](docs/CurriculumsApi.md#deleteUniversityDepartmentCurriculum) | **DELETE** /universities/{unid}/departments/{depid}/curriculums/{curid} | Delete Department Curriculum
*Kucukdevapi.CurriculumsApi* | [**getSingleUniversityDepartmentCurriculum**](docs/CurriculumsApi.md#getSingleUniversityDepartmentCurriculum) | **GET** /universities/{unid}/departments/{depid}/curriculums/{curid} | Show Department Curriculum
*Kucukdevapi.CurriculumsApi* | [**listUniversityDepartmentCurriculums**](docs/CurriculumsApi.md#listUniversityDepartmentCurriculums) | **GET** /universities/{unid}/departments/{depid}/curriculums | List Department Curriculums
*Kucukdevapi.CurriculumsApi* | [**updateUniversityDepartmentCurriculum**](docs/CurriculumsApi.md#updateUniversityDepartmentCurriculum) | **PUT** /universities/{unid}/departments/{depid}/curriculums/{curid} | Update Department Curriculum
*Kucukdevapi.DepartmentsApi* | [**createUniversityDepartment**](docs/DepartmentsApi.md#createUniversityDepartment) | **POST** /universities/{unid}/departments | Create University Department
*Kucukdevapi.DepartmentsApi* | [**deleteUniversityDepartment**](docs/DepartmentsApi.md#deleteUniversityDepartment) | **DELETE** /universities/{unid}/departments/{depid} | Delete University Department
*Kucukdevapi.DepartmentsApi* | [**getSingleUniversityDepartment**](docs/DepartmentsApi.md#getSingleUniversityDepartment) | **GET** /universities/{unid}/departments/{depid} | Show University Department
*Kucukdevapi.DepartmentsApi* | [**listUniversityDepartments**](docs/DepartmentsApi.md#listUniversityDepartments) | **GET** /universities/{unid}/departments | List University Departments
*Kucukdevapi.DepartmentsApi* | [**updateUniversityDepartment**](docs/DepartmentsApi.md#updateUniversityDepartment) | **PUT** /universities/{unid}/departments/{depid} | Update University Department
*Kucukdevapi.LessonsApi* | [**createAbsence**](docs/LessonsApi.md#createAbsence) | **POST** /users/{uid}/semesters/{sid}/lessons/{lid}/absences | Create Absence
*Kucukdevapi.LessonsApi* | [**createLesson**](docs/LessonsApi.md#createLesson) | **POST** /users/{uid}/semesters/{sid}/lessons | Create Lesson
*Kucukdevapi.LessonsApi* | [**deleteAbsence**](docs/LessonsApi.md#deleteAbsence) | **DELETE** /users/{uid}/semesters/{sid}/lessons/{lid}/absences | Delete Absence
*Kucukdevapi.LessonsApi* | [**deleteLesson**](docs/LessonsApi.md#deleteLesson) | **DELETE** /users/{uid}/semesters/{sid}/lessons/{lid} | Delete Lesson
*Kucukdevapi.LessonsApi* | [**getSingleLesson**](docs/LessonsApi.md#getSingleLesson) | **GET** /users/{uid}/semesters/{sid}/lessons/{lid} | Show Lesson
*Kucukdevapi.LessonsApi* | [**listLessonsOfSemester**](docs/LessonsApi.md#listLessonsOfSemester) | **GET** /users/{uid}/semesters/{sid}/lessons | List Lessons
*Kucukdevapi.LessonsApi* | [**updateLesson**](docs/LessonsApi.md#updateLesson) | **PUT** /users/{uid}/semesters/{sid}/lessons/{lid} | Update Lesson
*Kucukdevapi.SchedulerApi* | [**createSchedule**](docs/SchedulerApi.md#createSchedule) | **POST** /universities/{unid}/schedule | Create Schedule
*Kucukdevapi.SemestersApi* | [**createSemester**](docs/SemestersApi.md#createSemester) | **POST** /users/{uid}/semesters | Create Semester
*Kucukdevapi.SemestersApi* | [**deleteSemester**](docs/SemestersApi.md#deleteSemester) | **DELETE** /users/{uid}/semesters/{sid} | Delete Semester
*Kucukdevapi.SemestersApi* | [**getSingleSemester**](docs/SemestersApi.md#getSingleSemester) | **GET** /users/{uid}/semesters/{sid} | Show Semester
*Kucukdevapi.SemestersApi* | [**listSemestersOfUser**](docs/SemestersApi.md#listSemestersOfUser) | **GET** /users/{uid}/semesters | List Semesters
*Kucukdevapi.SemestersApi* | [**updateSemester**](docs/SemestersApi.md#updateSemester) | **PUT** /users/{uid}/semesters/{sid} | Update Semester
*Kucukdevapi.TokenApi* | [**loginForAccessTokenTokenPost**](docs/TokenApi.md#loginForAccessTokenTokenPost) | **POST** /token | Login For Access Token
*Kucukdevapi.UniversitiesApi* | [**createUniversity**](docs/UniversitiesApi.md#createUniversity) | **POST** /universities | Create University
*Kucukdevapi.UniversitiesApi* | [**deleteUniversity**](docs/UniversitiesApi.md#deleteUniversity) | **DELETE** /universities/{unid} | Delete University
*Kucukdevapi.UniversitiesApi* | [**getCurrentUniversitySemester**](docs/UniversitiesApi.md#getCurrentUniversitySemester) | **GET** /universities/{unid}/current-semester | Show University Current Semester
*Kucukdevapi.UniversitiesApi* | [**getSingleUniversity**](docs/UniversitiesApi.md#getSingleUniversity) | **GET** /universities/{unid} | Show University
*Kucukdevapi.UniversitiesApi* | [**listUniversities**](docs/UniversitiesApi.md#listUniversities) | **GET** /universities | List Universities
*Kucukdevapi.UniversitiesApi* | [**updateUniversityCurrentSemester**](docs/UniversitiesApi.md#updateUniversityCurrentSemester) | **PUT** /universities/{unid}/current-semester | Update University Current Semester
*Kucukdevapi.UniversitiesApi* | [**updateUniversityName**](docs/UniversitiesApi.md#updateUniversityName) | **PUT** /universities/{unid}/update-name | Update University Name
*Kucukdevapi.UniversityLessonsApi* | [**createUniversityLesson**](docs/UniversityLessonsApi.md#createUniversityLesson) | **POST** /universities/{unid}/semesters/{unisid}/lessons | Create University Lesson
*Kucukdevapi.UniversityLessonsApi* | [**deleteUniversityLesson**](docs/UniversityLessonsApi.md#deleteUniversityLesson) | **DELETE** /universities/{unid}/semesters/{unisid}/lessons/{unilid} | Delete University Lesson
*Kucukdevapi.UniversityLessonsApi* | [**getSingleLessonWithCode**](docs/UniversityLessonsApi.md#getSingleLessonWithCode) | **GET** /universities/{unid}/semesters/current-semester/lessons/find-code | Show Lesson With Code
*Kucukdevapi.UniversityLessonsApi* | [**getSingleUniversitySemesterLesson**](docs/UniversityLessonsApi.md#getSingleUniversitySemesterLesson) | **GET** /universities/{unid}/semesters/{unisid}/lessons/{unilid} | Show University Lesson
*Kucukdevapi.UniversityLessonsApi* | [**listUniversitySemesterLessons**](docs/UniversityLessonsApi.md#listUniversitySemesterLessons) | **GET** /universities/{unid}/semesters/{unisid}/lessons | List University Lessons
*Kucukdevapi.UniversityLessonsApi* | [**updateUniversityLesson**](docs/UniversityLessonsApi.md#updateUniversityLesson) | **PUT** /universities/{unid}/semesters/{unisid}/lessons/{unilid} | Update University Lesson
*Kucukdevapi.UniversitySectionsApi* | [**deleteLessonSection**](docs/UniversitySectionsApi.md#deleteLessonSection) | **DELETE** /universities/{unid}/semesters/{unisid}/lessons/{unilid}/sections/{secid} | Delete Lesson Section
*Kucukdevapi.UniversitySectionsApi* | [**updateLessonSection**](docs/UniversitySectionsApi.md#updateLessonSection) | **PUT** /universities/{unid}/semesters/{unisid}/lessons/{unilid}/sections/{secid} | Update Lesson Section
*Kucukdevapi.UniversitySemestersApi* | [**createUniversitySemester**](docs/UniversitySemestersApi.md#createUniversitySemester) | **POST** /universities/{unid}/semesters | Create University Semester
*Kucukdevapi.UniversitySemestersApi* | [**deleteUniversitySemester**](docs/UniversitySemestersApi.md#deleteUniversitySemester) | **DELETE** /universities/{unid}/semesters/{unisid} | Delete University Semester
*Kucukdevapi.UniversitySemestersApi* | [**getSingleUniversitySemesters**](docs/UniversitySemestersApi.md#getSingleUniversitySemesters) | **GET** /universities/{unid}/semesters/{unisid} | Show University Semester
*Kucukdevapi.UniversitySemestersApi* | [**listUniversitySemesters**](docs/UniversitySemestersApi.md#listUniversitySemesters) | **GET** /universities/{unid}/semesters | List University Semesters
*Kucukdevapi.UniversitySemestersApi* | [**updateUniversitySemester**](docs/UniversitySemestersApi.md#updateUniversitySemester) | **PUT** /universities/{unid}/semesters/{unisid} | Update University Semester
*Kucukdevapi.UsersApi* | [**createProfessorUser**](docs/UsersApi.md#createProfessorUser) | **POST** /users/professors | Create Professor User
*Kucukdevapi.UsersApi* | [**createUser**](docs/UsersApi.md#createUser) | **POST** /users | Create User
*Kucukdevapi.UsersApi* | [**deleteUser**](docs/UsersApi.md#deleteUser) | **DELETE** /users/{uid} | Delete User
*Kucukdevapi.UsersApi* | [**getCurrentUser**](docs/UsersApi.md#getCurrentUser) | **GET** /users | Get Current
*Kucukdevapi.UsersApi* | [**getSingleUser**](docs/UsersApi.md#getSingleUser) | **GET** /users/{uid} | Show User
*Kucukdevapi.UsersApi* | [**updateCurrentSemester**](docs/UsersApi.md#updateCurrentSemester) | **PUT** /users/{uid}/current-semester | Update Current Semester
*Kucukdevapi.UsersApi* | [**updateCurrentUniversity**](docs/UsersApi.md#updateCurrentUniversity) | **PUT** /users/{uid}/current-university | Update Current University
*Kucukdevapi.UsersApi* | [**updateEntranceyear**](docs/UsersApi.md#updateEntranceyear) | **PUT** /users/{uid}/entrance-year | Update Entrance Year
*Kucukdevapi.UsersApi* | [**updatePassword**](docs/UsersApi.md#updatePassword) | **PUT** /users/{uid}/change-password | Update Password


## Documentation for Models

 - [Kucukdevapi.AbsenceModel](docs/AbsenceModel.md)
 - [Kucukdevapi.CurriculumLessonModel](docs/CurriculumLessonModel.md)
 - [Kucukdevapi.CurriculumSemesterModel](docs/CurriculumSemesterModel.md)
 - [Kucukdevapi.HTTPValidationError](docs/HTTPValidationError.md)
 - [Kucukdevapi.LessonAPIModel](docs/LessonAPIModel.md)
 - [Kucukdevapi.LessonAbsenceModel](docs/LessonAbsenceModel.md)
 - [Kucukdevapi.LessonModel](docs/LessonModel.md)
 - [Kucukdevapi.Message](docs/Message.md)
 - [Kucukdevapi.MessageCreate](docs/MessageCreate.md)
 - [Kucukdevapi.SemesterAPIModel](docs/SemesterAPIModel.md)
 - [Kucukdevapi.SlotModel](docs/SlotModel.md)
 - [Kucukdevapi.Token](docs/Token.md)
 - [Kucukdevapi.UniversityAPIModel](docs/UniversityAPIModel.md)
 - [Kucukdevapi.UniversityCurriculumModel](docs/UniversityCurriculumModel.md)
 - [Kucukdevapi.UniversityDepartmentModel](docs/UniversityDepartmentModel.md)
 - [Kucukdevapi.UniversityLessonAPIModel](docs/UniversityLessonAPIModel.md)
 - [Kucukdevapi.UniversityLessonModel](docs/UniversityLessonModel.md)
 - [Kucukdevapi.UniversityModel](docs/UniversityModel.md)
 - [Kucukdevapi.UniversitySectionAPIModel](docs/UniversitySectionAPIModel.md)
 - [Kucukdevapi.UniversitySectionModel](docs/UniversitySectionModel.md)
 - [Kucukdevapi.UniversitySemesterModel](docs/UniversitySemesterModel.md)
 - [Kucukdevapi.UniversitySlotModel](docs/UniversitySlotModel.md)
 - [Kucukdevapi.UpdateEntranceYearModel](docs/UpdateEntranceYearModel.md)
 - [Kucukdevapi.UpdateLessonModel](docs/UpdateLessonModel.md)
 - [Kucukdevapi.UpdatePasswordModel](docs/UpdatePasswordModel.md)
 - [Kucukdevapi.UpdateSemesterModel](docs/UpdateSemesterModel.md)
 - [Kucukdevapi.UpdateUniversityModel](docs/UpdateUniversityModel.md)
 - [Kucukdevapi.UpdateUniversityNameModel](docs/UpdateUniversityNameModel.md)
 - [Kucukdevapi.UpdateUserSemesterModel](docs/UpdateUserSemesterModel.md)
 - [Kucukdevapi.UserAPIModel](docs/UserAPIModel.md)
 - [Kucukdevapi.UserModel](docs/UserModel.md)
 - [Kucukdevapi.UserSemesterModel](docs/UserSemesterModel.md)
 - [Kucukdevapi.ValidationError](docs/ValidationError.md)


## Documentation for Authorization



### OAuth2PasswordBearer


- **Type**: OAuth
- **Flow**: password
- **Authorization URL**: 
- **Scopes**: N/A

