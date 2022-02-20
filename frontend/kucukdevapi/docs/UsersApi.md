# Kucukdevapi.UsersApi

All URIs are relative to *http://localhost:8000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createProfessorUser**](UsersApi.md#createProfessorUser) | **POST** /users/professors | Create Professor User
[**createUser**](UsersApi.md#createUser) | **POST** /users | Create User
[**deleteUser**](UsersApi.md#deleteUser) | **DELETE** /users/{uid} | Delete User
[**getCurrentUser**](UsersApi.md#getCurrentUser) | **GET** /users | Get Current
[**getSingleUser**](UsersApi.md#getSingleUser) | **GET** /users/{uid} | Show User
[**updateCurrentSemester**](UsersApi.md#updateCurrentSemester) | **PUT** /users/{uid}/current-semester | Update Current Semester
[**updateCurrentUniversity**](UsersApi.md#updateCurrentUniversity) | **PUT** /users/{uid}/current-university | Update Current University
[**updateEntranceyear**](UsersApi.md#updateEntranceyear) | **PUT** /users/{uid}/entrance-year | Update Entrance Year
[**updatePassword**](UsersApi.md#updatePassword) | **PUT** /users/{uid}/change-password | Update Password



## createProfessorUser

> MessageCreate createProfessorUser(userModel)

Create Professor User

Create a professor user

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';
let defaultClient = Kucukdevapi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new Kucukdevapi.UsersApi();
let userModel = new Kucukdevapi.UserModel(); // UserModel | 
apiInstance.createProfessorUser(userModel, (error, data, response) => {
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
 **userModel** | [**UserModel**](UserModel.md)|  | 

### Return type

[**MessageCreate**](MessageCreate.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## createUser

> MessageCreate createUser(userModel)

Create User

Create a user

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';

let apiInstance = new Kucukdevapi.UsersApi();
let userModel = new Kucukdevapi.UserModel(); // UserModel | 
apiInstance.createUser(userModel, (error, data, response) => {
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
 **userModel** | [**UserModel**](UserModel.md)|  | 

### Return type

[**MessageCreate**](MessageCreate.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deleteUser

> UserAPIModel deleteUser(uid)

Delete User

Delete a user with given userID

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';
let defaultClient = Kucukdevapi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new Kucukdevapi.UsersApi();
let uid = "uid_example"; // String | 
apiInstance.deleteUser(uid, (error, data, response) => {
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

[**UserAPIModel**](UserAPIModel.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getCurrentUser

> UserAPIModel getCurrentUser()

Get Current

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';
let defaultClient = Kucukdevapi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new Kucukdevapi.UsersApi();
apiInstance.getCurrentUser((error, data, response) => {
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

[**UserAPIModel**](UserAPIModel.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getSingleUser

> UserAPIModel getSingleUser(uid)

Show User

Get a single user with given userID

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';
let defaultClient = Kucukdevapi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new Kucukdevapi.UsersApi();
let uid = "uid_example"; // String | 
apiInstance.getSingleUser(uid, (error, data, response) => {
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

[**UserAPIModel**](UserAPIModel.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## updateCurrentSemester

> Message updateCurrentSemester(uid, updateSemesterModel)

Update Current Semester

Update current semester ID of a user with given userID

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';
let defaultClient = Kucukdevapi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new Kucukdevapi.UsersApi();
let uid = "uid_example"; // String | 
let updateSemesterModel = new Kucukdevapi.UpdateSemesterModel(); // UpdateSemesterModel | 
apiInstance.updateCurrentSemester(uid, updateSemesterModel, (error, data, response) => {
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
 **updateSemesterModel** | [**UpdateSemesterModel**](UpdateSemesterModel.md)|  | 

### Return type

[**Message**](Message.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## updateCurrentUniversity

> Message updateCurrentUniversity(uid, updateUniversityModel)

Update Current University

Update current university ID of a user with given userID

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';
let defaultClient = Kucukdevapi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new Kucukdevapi.UsersApi();
let uid = "uid_example"; // String | 
let updateUniversityModel = new Kucukdevapi.UpdateUniversityModel(); // UpdateUniversityModel | 
apiInstance.updateCurrentUniversity(uid, updateUniversityModel, (error, data, response) => {
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
 **updateUniversityModel** | [**UpdateUniversityModel**](UpdateUniversityModel.md)|  | 

### Return type

[**Message**](Message.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## updateEntranceyear

> Message updateEntranceyear(uid, updateEntranceYearModel)

Update Entrance Year

Update entrance year of a user with given userID

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';
let defaultClient = Kucukdevapi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new Kucukdevapi.UsersApi();
let uid = "uid_example"; // String | 
let updateEntranceYearModel = new Kucukdevapi.UpdateEntranceYearModel(); // UpdateEntranceYearModel | 
apiInstance.updateEntranceyear(uid, updateEntranceYearModel, (error, data, response) => {
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
 **updateEntranceYearModel** | [**UpdateEntranceYearModel**](UpdateEntranceYearModel.md)|  | 

### Return type

[**Message**](Message.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## updatePassword

> Message updatePassword(uid, updatePasswordModel)

Update Password

Update password of a user with given userID

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';
let defaultClient = Kucukdevapi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new Kucukdevapi.UsersApi();
let uid = "uid_example"; // String | 
let updatePasswordModel = new Kucukdevapi.UpdatePasswordModel(); // UpdatePasswordModel | 
apiInstance.updatePassword(uid, updatePasswordModel, (error, data, response) => {
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
 **updatePasswordModel** | [**UpdatePasswordModel**](UpdatePasswordModel.md)|  | 

### Return type

[**Message**](Message.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

