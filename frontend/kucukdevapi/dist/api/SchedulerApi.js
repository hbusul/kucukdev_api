"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _HTTPValidationError = _interopRequireDefault(require("../model/HTTPValidationError"));

var _Message = _interopRequireDefault(require("../model/Message"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/**
* Scheduler service.
* @module api/SchedulerApi
* @version 1.0.0
*/
var SchedulerApi = /*#__PURE__*/function () {
  /**
  * Constructs a new SchedulerApi. 
  * @alias module:api/SchedulerApi
  * @class
  * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
  * default to {@link module:ApiClient#instance} if unspecified.
  */
  function SchedulerApi(apiClient) {
    _classCallCheck(this, SchedulerApi);

    this.apiClient = apiClient || _ApiClient.default.instance;
  }
  /**
   * Callback function to receive the result of the createSchedule operation.
   * @callback module:api/SchedulerApi~createScheduleCallback
   * @param {String} error Error message, if any.
   * @param {Array.<{String: Number}>} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Create Schedule
   * Create schedules for given lessons
   * @param {String} unid 
   * @param {Array.<String>} requestBody 
   * @param {module:api/SchedulerApi~createScheduleCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link Array.<{String: Number}>}
   */


  _createClass(SchedulerApi, [{
    key: "createSchedule",
    value: function createSchedule(unid, requestBody, callback) {
      var postBody = requestBody; // verify the required parameter 'unid' is set

      if (unid === undefined || unid === null) {
        throw new Error("Missing the required parameter 'unid' when calling createSchedule");
      } // verify the required parameter 'requestBody' is set


      if (requestBody === undefined || requestBody === null) {
        throw new Error("Missing the required parameter 'requestBody' when calling createSchedule");
      }

      var pathParams = {
        'unid': unid
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = [];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = [{
        'String': 'Number'
      }];
      return this.apiClient.callApi('/universities/{unid}/schedule', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
  }]);

  return SchedulerApi;
}();

exports.default = SchedulerApi;