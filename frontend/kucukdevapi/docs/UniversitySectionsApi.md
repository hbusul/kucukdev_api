# Kucukdevapi.UniversitySectionsApi

All URIs are relative to *http://localhost:8000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**deleteLessonSection**](UniversitySectionsApi.md#deleteLessonSection) | **DELETE** /universities/{unid}/semesters/{unisid}/lessons/{unilid}/sections/{secid} | Delete Lesson Section
[**updateLessonSection**](UniversitySectionsApi.md#updateLessonSection) | **PUT** /universities/{unid}/semesters/{unisid}/lessons/{unilid}/sections/{secid} | Update Lesson Section



## deleteLessonSection

> Message deleteLessonSection(unid, unisid, unilid, secid)

Delete Lesson Section

Delete a lesson section with given universityID, universitySemesterID, universityLessonID and sectionID

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';
let defaultClient = Kucukdevapi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new Kucukdevapi.UniversitySectionsApi();
let unid = "unid_example"; // String | 
let unisid = "unisid_example"; // String | 
let unilid = "unilid_example"; // String | 
let secid = "secid_example"; // String | 
apiInstance.deleteLessonSection(unid, unisid, unilid, secid, (error, data, response) => {
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
 **secid** | **String**|  | 

### Return type

[**Message**](Message.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## updateLessonSection

> Message updateLessonSection(unid, unisid, unilid, secid, universitySectionModel)

Update Lesson Section

Update section of a lesson with given universityID, universitySemesterID, universityLessonID and sectionID

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';
let defaultClient = Kucukdevapi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new Kucukdevapi.UniversitySectionsApi();
let unid = "unid_example"; // String | 
let unisid = "unisid_example"; // String | 
let unilid = "unilid_example"; // String | 
let secid = "secid_example"; // String | 
let universitySectionModel = new Kucukdevapi.UniversitySectionModel(); // UniversitySectionModel | 
apiInstance.updateLessonSection(unid, unisid, unilid, secid, universitySectionModel, (error, data, response) => {
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
 **secid** | **String**|  | 
 **universitySectionModel** | [**UniversitySectionModel**](UniversitySectionModel.md)|  | 

### Return type

[**Message**](Message.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

