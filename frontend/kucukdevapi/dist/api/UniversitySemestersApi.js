"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _HTTPValidationError = _interopRequireDefault(require("../model/HTTPValidationError"));

var _Message = _interopRequireDefault(require("../model/Message"));

var _UniversitySemesterModel = _interopRequireDefault(require("../model/UniversitySemesterModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/**
* UniversitySemesters service.
* @module api/UniversitySemestersApi
* @version 1.0.0
*/
var UniversitySemestersApi = /*#__PURE__*/function () {
  /**
  * Constructs a new UniversitySemestersApi. 
  * @alias module:api/UniversitySemestersApi
  * @class
  * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
  * default to {@link module:ApiClient#instance} if unspecified.
  */
  function UniversitySemestersApi(apiClient) {
    _classCallCheck(this, UniversitySemestersApi);

    this.apiClient = apiClient || _ApiClient.default.instance;
  }
  /**
   * Callback function to receive the result of the createUniversitySemester operation.
   * @callback module:api/UniversitySemestersApi~createUniversitySemesterCallback
   * @param {String} error Error message, if any.
   * @param {module:model/UniversitySemesterModel} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Create University Semester
   * Create semester for a university with given universityID
   * @param {String} unid 
   * @param {module:model/UniversitySemesterModel} universitySemesterModel 
   * @param {module:api/UniversitySemestersApi~createUniversitySemesterCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/UniversitySemesterModel}
   */


  _createClass(UniversitySemestersApi, [{
    key: "createUniversitySemester",
    value: function createUniversitySemester(unid, universitySemesterModel, callback) {
      var postBody = universitySemesterModel; // verify the required parameter 'unid' is set

      if (unid === undefined || unid === null) {
        throw new Error("Missing the required parameter 'unid' when calling createUniversitySemester");
      } // verify the required parameter 'universitySemesterModel' is set


      if (universitySemesterModel === undefined || universitySemesterModel === null) {
        throw new Error("Missing the required parameter 'universitySemesterModel' when calling createUniversitySemester");
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
      var returnType = _UniversitySemesterModel.default;
      return this.apiClient.callApi('/universities/{unid}/semesters', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the deleteUniversitySemester operation.
     * @callback module:api/UniversitySemestersApi~deleteUniversitySemesterCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Message} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete University Semester
     * Delete a university semester with given universityID and universitySemesterID
     * @param {String} unid 
     * @param {String} unisid 
     * @param {module:api/UniversitySemestersApi~deleteUniversitySemesterCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Message}
     */

  }, {
    key: "deleteUniversitySemester",
    value: function deleteUniversitySemester(unid, unisid, callback) {
      var postBody = null; // verify the required parameter 'unid' is set

      if (unid === undefined || unid === null) {
        throw new Error("Missing the required parameter 'unid' when calling deleteUniversitySemester");
      } // verify the required parameter 'unisid' is set


      if (unisid === undefined || unisid === null) {
        throw new Error("Missing the required parameter 'unisid' when calling deleteUniversitySemester");
      }

      var pathParams = {
        'unid': unid,
        'unisid': unisid
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['OAuth2PasswordBearer'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _Message.default;
      return this.apiClient.callApi('/universities/{unid}/semesters/{unisid}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the getSingleUniversitySemesters operation.
     * @callback module:api/UniversitySemestersApi~getSingleUniversitySemestersCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/UniversitySemesterModel>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Show University Semester
     * Get a single semester of a university with given universityID and universitySemesterID
     * @param {String} unid 
     * @param {String} unisid 
     * @param {module:api/UniversitySemestersApi~getSingleUniversitySemestersCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/UniversitySemesterModel>}
     */

  }, {
    key: "getSingleUniversitySemesters",
    value: function getSingleUniversitySemesters(unid, unisid, callback) {
      var postBody = null; // verify the required parameter 'unid' is set

      if (unid === undefined || unid === null) {
        throw new Error("Missing the required parameter 'unid' when calling getSingleUniversitySemesters");
      } // verify the required parameter 'unisid' is set


      if (unisid === undefined || unisid === null) {
        throw new Error("Missing the required parameter 'unisid' when calling getSingleUniversitySemesters");
      }

      var pathParams = {
        'unid': unid,
        'unisid': unisid
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = [];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = [_UniversitySemesterModel.default];
      return this.apiClient.callApi('/universities/{unid}/semesters/{unisid}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the listUniversitySemesters operation.
     * @callback module:api/UniversitySemestersApi~listUniversitySemestersCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/UniversitySemesterModel>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List University Semesters
     * list all semesters of a university with given universityID
     * @param {String} unid 
     * @param {module:api/UniversitySemestersApi~listUniversitySemestersCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/UniversitySemesterModel>}
     */

  }, {
    key: "listUniversitySemesters",
    value: function listUniversitySemesters(unid, callback) {
      var postBody = null; // verify the required parameter 'unid' is set

      if (unid === undefined || unid === null) {
        throw new Error("Missing the required parameter 'unid' when calling listUniversitySemesters");
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
      var returnType = [_UniversitySemesterModel.default];
      return this.apiClient.callApi('/universities/{unid}/semesters', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the updateUniversitySemester operation.
     * @callback module:api/UniversitySemestersApi~updateUniversitySemesterCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Message} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update University Semester
     * Update university of a semester with given universityID and universitySemesterID
     * @param {String} unid 
     * @param {String} unisid 
     * @param {module:model/UniversitySemesterModel} universitySemesterModel 
     * @param {module:api/UniversitySemestersApi~updateUniversitySemesterCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Message}
     */

  }, {
    key: "updateUniversitySemester",
    value: function updateUniversitySemester(unid, unisid, universitySemesterModel, callback) {
      var postBody = universitySemesterModel; // verify the required parameter 'unid' is set

      if (unid === undefined || unid === null) {
        throw new Error("Missing the required parameter 'unid' when calling updateUniversitySemester");
      } // verify the required parameter 'unisid' is set


      if (unisid === undefined || unisid === null) {
        throw new Error("Missing the required parameter 'unisid' when calling updateUniversitySemester");
      } // verify the required parameter 'universitySemesterModel' is set


      if (universitySemesterModel === undefined || universitySemesterModel === null) {
        throw new Error("Missing the required parameter 'universitySemesterModel' when calling updateUniversitySemester");
      }

      var pathParams = {
        'unid': unid,
        'unisid': unisid
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['OAuth2PasswordBearer'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = _Message.default;
      return this.apiClient.callApi('/universities/{unid}/semesters/{unisid}', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
  }]);

  return UniversitySemestersApi;
}();

exports.default = UniversitySemestersApi;