# Kucukdevapi.UniversitiesApi

All URIs are relative to *http://localhost:8000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createUniversity**](UniversitiesApi.md#createUniversity) | **POST** /universities | Create University
[**deleteUniversity**](UniversitiesApi.md#deleteUniversity) | **DELETE** /universities/{unid} | Delete University
[**getCurrentUniversitySemester**](UniversitiesApi.md#getCurrentUniversitySemester) | **GET** /universities/{unid}/current-semester | Show University Current Semester
[**getSingleUniversity**](UniversitiesApi.md#getSingleUniversity) | **GET** /universities/{unid} | Show University
[**listUniversities**](UniversitiesApi.md#listUniversities) | **GET** /universities | List Universities
[**updateUniversityCurrentSemester**](UniversitiesApi.md#updateUniversityCurrentSemester) | **PUT** /universities/{unid}/current-semester | Update University Current Semester
[**updateUniversityName**](UniversitiesApi.md#updateUniversityName) | **PUT** /universities/{unid}/update-name | Update University Name



## createUniversity

> MessageCreate createUniversity(universityModel)

Create University

Create a university

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';
let defaultClient = Kucukdevapi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new Kucukdevapi.UniversitiesApi();
let universityModel = new Kucukdevapi.UniversityModel(); // UniversityModel | 
apiInstance.createUniversity(universityModel, (error, data, response) => {
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
 **universityModel** | [**UniversityModel**](UniversityModel.md)|  | 

### Return type

[**MessageCreate**](MessageCreate.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deleteUniversity

> Message deleteUniversity(unid)

Delete University

Delete a university with given universityID

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';
let defaultClient = Kucukdevapi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new Kucukdevapi.UniversitiesApi();
let unid = "unid_example"; // String | 
apiInstance.deleteUniversity(unid, (error, data, response) => {
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

[**Message**](Message.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getCurrentUniversitySemester

> UniversitySemesterModel getCurrentUniversitySemester(unid)

Show University Current Semester

Get current semester of a university with given universityID

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';

let apiInstance = new Kucukdevapi.UniversitiesApi();
let unid = "unid_example"; // String | 
apiInstance.getCurrentUniversitySemester(unid, (error, data, response) => {
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

[**UniversitySemesterModel**](UniversitySemesterModel.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getSingleUniversity

> UniversityAPIModel getSingleUniversity(unid)

Show University

Get a single university with given universityID

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';

let apiInstance = new Kucukdevapi.UniversitiesApi();
let unid = "unid_example"; // String | 
apiInstance.getSingleUniversity(unid, (error, data, response) => {
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

[**UniversityAPIModel**](UniversityAPIModel.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## listUniversities

> [UniversityAPIModel] listUniversities()

List Universities

list all universities

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';

let apiInstance = new Kucukdevapi.UniversitiesApi();
apiInstance.listUniversities((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**[UniversityAPIModel]**](UniversityAPIModel.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## updateUniversityCurrentSemester

> Message updateUniversityCurrentSemester(unid, updateSemesterModel)

Update University Current Semester

Update current semester of a university with given universityID

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';
let defaultClient = Kucukdevapi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new Kucukdevapi.UniversitiesApi();
let unid = "unid_example"; // String | 
let updateSemesterModel = new Kucukdevapi.UpdateSemesterModel(); // UpdateSemesterModel | 
apiInstance.updateUniversityCurrentSemester(unid, updateSemesterModel, (error, data, response) => {
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
 **updateSemesterModel** | [**UpdateSemesterModel**](UpdateSemesterModel.md)|  | 

### Return type

[**Message**](Message.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## updateUniversityName

> Message updateUniversityName(unid, updateUniversityNameModel)

Update University Name

Update name of a university with given universityID

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';
let defaultClient = Kucukdevapi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new Kucukdevapi.UniversitiesApi();
let unid = "unid_example"; // String | 
let updateUniversityNameModel = new Kucukdevapi.UpdateUniversityNameModel(); // UpdateUniversityNameModel | 
apiInstance.updateUniversityName(unid, updateUniversityNameModel, (error, data, response) => {
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
 **updateUniversityNameModel** | [**UpdateUniversityNameModel**](UpdateUniversityNameModel.md)|  | 

### Return type

[**Message**](Message.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

