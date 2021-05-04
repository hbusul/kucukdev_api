# Kucukdevapi.SchedulerApi

All URIs are relative to *http://localhost:8000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createSchedule**](SchedulerApi.md#createSchedule) | **POST** /universities/{unid}/schedule | Create Schedule



## createSchedule

> [{String: Number}] createSchedule(unid, requestBody)

Create Schedule

Create schedules for given lessons

### Example

```javascript
import Kucukdevapi from 'kucukdevapi';

let apiInstance = new Kucukdevapi.SchedulerApi();
let unid = "unid_example"; // String | 
let requestBody = ["null"]; // [String] | 
apiInstance.createSchedule(unid, requestBody, (error, data, response) => {
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
 **requestBody** | [**[String]**](String.md)|  | 

### Return type

**[{String: Number}]**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

