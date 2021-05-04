"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _HTTPValidationError = _interopRequireDefault(require("../model/HTTPValidationError"));

var _Message = _interopRequireDefault(require("../model/Message"));

var _UniversityDepartmentModel = _interopRequireDefault(require("../model/UniversityDepartmentModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
* Departments service.
* @module api/DepartmentsApi
* @version 1.0.0
*/
var DepartmentsApi = /*#__PURE__*/function () {
  /**
  * Constructs a new DepartmentsApi. 
  * @alias module:api/DepartmentsApi
  * @class
  * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
  * default to {@link module:ApiClient#instance} if unspecified.
  */
  function DepartmentsApi(apiClient) {
    _classCallCheck(this, DepartmentsApi);

    this.apiClient = apiClient || _ApiClient.default.instance;
  }
  /**
   * Callback function to receive the result of the createUniversityDepartment operation.
   * @callback module:api/DepartmentsApi~createUniversityDepartmentCallback
   * @param {String} error Error message, if any.
   * @param {module:model/UniversityDepartmentModel} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Create University Department
   * Create department for a university with given universityID
   * @param {String} unid 
   * @param {module:model/UniversityDepartmentModel} universityDepartmentModel 
   * @param {module:api/DepartmentsApi~createUniversityDepartmentCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/UniversityDepartmentModel}
   */


  _createClass(DepartmentsApi, [{
    key: "createUniversityDepartment",
    value: function createUniversityDepartment(unid, universityDepartmentModel, callback) {
      var postBody = universityDepartmentModel; // verify the required parameter 'unid' is set

      if (unid === undefined || unid === null) {
        throw new Error("Missing the required parameter 'unid' when calling createUniversityDepartment");
      } // verify the required parameter 'universityDepartmentModel' is set


      if (universityDepartmentModel === undefined || universityDepartmentModel === null) {
        throw new Error("Missing the required parameter 'universityDepartmentModel' when calling createUniversityDepartment");
      }

      var pathParams = {
        'unid': unid
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['OAuth2PasswordBearer'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = _UniversityDepartmentModel.default;
      return this.apiClient.callApi('/universities/{unid}/departments', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the deleteUniversityDepartment operation.
     * @callback module:api/DepartmentsApi~deleteUniversityDepartmentCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Message} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete University Department
     * Delete a university department with given universityID and universitySemesterID
     * @param {String} unid 
     * @param {String} depid 
     * @param {module:api/DepartmentsApi~deleteUniversityDepartmentCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Message}
     */

  }, {
    key: "deleteUniversityDepartment",
    value: function deleteUniversityDepartment(unid, depid, callback) {
      var postBody = null; // verify the required parameter 'unid' is set

      if (unid === undefined || unid === null) {
        throw new Error("Missing the required parameter 'unid' when calling deleteUniversityDepartment");
      } // verify the required parameter 'depid' is set


      if (depid === undefined || depid === null) {
        throw new Error("Missing the required parameter 'depid' when calling deleteUniversityDepartment");
      }

      var pathParams = {
        'unid': unid,
        'depid': depid
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['OAuth2PasswordBearer'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _Message.default;
      return this.apiClient.callApi('/universities/{unid}/departments/{depid}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the getSingleUniversityDepartment operation.
     * @callback module:api/DepartmentsApi~getSingleUniversityDepartmentCallback
     * @param {String} error Error message, if any.
     * @param {module:model/UniversityDepartmentModel} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Show University Department
     * Get a single semester of a university with given universityID and universityDepartmentID
     * @param {String} unid 
     * @param {String} depid 
     * @param {module:api/DepartmentsApi~getSingleUniversityDepartmentCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/UniversityDepartmentModel}
     */

  }, {
    key: "getSingleUniversityDepartment",
    value: function getSingleUniversityDepartment(unid, depid, callback) {
      var postBody = null; // verify the required parameter 'unid' is set

      if (unid === undefined || unid === null) {
        throw new Error("Missing the required parameter 'unid' when calling getSingleUniversityDepartment");
      } // verify the required parameter 'depid' is set


      if (depid === undefined || depid === null) {
        throw new Error("Missing the required parameter 'depid' when calling getSingleUniversityDepartment");
      }

      var pathParams = {
        'unid': unid,
        'depid': depid
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = [];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _UniversityDepartmentModel.default;
      return this.apiClient.callApi('/universities/{unid}/departments/{depid}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the listUniversityDepartments operation.
     * @callback module:api/DepartmentsApi~listUniversityDepartmentsCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/UniversityDepartmentModel>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List University Departments
     * list all departments of a university with given universityID
     * @param {String} unid 
     * @param {module:api/DepartmentsApi~listUniversityDepartmentsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/UniversityDepartmentModel>}
     */

  }, {
    key: "listUniversityDepartments",
    value: function listUniversityDepartments(unid, callback) {
      var postBody = null; // verify the required parameter 'unid' is set

      if (unid === undefined || unid === null) {
        throw new Error("Missing the required parameter 'unid' when calling listUniversityDepartments");
      }

      var pathParams = {
        'unid': unid
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = [];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = [_UniversityDepartmentModel.default];
      return this.apiClient.callApi('/universities/{unid}/departments', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the updateUniversityDepartment operation.
     * @callback module:api/DepartmentsApi~updateUniversityDepartmentCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Message} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update University Department
     * Update department of a university with given universityID and universityDepartmentID
     * @param {String} unid 
     * @param {String} depid 
     * @param {module:model/UniversityDepartmentModel} universityDepartmentModel 
     * @param {module:api/DepartmentsApi~updateUniversityDepartmentCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Message}
     */

  }, {
    key: "updateUniversityDepartment",
    value: function updateUniversityDepartment(unid, depid, universityDepartmentModel, callback) {
      var postBody = universityDepartmentModel; // verify the required parameter 'unid' is set

      if (unid === undefined || unid === null) {
        throw new Error("Missing the required parameter 'unid' when calling updateUniversityDepartment");
      } // verify the required parameter 'depid' is set


      if (depid === undefined || depid === null) {
        throw new Error("Missing the required parameter 'depid' when calling updateUniversityDepartment");
      } // verify the required parameter 'universityDepartmentModel' is set


      if (universityDepartmentModel === undefined || universityDepartmentModel === null) {
        throw new Error("Missing the required parameter 'universityDepartmentModel' when calling updateUniversityDepartment");
      }

      var pathParams = {
        'unid': unid,
        'depid': depid
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['OAuth2PasswordBearer'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = _Message.default;
      return this.apiClient.callApi('/universities/{unid}/departments/{depid}', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
  }]);

  return DepartmentsApi;
}();

exports.default = DepartmentsApi;