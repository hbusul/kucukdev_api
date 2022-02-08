# Kucukdevapi.LessonsApi

All URIs are relative to *http://localhost:8000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createAbsence**](LessonsApi.md#createAbsence) | **POST** /users/{uid}/semesters/{sid}/lessons/{lid}/absences | Create Absence
[**createLesson**](LessonsApi.md#createLesson) | **POST** /users/{uid}/semesters/{sid}/lessons | Create Lesson
[**deleteAbsence**](LessonsApi.md#deleteAbsence) | **DELETE** /users/{uid}/semesters/{sid}/lessons/{lid}/absences | Delete Absence
[**deleteLesson**](LessonsApi.md#deleteLesson) | **DELETE** /users/{uid}/semesters/{sid}/lessons/{lid} | Delete Lesson
[**getSingleLesson**](LessonsApi.md#getSingleLesson) | **GET** /users/{uid}/semesters/{sid}/lessons/{lid} | Show Lesson
[**listLessonsOfSemester**](LessonsApi.md#listLessonsOfSemester) | **GET** /users/{uid}/semesters/{sid}/lessons | List Lessons
[**updateLesson**](LessonsApi.md#updateLesson) | **PUT** /users/{uid}/semesters/{sid}/lessons/{lid} | Update Lesson



## createAbsence

> Message createAbsence(uid, sid, lid, lessonAbsenceModel)

Create Absence

Create an absence for a lesson with given userID, semesterID and lessonID

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';
let defaultClient = Kucukdevapi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new Kucukdevapi.LessonsApi();
let uid = "uid_example"; // String | 
let sid = "sid_example"; // String | 
let lid = "lid_example"; // String | 
let lessonAbsenceModel = new Kucukdevapi.LessonAbsenceModel(); // LessonAbsenceModel | 
apiInstance.createAbsence(uid, sid, lid, lessonAbsenceModel, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **uid** | **String**|  | 
 **sid** | **String**|  | 
 **lid** | **String**|  | 
 **lessonAbsenceModel** | [**LessonAbsenceModel**](LessonAbsenceModel.md)|  | 

### Return type

[**Message**](Message.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## createLesson

> MessageCreate createLesson(uid, sid, lessonModel)

Create Lesson

Create a lessons for a semester with given userID, semesterID

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';
let defaultClient = Kucukdevapi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new Kucukdevapi.LessonsApi();
let uid = "uid_example"; // String | 
let sid = "sid_example"; // String | 
let lessonModel = new Kucukdevapi.LessonModel(); // LessonModel | 
apiInstance.createLesson(uid, sid, lessonModel, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **uid** | **String**|  | 
 **sid** | **String**|  | 
 **lessonModel** | [**LessonModel**](LessonModel.md)|  | 

### Return type

[**MessageCreate**](MessageCreate.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deleteAbsence

> Message deleteAbsence(uid, sid, lid, lessonAbsenceModel)

Delete Absence

Delete an absence from a lesson with given userID, semesterID and lessonID

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';
let defaultClient = Kucukdevapi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new Kucukdevapi.LessonsApi();
let uid = "uid_example"; // String | 
let sid = "sid_example"; // String | 
let lid = "lid_example"; // String | 
let lessonAbsenceModel = new Kucukdevapi.LessonAbsenceModel(); // LessonAbsenceModel | 
apiInstance.deleteAbsence(uid, sid, lid, lessonAbsenceModel, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **uid** | **String**|  | 
 **sid** | **String**|  | 
 **lid** | **String**|  | 
 **lessonAbsenceModel** | [**LessonAbsenceModel**](LessonAbsenceModel.md)|  | 

### Return type

[**Message**](Message.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deleteLesson

> Message deleteLesson(uid, sid, lid)

Delete Lesson

Delete a lesson with given userID, semesterID and lessonID

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';
let defaultClient = Kucukdevapi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new Kucukdevapi.LessonsApi();
let uid = "uid_example"; // String | 
let sid = "sid_example"; // String | 
let lid = "lid_example"; // String | 
apiInstance.deleteLesson(uid, sid, lid, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **uid** | **String**|  | 
 **sid** | **String**|  | 
 **lid** | **String**|  | 

### Return type

[**Message**](Message.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getSingleLesson

> LessonAPIModel getSingleLesson(uid, sid, lid)

Show Lesson

Get a single lesson with given userID, semesterID and lessonID

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';
let defaultClient = Kucukdevapi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new Kucukdevapi.LessonsApi();
let uid = "uid_example"; // String | 
let sid = "sid_example"; // String | 
let lid = "lid_example"; // String | 
apiInstance.getSingleLesson(uid, sid, lid, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **uid** | **String**|  | 
 **sid** | **String**|  | 
 **lid** | **String**|  | 

### Return type

[**LessonAPIModel**](LessonAPIModel.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## listLessonsOfSemester

> [LessonAPIModel] listLessonsOfSemester(uid, sid)

List Lessons

List all lessons of a semester with given userID, semesterID

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';
let defaultClient = Kucukdevapi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new Kucukdevapi.LessonsApi();
let uid = "uid_example"; // String | 
let sid = "sid_example"; // String | 
apiInstance.listLessonsOfSemester(uid, sid, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **uid** | **String**|  | 
 **sid** | **String**|  | 

### Return type

[**[LessonAPIModel]**](LessonAPIModel.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## updateLesson

> Message updateLesson(uid, sid, lid, updateLessonModel)

Update Lesson

Update a lesson with given userID, semesterID and lessonID

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';
let defaultClient = Kucukdevapi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new Kucukdevapi.LessonsApi();
let uid = "uid_example"; // String | 
let sid = "sid_example"; // String | 
let lid = "lid_example"; // String | 
let updateLessonModel = new Kucukdevapi.UpdateLessonModel(); // UpdateLessonModel | 
apiInstance.updateLesson(uid, sid, lid, updateLessonModel, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **uid** | **String**|  | 
 **sid** | **String**|  | 
 **lid** | **String**|  | 
 **updateLessonModel** | [**UpdateLessonModel**](UpdateLessonModel.md)|  | 

### Return type

[**Message**](Message.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

