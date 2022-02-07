# Kucukdevapi.UniversityLessonsApi

All URIs are relative to *http://localhost:8000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createUniversityLesson**](UniversityLessonsApi.md#createUniversityLesson) | **POST** /universities/{unid}/semesters/{unisid}/lessons | Create University Lesson
[**deleteUniversityLesson**](UniversityLessonsApi.md#deleteUniversityLesson) | **DELETE** /universities/{unid}/semesters/{unisid}/lessons/{unilid} | Delete University Lesson
[**getSingleLessonWithCode**](UniversityLessonsApi.md#getSingleLessonWithCode) | **GET** /universities/{unid}/semesters/current-semester/lessons/find-code | Show Lesson With Code
[**getSingleUniversitySemesterLesson**](UniversityLessonsApi.md#getSingleUniversitySemesterLesson) | **GET** /universities/{unid}/semesters/{unisid}/lessons/{unilid} | Show University Lesson
[**listUniversitySemesterLessons**](UniversityLessonsApi.md#listUniversitySemesterLessons) | **GET** /universities/{unid}/semesters/{unisid}/lessons | List University Lessons
[**updateUniversityLesson**](UniversityLessonsApi.md#updateUniversityLesson) | **PUT** /universities/{unid}/semesters/{unisid}/lessons/{unilid} | Update University Lesson



## createUniversityLesson

> Message createUniversityLesson(unid, unisid, universityLessonModel)

Create University Lesson

Create a lesson for a semester of a university with given universityID and universitySemesterID

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';
let defaultClient = Kucukdevapi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new Kucukdevapi.UniversityLessonsApi();
let unid = "unid_example"; // String | 
let unisid = "unisid_example"; // String | 
let universityLessonModel = new Kucukdevapi.UniversityLessonModel(); // UniversityLessonModel | 
apiInstance.createUniversityLesson(unid, unisid, universityLessonModel, (error, data, response) => {
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
 **unid** | **String**|  | 
 **unisid** | **String**|  | 
 **universityLessonModel** | [**UniversityLessonModel**](UniversityLessonModel.md)|  | 

### Return type

[**Message**](Message.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deleteUniversityLesson

> Message deleteUniversityLesson(unid, unisid, unilid)

Delete University Lesson

Delete a university lesson with given universityID, universitySemesterID and universityLessonID

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';
let defaultClient = Kucukdevapi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new Kucukdevapi.UniversityLessonsApi();
let unid = "unid_example"; // String | 
let unisid = "unisid_example"; // String | 
let unilid = "unilid_example"; // String | 
apiInstance.deleteUniversityLesson(unid, unisid, unilid, (error, data, response) => {
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
 **unid** | **String**|  | 
 **unisid** | **String**|  | 
 **unilid** | **String**|  | 

### Return type

[**Message**](Message.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getSingleLessonWithCode

> UniversityLessonAPIModel getSingleLessonWithCode(unid, code)

Show Lesson With Code

Get a single lesson of a university semester with given universityID and Lesson Code

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';

let apiInstance = new Kucukdevapi.UniversityLessonsApi();
let unid = "unid_example"; // String | 
let code = "code_example"; // String | 
apiInstance.getSingleLessonWithCode(unid, code, (error, data, response) => {
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
 **unid** | **String**|  | 
 **code** | **String**|  | 

### Return type

[**UniversityLessonAPIModel**](UniversityLessonAPIModel.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getSingleUniversitySemesterLesson

> UniversityLessonAPIModel getSingleUniversitySemesterLesson(unid, unisid, unilid)

Show University Lesson

Get a single lesson of a university semester with given universityID, universitySemesterID and universityLessonID

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';

let apiInstance = new Kucukdevapi.UniversityLessonsApi();
let unid = "unid_example"; // String | 
let unisid = "unisid_example"; // String | 
let unilid = "unilid_example"; // String | 
apiInstance.getSingleUniversitySemesterLesson(unid, unisid, unilid, (error, data, response) => {
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
 **unid** | **String**|  | 
 **unisid** | **String**|  | 
 **unilid** | **String**|  | 

### Return type

[**UniversityLessonAPIModel**](UniversityLessonAPIModel.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## listUniversitySemesterLessons

> [UniversityLessonAPIModel] listUniversitySemesterLessons(unid, unisid)

List University Lessons

list all lessons for a semesters of a university with given universityID and universitySemesterID

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';

let apiInstance = new Kucukdevapi.UniversityLessonsApi();
let unid = "unid_example"; // String | 
let unisid = "unisid_example"; // String | 
apiInstance.listUniversitySemesterLessons(unid, unisid, (error, data, response) => {
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
 **unid** | **String**|  | 
 **unisid** | **String**|  | 

### Return type

[**[UniversityLessonAPIModel]**](UniversityLessonAPIModel.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## updateUniversityLesson

> Message updateUniversityLesson(unid, unisid, unilid, universityLessonAPIModel)

Update University Lesson

Update lesson of a university semester with given universityID, universitySemesterID and universityLessonID

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';
let defaultClient = Kucukdevapi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new Kucukdevapi.UniversityLessonsApi();
let unid = "unid_example"; // String | 
let unisid = "unisid_example"; // String | 
let unilid = "unilid_example"; // String | 
let universityLessonAPIModel = new Kucukdevapi.UniversityLessonAPIModel(); // UniversityLessonAPIModel | 
apiInstance.updateUniversityLesson(unid, unisid, unilid, universityLessonAPIModel, (error, data, response) => {
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
 **unid** | **String**|  | 
 **unisid** | **String**|  | 
 **unilid** | **String**|  | 
 **universityLessonAPIModel** | [**UniversityLessonAPIModel**](UniversityLessonAPIModel.md)|  | 

### Return type

[**Message**](Message.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

