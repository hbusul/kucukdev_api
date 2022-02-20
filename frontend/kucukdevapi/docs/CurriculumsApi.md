# Kucukdevapi.CurriculumsApi

All URIs are relative to *http://localhost:8000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createUniversityDepartmentCurriculum**](CurriculumsApi.md#createUniversityDepartmentCurriculum) | **POST** /universities/{unid}/departments/{depid}/curriculums | Create Department Curriculum
[**deleteUniversityDepartmentCurriculum**](CurriculumsApi.md#deleteUniversityDepartmentCurriculum) | **DELETE** /universities/{unid}/departments/{depid}/curriculums/{curid} | Delete Department Curriculum
[**getSingleUniversityDepartmentCurriculum**](CurriculumsApi.md#getSingleUniversityDepartmentCurriculum) | **GET** /universities/{unid}/departments/{depid}/curriculums/{curid} | Show Department Curriculum
[**listUniversityDepartmentCurriculums**](CurriculumsApi.md#listUniversityDepartmentCurriculums) | **GET** /universities/{unid}/departments/{depid}/curriculums | List Department Curriculums
[**updateUniversityDepartmentCurriculum**](CurriculumsApi.md#updateUniversityDepartmentCurriculum) | **PUT** /universities/{unid}/departments/{depid}/curriculums/{curid} | Update Department Curriculum



## createUniversityDepartmentCurriculum

> MessageCreate createUniversityDepartmentCurriculum(unid, depid, universityCurriculumModel)

Create Department Curriculum

Create department for a university with given universityID and universityDepartmentID

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';
let defaultClient = Kucukdevapi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new Kucukdevapi.CurriculumsApi();
let unid = "unid_example"; // String | 
let depid = "depid_example"; // String | 
let universityCurriculumModel = new Kucukdevapi.UniversityCurriculumModel(); // UniversityCurriculumModel | 
apiInstance.createUniversityDepartmentCurriculum(unid, depid, universityCurriculumModel, (error, data, response) => {
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
 **universityCurriculumModel** | [**UniversityCurriculumModel**](UniversityCurriculumModel.md)|  | 

### Return type

[**MessageCreate**](MessageCreate.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deleteUniversityDepartmentCurriculum

> Message deleteUniversityDepartmentCurriculum(unid, depid, curid)

Delete Department Curriculum

Delete a university department with given universityID, universityDepartmentID and departmentCurriculumID

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';
let defaultClient = Kucukdevapi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new Kucukdevapi.CurriculumsApi();
let unid = "unid_example"; // String | 
let depid = "depid_example"; // String | 
let curid = "curid_example"; // String | 
apiInstance.deleteUniversityDepartmentCurriculum(unid, depid, curid, (error, data, response) => {
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

### Return type

[**Message**](Message.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getSingleUniversityDepartmentCurriculum

> UniversityCurriculumModel getSingleUniversityDepartmentCurriculum(unid, depid, curid)

Show Department Curriculum

Get a single semester of a university with given universityID, universityDepartmentID and departmentCurriculumID

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';

let apiInstance = new Kucukdevapi.CurriculumsApi();
let unid = "unid_example"; // String | 
let depid = "depid_example"; // String | 
let curid = "curid_example"; // String | 
apiInstance.getSingleUniversityDepartmentCurriculum(unid, depid, curid, (error, data, response) => {
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

### Return type

[**UniversityCurriculumModel**](UniversityCurriculumModel.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## listUniversityDepartmentCurriculums

> [UniversityCurriculumModel] listUniversityDepartmentCurriculums(unid, depid)

List Department Curriculums

list all curriculums of a department of a university with given universityID and universityDepartmentID

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';

let apiInstance = new Kucukdevapi.CurriculumsApi();
let unid = "unid_example"; // String | 
let depid = "depid_example"; // String | 
apiInstance.listUniversityDepartmentCurriculums(unid, depid, (error, data, response) => {
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

### Return type

[**[UniversityCurriculumModel]**](UniversityCurriculumModel.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## updateUniversityDepartmentCurriculum

> Message updateUniversityDepartmentCurriculum(unid, depid, curid, universityCurriculumModel)

Update Department Curriculum

Update department of a university with given universityID, universityDepartmentID and departmentCurriculumID

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';
let defaultClient = Kucukdevapi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new Kucukdevapi.CurriculumsApi();
let unid = "unid_example"; // String | 
let depid = "depid_example"; // String | 
let curid = "curid_example"; // String | 
let universityCurriculumModel = new Kucukdevapi.UniversityCurriculumModel(); // UniversityCurriculumModel | 
apiInstance.updateUniversityDepartmentCurriculum(unid, depid, curid, universityCurriculumModel, (error, data, response) => {
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
 **universityCurriculumModel** | [**UniversityCurriculumModel**](UniversityCurriculumModel.md)|  | 

### Return type

[**Message**](Message.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

