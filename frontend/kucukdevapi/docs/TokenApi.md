# Kucukdevapi.TokenApi

All URIs are relative to *http://localhost:8000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**loginForAccessTokenTokenPost**](TokenApi.md#loginForAccessTokenTokenPost) | **POST** /token | Login For Access Token



## loginForAccessTokenTokenPost

> Token loginForAccessTokenTokenPost(username, password, opts)

Login For Access Token

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';

let apiInstance = new Kucukdevapi.TokenApi();
let username = "username_example"; // String | 
let password = "password_example"; // String | 
let opts = {
  'grantType': "grantType_example", // String | 
  'scope': "''", // String | 
  'clientId': "clientId_example", // String | 
  'clientSecret': "clientSecret_example" // String | 
};
apiInstance.loginForAccessTokenTokenPost(username, password, opts, (error, data, response) => {
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
 **username** | **String**|  | 
 **password** | **String**|  | 
 **grantType** | **String**|  | [optional] 
 **scope** | **String**|  | [optional] [default to &#39;&#39;]
 **clientId** | **String**|  | [optional] 
 **clientSecret** | **String**|  | [optional] 

### Return type

[**Token**](Token.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/x-www-form-urlencoded
- **Accept**: application/json

