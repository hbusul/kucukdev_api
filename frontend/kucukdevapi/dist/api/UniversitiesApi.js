"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _HTTPValidationError = _interopRequireDefault(require("../model/HTTPValidationError"));

var _Message = _interopRequireDefault(require("../model/Message"));

var _UniversityAPIModel = _interopRequireDefault(require("../model/UniversityAPIModel"));

var _UniversityModel = _interopRequireDefault(require("../model/UniversityModel"));

var _UniversitySemesterModel = _interopRequireDefault(require("../model/UniversitySemesterModel"));

var _UpdateSemesterModel = _interopRequireDefault(require("../model/UpdateSemesterModel"));

var _UpdateUniversityNameModel = _interopRequireDefault(require("../model/UpdateUniversityNameModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/**
* Universities service.
* @module api/UniversitiesApi
* @version 1.0.0
*/
var UniversitiesApi = /*#__PURE__*/function () {
  /**
  * Constructs a new UniversitiesApi. 
  * @alias module:api/UniversitiesApi
  * @class
  * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
  * default to {@link module:ApiClient#instance} if unspecified.
  */
  function UniversitiesApi(apiClient) {
    _classCallCheck(this, UniversitiesApi);

    this.apiClient = apiClient || _ApiClient.default.instance;
  }
  /**
   * Callback function to receive the result of the createUniversity operation.
   * @callback module:api/UniversitiesApi~createUniversityCallback
   * @param {String} error Error message, if any.
   * @param {module:model/UniversityAPIModel} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Create University
   * Create a university
   * @param {module:model/UniversityModel} universityModel 
   * @param {module:api/UniversitiesApi~createUniversityCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/UniversityAPIModel}
   */


  _createClass(UniversitiesApi, [{
    key: "createUniversity",
    value: function createUniversity(universityModel, callback) {
      var postBody = universityModel; // verify the required parameter 'universityModel' is set

      if (universityModel === undefined || universityModel === null) {
        throw new Error("Missing the required parameter 'universityModel' when calling createUniversity");
      }

      var pathParams = {};
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['OAuth2PasswordBearer'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = _UniversityAPIModel.default;
      return this.apiClient.callApi('/universities', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the deleteUniversity operation.
     * @callback module:api/UniversitiesApi~deleteUniversityCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Message} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete University
     * Delete a university with given universityID
     * @param {String} unid 
     * @param {module:api/UniversitiesApi~deleteUniversityCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Message}
     */

  }, {
    key: "deleteUniversity",
    value: function deleteUniversity(unid, callback) {
      var postBody = null; // verify the required parameter 'unid' is set

      if (unid === undefined || unid === null) {
        throw new Error("Missing the required parameter 'unid' when calling deleteUniversity");
      }

      var pathParams = {
        'unid': unid
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['OAuth2PasswordBearer'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _Message.default;
      return this.apiClient.callApi('/universities/{unid}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the getCurrentUniversitySemester operation.
     * @callback module:api/UniversitiesApi~getCurrentUniversitySemesterCallback
     * @param {String} error Error message, if any.
     * @param {module:model/UniversitySemesterModel} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Show University Current Semester
     * Get current semester of a university with given universityID
     * @param {String} unid 
     * @param {module:api/UniversitiesApi~getCurrentUniversitySemesterCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/UniversitySemesterModel}
     */

  }, {
    key: "getCurrentUniversitySemester",
    value: function getCurrentUniversitySemester(unid, callback) {
      var postBody = null; // verify the required parameter 'unid' is set

      if (unid === undefined || unid === null) {
        throw new Error("Missing the required parameter 'unid' when calling getCurrentUniversitySemester");
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
      var returnType = _UniversitySemesterModel.default;
      return this.apiClient.callApi('/universities/{unid}/current-semester', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the getSingleUniversity operation.
     * @callback module:api/UniversitiesApi~getSingleUniversityCallback
     * @param {String} error Error message, if any.
     * @param {module:model/UniversityModel} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Show University
     * Get a single university with given universityID
     * @param {String} unid 
     * @param {module:api/UniversitiesApi~getSingleUniversityCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/UniversityModel}
     */

  }, {
    key: "getSingleUniversity",
    value: function getSingleUniversity(unid, callback) {
      var postBody = null; // verify the required parameter 'unid' is set

      if (unid === undefined || unid === null) {
        throw new Error("Missing the required parameter 'unid' when calling getSingleUniversity");
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
      var returnType = _UniversityModel.default;
      return this.apiClient.callApi('/universities/{unid}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the listUniversities operation.
     * @callback module:api/UniversitiesApi~listUniversitiesCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/UniversityAPIModel>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List Universities
     * list all universities
     * @param {module:api/UniversitiesApi~listUniversitiesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/UniversityAPIModel>}
     */

  }, {
    key: "listUniversities",
    value: function listUniversities(callback) {
      var postBody = null;
      var pathParams = {};
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = [];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = [_UniversityAPIModel.default];
      return this.apiClient.callApi('/universities', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the updateUniversityCurrentSemester operation.
     * @callback module:api/UniversitiesApi~updateUniversityCurrentSemesterCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Message} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update University Current Semester
     * Update current semester of a university with given universityID
     * @param {String} unid 
     * @param {module:model/UpdateSemesterModel} updateSemesterModel 
     * @param {module:api/UniversitiesApi~updateUniversityCurrentSemesterCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Message}
     */

  }, {
    key: "updateUniversityCurrentSemester",
    value: function updateUniversityCurrentSemester(unid, updateSemesterModel, callback) {
      var postBody = updateSemesterModel; // verify the required parameter 'unid' is set

      if (unid === undefined || unid === null) {
        throw new Error("Missing the required parameter 'unid' when calling updateUniversityCurrentSemester");
      } // verify the required parameter 'updateSemesterModel' is set


      if (updateSemesterModel === undefined || updateSemesterModel === null) {
        throw new Error("Missing the required parameter 'updateSemesterModel' when calling updateUniversityCurrentSemester");
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
      var returnType = _Message.default;
      return this.apiClient.callApi('/universities/{unid}/current-semester', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the updateUniversityName operation.
     * @callback module:api/UniversitiesApi~updateUniversityNameCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Message} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update University Name
     * Update name of a university with given universityID
     * @param {String} unid 
     * @param {module:model/UpdateUniversityNameModel} updateUniversityNameModel 
     * @param {module:api/UniversitiesApi~updateUniversityNameCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Message}
     */

  }, {
    key: "updateUniversityName",
    value: function updateUniversityName(unid, updateUniversityNameModel, callback) {
      var postBody = updateUniversityNameModel; // verify the required parameter 'unid' is set

      if (unid === undefined || unid === null) {
        throw new Error("Missing the required parameter 'unid' when calling updateUniversityName");
      } // verify the required parameter 'updateUniversityNameModel' is set


      if (updateUniversityNameModel === undefined || updateUniversityNameModel === null) {
        throw new Error("Missing the required parameter 'updateUniversityNameModel' when calling updateUniversityName");
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
      var returnType = _Message.default;
      return this.apiClient.callApi('/universities/{unid}/update-name', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
  }]);

  return UniversitiesApi;
}();

exports.default = UniversitiesApi;