"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _HTTPValidationError = _interopRequireDefault(require("../model/HTTPValidationError"));

var _Message = _interopRequireDefault(require("../model/Message"));

var _MessageCreate = _interopRequireDefault(require("../model/MessageCreate"));

var _SemesterAPIModel = _interopRequireDefault(require("../model/SemesterAPIModel"));

var _UpdateUserSemesterModel = _interopRequireDefault(require("../model/UpdateUserSemesterModel"));

var _UserSemesterModel = _interopRequireDefault(require("../model/UserSemesterModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/**
* Semesters service.
* @module api/SemestersApi
* @version 1.0.0
*/
var SemestersApi = /*#__PURE__*/function () {
  /**
  * Constructs a new SemestersApi. 
  * @alias module:api/SemestersApi
  * @class
  * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
  * default to {@link module:ApiClient#instance} if unspecified.
  */
  function SemestersApi(apiClient) {
    _classCallCheck(this, SemestersApi);

    this.apiClient = apiClient || _ApiClient.default.instance;
  }
  /**
   * Callback function to receive the result of the createSemester operation.
   * @callback module:api/SemestersApi~createSemesterCallback
   * @param {String} error Error message, if any.
   * @param {module:model/MessageCreate} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Create Semester
   * Create a semester for a user with given userID
   * @param {String} uid 
   * @param {module:model/UserSemesterModel} userSemesterModel 
   * @param {module:api/SemestersApi~createSemesterCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/MessageCreate}
   */


  _createClass(SemestersApi, [{
    key: "createSemester",
    value: function createSemester(uid, userSemesterModel, callback) {
      var postBody = userSemesterModel; // verify the required parameter 'uid' is set

      if (uid === undefined || uid === null) {
        throw new Error("Missing the required parameter 'uid' when calling createSemester");
      } // verify the required parameter 'userSemesterModel' is set


      if (userSemesterModel === undefined || userSemesterModel === null) {
        throw new Error("Missing the required parameter 'userSemesterModel' when calling createSemester");
      }

      var pathParams = {
        'uid': uid
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['OAuth2PasswordBearer'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = _MessageCreate.default;
      return this.apiClient.callApi('/users/{uid}/semesters', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the deleteSemester operation.
     * @callback module:api/SemestersApi~deleteSemesterCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Message} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete Semester
     * Delete a semester with given userID and semesterID
     * @param {String} uid 
     * @param {String} sid 
     * @param {module:api/SemestersApi~deleteSemesterCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Message}
     */

  }, {
    key: "deleteSemester",
    value: function deleteSemester(uid, sid, callback) {
      var postBody = null; // verify the required parameter 'uid' is set

      if (uid === undefined || uid === null) {
        throw new Error("Missing the required parameter 'uid' when calling deleteSemester");
      } // verify the required parameter 'sid' is set


      if (sid === undefined || sid === null) {
        throw new Error("Missing the required parameter 'sid' when calling deleteSemester");
      }

      var pathParams = {
        'uid': uid,
        'sid': sid
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['OAuth2PasswordBearer'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _Message.default;
      return this.apiClient.callApi('/users/{uid}/semesters/{sid}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the getSingleSemester operation.
     * @callback module:api/SemestersApi~getSingleSemesterCallback
     * @param {String} error Error message, if any.
     * @param {module:model/SemesterAPIModel} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Show Semester
     * Get a single semester with given userID and semesterID
     * @param {String} uid 
     * @param {String} sid 
     * @param {module:api/SemestersApi~getSingleSemesterCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/SemesterAPIModel}
     */

  }, {
    key: "getSingleSemester",
    value: function getSingleSemester(uid, sid, callback) {
      var postBody = null; // verify the required parameter 'uid' is set

      if (uid === undefined || uid === null) {
        throw new Error("Missing the required parameter 'uid' when calling getSingleSemester");
      } // verify the required parameter 'sid' is set


      if (sid === undefined || sid === null) {
        throw new Error("Missing the required parameter 'sid' when calling getSingleSemester");
      }

      var pathParams = {
        'uid': uid,
        'sid': sid
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['OAuth2PasswordBearer'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _SemesterAPIModel.default;
      return this.apiClient.callApi('/users/{uid}/semesters/{sid}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the listSemestersOfUser operation.
     * @callback module:api/SemestersApi~listSemestersOfUserCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/SemesterAPIModel>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List Semesters
     * list all semesters of a user with given userID
     * @param {String} uid 
     * @param {module:api/SemestersApi~listSemestersOfUserCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/SemesterAPIModel>}
     */

  }, {
    key: "listSemestersOfUser",
    value: function listSemestersOfUser(uid, callback) {
      var postBody = null; // verify the required parameter 'uid' is set

      if (uid === undefined || uid === null) {
        throw new Error("Missing the required parameter 'uid' when calling listSemestersOfUser");
      }

      var pathParams = {
        'uid': uid
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['OAuth2PasswordBearer'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = [_SemesterAPIModel.default];
      return this.apiClient.callApi('/users/{uid}/semesters', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the updateSemester operation.
     * @callback module:api/SemestersApi~updateSemesterCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Message} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update Semester
     * Update a semester with given userID and semesterID
     * @param {String} uid 
     * @param {String} sid 
     * @param {module:model/UpdateUserSemesterModel} updateUserSemesterModel 
     * @param {module:api/SemestersApi~updateSemesterCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Message}
     */

  }, {
    key: "updateSemester",
    value: function updateSemester(uid, sid, updateUserSemesterModel, callback) {
      var postBody = updateUserSemesterModel; // verify the required parameter 'uid' is set

      if (uid === undefined || uid === null) {
        throw new Error("Missing the required parameter 'uid' when calling updateSemester");
      } // verify the required parameter 'sid' is set


      if (sid === undefined || sid === null) {
        throw new Error("Missing the required parameter 'sid' when calling updateSemester");
      } // verify the required parameter 'updateUserSemesterModel' is set


      if (updateUserSemesterModel === undefined || updateUserSemesterModel === null) {
        throw new Error("Missing the required parameter 'updateUserSemesterModel' when calling updateSemester");
      }

      var pathParams = {
        'uid': uid,
        'sid': sid
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['OAuth2PasswordBearer'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = _Message.default;
      return this.apiClient.callApi('/users/{uid}/semesters/{sid}', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
  }]);

  return SemestersApi;
}();

exports.default = SemestersApi;