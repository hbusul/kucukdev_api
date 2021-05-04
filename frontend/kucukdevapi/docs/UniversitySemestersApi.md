# Kucukdevapi.UniversitySemestersApi

All URIs are relative to *http://localhost:8000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createUniversitySemester**](UniversitySemestersApi.md#createUniversitySemester) | **POST** /universities/{unid}/semesters | Create University Semester
[**deleteUniversitySemester**](UniversitySemestersApi.md#deleteUniversitySemester) | **DELETE** /universities/{unid}/semesters/{unisid} | Delete University Semester
[**getSingleUniversitySemesters**](UniversitySemestersApi.md#getSingleUniversitySemesters) | **GET** /universities/{unid}/semesters/{unisid} | Show University Semester
[**listUniversitySemesters**](UniversitySemestersApi.md#listUniversitySemesters) | **GET** /universities/{unid}/semesters | List University Semesters
[**updateUniversitySemester**](UniversitySemestersApi.md#updateUniversitySemester) | **PUT** /universities/{unid}/semesters/{unisid} | Update University Semester



## createUniversitySemester

> UniversitySemesterModel createUniversitySemester(unid, universitySemesterModel)

Create University Semester

Create semester for a university with given universityID

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';
let defaultClient = Kucukdevapi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new Kucukdevapi.UniversitySemestersApi();
let unid = "unid_example"; // String | 
let universitySemesterModel = new Kucukdevapi.UniversitySemesterModel(); // UniversitySemesterModel | 
apiInstance.createUniversitySemester(unid, universitySemesterModel, (error, data, response) => {
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
 **universitySemesterModel** | [**UniversitySemesterModel**](UniversitySemesterModel.md)|  | 

### Return type

[**UniversitySemesterModel**](UniversitySemesterModel.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deleteUniversitySemester

> Message deleteUniversitySemester(unid, unisid)

Delete University Semester

Delete a university semester with given universityID and universitySemesterID

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';
let defaultClient = Kucukdevapi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new Kucukdevapi.UniversitySemestersApi();
let unid = "unid_example"; // String | 
let unisid = "unisid_example"; // String | 
apiInstance.deleteUniversitySemester(unid, unisid, (error, data, response) => {
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

[**Message**](Message.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getSingleUniversitySemesters

> [UniversitySemesterModel] getSingleUniversitySemesters(unid, unisid)

Show University Semester

Get a single semester of a university with given universityID and universitySemesterID

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';

let apiInstance = new Kucukdevapi.UniversitySemestersApi();
let unid = "unid_example"; // String | 
let unisid = "unisid_example"; // String | 
apiInstance.getSingleUniversitySemesters(unid, unisid, (error, data, response) => {
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

[**[UniversitySemesterModel]**](UniversitySemesterModel.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## listUniversitySemesters

> [UniversitySemesterModel] listUniversitySemesters(unid)

List University Semesters

list all semesters of a university with given universityID

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';

let apiInstance = new Kucukdevapi.UniversitySemestersApi();
let unid = "unid_example"; // String | 
apiInstance.listUniversitySemesters(unid, (error, data, response) => {
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

[**[UniversitySemesterModel]**](UniversitySemesterModel.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## updateUniversitySemester

> Message updateUniversitySemester(unid, unisid, universitySemesterModel)

Update University Semester

Update university of a semester with given universityID and universitySemesterID

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';
let defaultClient = Kucukdevapi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new Kucukdevapi.UniversitySemestersApi();
let unid = "unid_example"; // String | 
let unisid = "unisid_example"; // String | 
let universitySemesterModel = new Kucukdevapi.UniversitySemesterModel(); // UniversitySemesterModel | 
apiInstance.updateUniversitySemester(unid, unisid, universitySemesterModel, (error, data, response) => {
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
 **universitySemesterModel** | [**UniversitySemesterModel**](UniversitySemesterModel.md)|  | 

### Return type

[**Message**](Message.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

