# Kucukdevapi.DepartmentsApi

All URIs are relative to *http://localhost:8000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createUniversityDepartment**](DepartmentsApi.md#createUniversityDepartment) | **POST** /universities/{unid}/departments | Create University Department
[**deleteUniversityDepartment**](DepartmentsApi.md#deleteUniversityDepartment) | **DELETE** /universities/{unid}/departments/{depid} | Delete University Department
[**getSingleUniversityDepartment**](DepartmentsApi.md#getSingleUniversityDepartment) | **GET** /universities/{unid}/departments/{depid} | Show University Department
[**listUniversityDepartments**](DepartmentsApi.md#listUniversityDepartments) | **GET** /universities/{unid}/departments | List University Departments
[**updateUniversityDepartment**](DepartmentsApi.md#updateUniversityDepartment) | **PUT** /universities/{unid}/departments/{depid} | Update University Department



## createUniversityDepartment

> UniversityDepartmentModel createUniversityDepartment(unid, universityDepartmentModel)

Create University Department

Create department for a university with given universityID

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';
let defaultClient = Kucukdevapi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new Kucukdevapi.DepartmentsApi();
let unid = "unid_example"; // String | 
let universityDepartmentModel = new Kucukdevapi.UniversityDepartmentModel(); // UniversityDepartmentModel | 
apiInstance.createUniversityDepartment(unid, universityDepartmentModel, (error, data, response) => {
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
 **universityDepartmentModel** | [**UniversityDepartmentModel**](UniversityDepartmentModel.md)|  | 

### Return type

[**UniversityDepartmentModel**](UniversityDepartmentModel.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deleteUniversityDepartment

> Message deleteUniversityDepartment(unid, depid)

Delete University Department

Delete a university department with given universityID and universitySemesterID

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';
let defaultClient = Kucukdevapi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new Kucukdevapi.DepartmentsApi();
let unid = "unid_example"; // String | 
let depid = "depid_example"; // String | 
apiInstance.deleteUniversityDepartment(unid, depid, (error, data, response) => {
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

[**Message**](Message.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getSingleUniversityDepartment

> UniversityDepartmentModel getSingleUniversityDepartment(unid, depid)

Show University Department

Get a single semester of a university with given universityID and universityDepartmentID

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';

let apiInstance = new Kucukdevapi.DepartmentsApi();
let unid = "unid_example"; // String | 
let depid = "depid_example"; // String | 
apiInstance.getSingleUniversityDepartment(unid, depid, (error, data, response) => {
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

[**UniversityDepartmentModel**](UniversityDepartmentModel.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## listUniversityDepartments

> [UniversityDepartmentModel] listUniversityDepartments(unid)

List University Departments

list all departments of a university with given universityID

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';

let apiInstance = new Kucukdevapi.DepartmentsApi();
let unid = "unid_example"; // String | 
apiInstance.listUniversityDepartments(unid, (error, data, response) => {
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

### Return type

[**[UniversityDepartmentModel]**](UniversityDepartmentModel.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## updateUniversityDepartment

> Message updateUniversityDepartment(unid, depid, universityDepartmentModel)

Update University Department

Update department of a university with given universityID and universityDepartmentID

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';
let defaultClient = Kucukdevapi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new Kucukdevapi.DepartmentsApi();
let unid = "unid_example"; // String | 
let depid = "depid_example"; // String | 
let universityDepartmentModel = new Kucukdevapi.UniversityDepartmentModel(); // UniversityDepartmentModel | 
apiInstance.updateUniversityDepartment(unid, depid, universityDepartmentModel, (error, data, response) => {
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
 **universityDepartmentModel** | [**UniversityDepartmentModel**](UniversityDepartmentModel.md)|  | 

### Return type

[**Message**](Message.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

