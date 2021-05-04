# Kucukdevapi.CurriculumLessonsApi

All URIs are relative to *http://localhost:8000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createCurriculumLesson**](CurriculumLessonsApi.md#createCurriculumLesson) | **POST** /universities/{unid}/departments/{depid}/curriculums/{curid}/semesters{cursid}/lessons | Create Curriculum Lesson
[**deleteCurriculumLesson**](CurriculumLessonsApi.md#deleteCurriculumLesson) | **DELETE** /universities/{unid}/departments/{depid}/curriculums/{curid}/semesters/{cursid}/lessons/{curlid} | Delete Curriculum Lesson
[**getSingleCurriculumLesson**](CurriculumLessonsApi.md#getSingleCurriculumLesson) | **GET** /universities/{unid}/departments/{depid}/curriculums/{curid}/semesters/{cursid}/lessons/{curlid} | Show Curriculum Lesson
[**listCurriculumLessons**](CurriculumLessonsApi.md#listCurriculumLessons) | **GET** /universities/{unid}/departments/{depid}/curriculums/{curid}/semesters{cursid}/lessons | List Curriculum Lessons
[**updateCurriculumLesson**](CurriculumLessonsApi.md#updateCurriculumLesson) | **PUT** /universities/{unid}/departments/{depid}/curriculums/{curid}/semesters/{cursid}/lessons/{curlid} | Update Curriculum Lesson



## createCurriculumLesson

> CurriculumLessonModel createCurriculumLesson(unid, depid, curid, cursid, curriculumLessonModel)

Create Curriculum Lesson

Create lesson for a curriculum semester with given universityID, universityDepartmentID, departmentCurriculumID and curriculumSemesterID

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';
let defaultClient = Kucukdevapi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new Kucukdevapi.CurriculumLessonsApi();
let unid = "unid_example"; // String | 
let depid = "depid_example"; // String | 
let curid = "curid_example"; // String | 
let cursid = "cursid_example"; // String | 
let curriculumLessonModel = new Kucukdevapi.CurriculumLessonModel(); // CurriculumLessonModel | 
apiInstance.createCurriculumLesson(unid, depid, curid, cursid, curriculumLessonModel, (error, data, response) => {
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
 **depid** | **String**|  | 
 **curid** | **String**|  | 
 **cursid** | **String**|  | 
 **curriculumLessonModel** | [**CurriculumLessonModel**](CurriculumLessonModel.md)|  | 

### Return type

[**CurriculumLessonModel**](CurriculumLessonModel.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deleteCurriculumLesson

> Message deleteCurriculumLesson(unid, depid, curid, cursid, curlid)

Delete Curriculum Lesson

Delete a university department with given universityID, universityDepartmentID, departmentCurriculumID, curriculumSemesterID and curriculumLessonID

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';
let defaultClient = Kucukdevapi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new Kucukdevapi.CurriculumLessonsApi();
let unid = "unid_example"; // String | 
let depid = "depid_example"; // String | 
let curid = "curid_example"; // String | 
let cursid = "cursid_example"; // String | 
let curlid = "curlid_example"; // String | 
apiInstance.deleteCurriculumLesson(unid, depid, curid, cursid, curlid, (error, data, response) => {
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
 **depid** | **String**|  | 
 **curid** | **String**|  | 
 **cursid** | **String**|  | 
 **curlid** | **String**|  | 

### Return type

[**Message**](Message.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getSingleCurriculumLesson

> CurriculumLessonModel getSingleCurriculumLesson(unid, depid, curid, cursid, curlid)

Show Curriculum Lesson

Get a single semester of a curriculum with given universityID, universityDepartmentID, departmentCurriculumID, curriculumSemesterID and curriculumLessonID

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';

let apiInstance = new Kucukdevapi.CurriculumLessonsApi();
let unid = "unid_example"; // String | 
let depid = "depid_example"; // String | 
let curid = "curid_example"; // String | 
let cursid = "cursid_example"; // String | 
let curlid = "curlid_example"; // String | 
apiInstance.getSingleCurriculumLesson(unid, depid, curid, cursid, curlid, (error, data, response) => {
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
 **depid** | **String**|  | 
 **curid** | **String**|  | 
 **cursid** | **String**|  | 
 **curlid** | **String**|  | 

### Return type

[**CurriculumLessonModel**](CurriculumLessonModel.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## listCurriculumLessons

> [CurriculumLessonModel] listCurriculumLessons(unid, depid, curid, cursid)

List Curriculum Lessons

list all lessons of a curriculum semester of a department with given universityID, universityDepartmentID, departmentCurriculumID and curriculumSemesterID

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';

let apiInstance = new Kucukdevapi.CurriculumLessonsApi();
let unid = "unid_example"; // String | 
let depid = "depid_example"; // String | 
let curid = "curid_example"; // String | 
let cursid = "cursid_example"; // String | 
apiInstance.listCurriculumLessons(unid, depid, curid, cursid, (error, data, response) => {
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
 **depid** | **String**|  | 
 **curid** | **String**|  | 
 **cursid** | **String**|  | 

### Return type

[**[CurriculumLessonModel]**](CurriculumLessonModel.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## updateCurriculumLesson

> Message updateCurriculumLesson(unid, depid, curid, cursid, curlid, curriculumLessonModel)

Update Curriculum Lesson

Update semester of a curriculum with given universityID, universityDepartmentID, departmentCurriculumID, curriculumSemesterID and curriculumLessonID

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';
let defaultClient = Kucukdevapi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new Kucukdevapi.CurriculumLessonsApi();
let unid = "unid_example"; // String | 
let depid = "depid_example"; // String | 
let curid = "curid_example"; // String | 
let cursid = "cursid_example"; // String | 
let curlid = "curlid_example"; // String | 
let curriculumLessonModel = new Kucukdevapi.CurriculumLessonModel(); // CurriculumLessonModel | 
apiInstance.updateCurriculumLesson(unid, depid, curid, cursid, curlid, curriculumLessonModel, (error, data, response) => {
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
 **depid** | **String**|  | 
 **curid** | **String**|  | 
 **cursid** | **String**|  | 
 **curlid** | **String**|  | 
 **curriculumLessonModel** | [**CurriculumLessonModel**](CurriculumLessonModel.md)|  | 

### Return type

[**Message**](Message.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

