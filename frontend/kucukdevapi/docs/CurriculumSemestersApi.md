# Kucukdevapi.CurriculumSemestersApi

All URIs are relative to *http://localhost:8000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createCurriculumSemester**](CurriculumSemestersApi.md#createCurriculumSemester) | **POST** /universities/{unid}/departments/{depid}/curriculums/{curid}/semesters | Create Curriculum Semester
[**deleteCurriculumSemester**](CurriculumSemestersApi.md#deleteCurriculumSemester) | **DELETE** /universities/{unid}/departments/{depid}/curriculums/{curid}/semesters/{cursid} | Delete Curriculum Semester
[**getSingleCurriculumSemester**](CurriculumSemestersApi.md#getSingleCurriculumSemester) | **GET** /universities/{unid}/departments/{depid}/curriculums/{curid}/semesters/{cursid} | Show Curriculum Semester
[**listCurriculumSemesters**](CurriculumSemestersApi.md#listCurriculumSemesters) | **GET** /universities/{unid}/departments/{depid}/curriculums/{curid}/semesters | List Curriculum Semesters
[**updateCurriculumSemester**](CurriculumSemestersApi.md#updateCurriculumSemester) | **PUT** /universities/{unid}/departments/{depid}/curriculums/{curid}/semesters/{cursid} | Update Curriculum Semester



## createCurriculumSemester

> MessageCreate createCurriculumSemester(unid, depid, curid, curriculumSemesterModel)

Create Curriculum Semester

Create semester for a curriculum with given universityID, universityDepartmentID and departmentCurriculumID

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';
let defaultClient = Kucukdevapi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new Kucukdevapi.CurriculumSemestersApi();
let unid = "unid_example"; // String | 
let depid = "depid_example"; // String | 
let curid = "curid_example"; // String | 
let curriculumSemesterModel = new Kucukdevapi.CurriculumSemesterModel(); // CurriculumSemesterModel | 
apiInstance.createCurriculumSemester(unid, depid, curid, curriculumSemesterModel, (error, data, response) => {
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
 **curriculumSemesterModel** | [**CurriculumSemesterModel**](CurriculumSemesterModel.md)|  | 

### Return type

[**MessageCreate**](MessageCreate.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deleteCurriculumSemester

> Message deleteCurriculumSemester(unid, depid, curid, cursid)

Delete Curriculum Semester

Delete a university department with given universityID, universityDepartmentID, departmentCurriculumID and curriculumSemesterID

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';
let defaultClient = Kucukdevapi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new Kucukdevapi.CurriculumSemestersApi();
let unid = "unid_example"; // String | 
let depid = "depid_example"; // String | 
let curid = "curid_example"; // String | 
let cursid = "cursid_example"; // String | 
apiInstance.deleteCurriculumSemester(unid, depid, curid, cursid, (error, data, response) => {
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

[**Message**](Message.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getSingleCurriculumSemester

> CurriculumSemesterModel getSingleCurriculumSemester(unid, depid, curid, cursid)

Show Curriculum Semester

Get a single semester of a curriculum with given universityID, universityDepartmentID, departmentCurriculumID and curriculumSemesterID

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';

let apiInstance = new Kucukdevapi.CurriculumSemestersApi();
let unid = "unid_example"; // String | 
let depid = "depid_example"; // String | 
let curid = "curid_example"; // String | 
let cursid = "cursid_example"; // String | 
apiInstance.getSingleCurriculumSemester(unid, depid, curid, cursid, (error, data, response) => {
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

[**CurriculumSemesterModel**](CurriculumSemesterModel.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## listCurriculumSemesters

> [CurriculumSemesterModel] listCurriculumSemesters(unid, depid, curid)

List Curriculum Semesters

list all semesters of a curriculum of a department with given universityID, universityDepartmentID and departmentCurriculumID

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';

let apiInstance = new Kucukdevapi.CurriculumSemestersApi();
let unid = "unid_example"; // String | 
let depid = "depid_example"; // String | 
let curid = "curid_example"; // String | 
apiInstance.listCurriculumSemesters(unid, depid, curid, (error, data, response) => {
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

[**[CurriculumSemesterModel]**](CurriculumSemesterModel.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## updateCurriculumSemester

> Message updateCurriculumSemester(unid, depid, curid, cursid, curriculumSemesterModel)

Update Curriculum Semester

Update semester of a curriculum with given universityID, universityDepartmentID, departmentCurriculumID and curriculumSemesterID

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';
let defaultClient = Kucukdevapi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new Kucukdevapi.CurriculumSemestersApi();
let unid = "unid_example"; // String | 
let depid = "depid_example"; // String | 
let curid = "curid_example"; // String | 
let cursid = "cursid_example"; // String | 
let curriculumSemesterModel = new Kucukdevapi.CurriculumSemesterModel(); // CurriculumSemesterModel | 
apiInstance.updateCurriculumSemester(unid, depid, curid, cursid, curriculumSemesterModel, (error, data, response) => {
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
 **curriculumSemesterModel** | [**CurriculumSemesterModel**](CurriculumSemesterModel.md)|  | 

### Return type

[**Message**](Message.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

