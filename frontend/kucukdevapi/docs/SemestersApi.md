# Kucukdevapi.SemestersApi

All URIs are relative to *http://localhost:8000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createSemester**](SemestersApi.md#createSemester) | **POST** /users/{uid}/semesters | Create Semester
[**deleteSemester**](SemestersApi.md#deleteSemester) | **DELETE** /users/{uid}/semesters/{sid} | Delete Semester
[**getSingleSemester**](SemestersApi.md#getSingleSemester) | **GET** /users/{uid}/semesters/{sid} | Show Semester
[**listSemestersOfUser**](SemestersApi.md#listSemestersOfUser) | **GET** /users/{uid}/semesters | List Semesters
[**updateSemester**](SemestersApi.md#updateSemester) | **PUT** /users/{uid}/semesters/{sid} | Update Semester



## createSemester

> MessageCreate createSemester(uid, userSemesterModel)

Create Semester

Create a semester for a user with given userID

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';
let defaultClient = Kucukdevapi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new Kucukdevapi.SemestersApi();
let uid = "uid_example"; // String | 
let userSemesterModel = new Kucukdevapi.UserSemesterModel(); // UserSemesterModel | 
apiInstance.createSemester(uid, userSemesterModel, (error, data, response) => {
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
 **userSemesterModel** | [**UserSemesterModel**](UserSemesterModel.md)|  | 

### Return type

[**MessageCreate**](MessageCreate.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deleteSemester

> Message deleteSemester(uid, sid)

Delete Semester

Delete a semester with given userID and semesterID

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';
let defaultClient = Kucukdevapi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new Kucukdevapi.SemestersApi();
let uid = "uid_example"; // String | 
let sid = "sid_example"; // String | 
apiInstance.deleteSemester(uid, sid, (error, data, response) => {
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

[**Message**](Message.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getSingleSemester

> SemesterAPIModel getSingleSemester(uid, sid)

Show Semester

Get a single semester with given userID and semesterID

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';
let defaultClient = Kucukdevapi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new Kucukdevapi.SemestersApi();
let uid = "uid_example"; // String | 
let sid = "sid_example"; // String | 
apiInstance.getSingleSemester(uid, sid, (error, data, response) => {
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

[**SemesterAPIModel**](SemesterAPIModel.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## listSemestersOfUser

> [SemesterAPIModel] listSemestersOfUser(uid)

List Semesters

list all semesters of a user with given userID

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';
let defaultClient = Kucukdevapi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new Kucukdevapi.SemestersApi();
let uid = "uid_example"; // String | 
apiInstance.listSemestersOfUser(uid, (error, data, response) => {
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

### Return type

[**[SemesterAPIModel]**](SemesterAPIModel.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## updateSemester

> Message updateSemester(uid, sid, updateUserSemesterModel)

Update Semester

Update a semester with given userID and semesterID

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';
let defaultClient = Kucukdevapi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new Kucukdevapi.SemestersApi();
let uid = "uid_example"; // String | 
let sid = "sid_example"; // String | 
let updateUserSemesterModel = new Kucukdevapi.UpdateUserSemesterModel(); // UpdateUserSemesterModel | 
apiInstance.updateSemester(uid, sid, updateUserSemesterModel, (error, data, response) => {
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
 **updateUserSemesterModel** | [**UpdateUserSemesterModel**](UpdateUserSemesterModel.md)|  | 

### Return type

[**Message**](Message.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

