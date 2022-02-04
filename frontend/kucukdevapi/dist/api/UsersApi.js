"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _HTTPValidationError = _interopRequireDefault(require("../model/HTTPValidationError"));

var _Message = _interopRequireDefault(require("../model/Message"));

var _UpdateEntranceYearModel = _interopRequireDefault(require("../model/UpdateEntranceYearModel"));

var _UpdatePasswordModel = _interopRequireDefault(require("../model/UpdatePasswordModel"));

var _UpdateSemesterModel = _interopRequireDefault(require("../model/UpdateSemesterModel"));

var _UpdateUniversityModel = _interopRequireDefault(require("../model/UpdateUniversityModel"));

var _UserAPIModel = _interopRequireDefault(require("../model/UserAPIModel"));

var _UserModel = _interopRequireDefault(require("../model/UserModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
* Users service.
* @module api/UsersApi
* @version 1.0.0
*/
var UsersApi = /*#__PURE__*/function () {
  /**
  * Constructs a new UsersApi. 
  * @alias module:api/UsersApi
  * @class
  * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
  * default to {@link module:ApiClient#instance} if unspecified.
  */
  function UsersApi(apiClient) {
    _classCallCheck(this, UsersApi);

    this.apiClient = apiClient || _ApiClient.default.instance;
  }
  /**
   * Callback function to receive the result of the createUser operation.
   * @callback module:api/UsersApi~createUserCallback
   * @param {String} error Error message, if any.
   * @param {module:model/UserAPIModel} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Create User
   * Create a user
   * @param {module:model/UserModel} userModel 
   * @param {module:api/UsersApi~createUserCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/UserAPIModel}
   */


  _createClass(UsersApi, [{
    key: "createUser",
    value: function createUser(userModel, callback) {
      var postBody = userModel; // verify the required parameter 'userModel' is set

      if (userModel === undefined || userModel === null) {
        throw new Error("Missing the required parameter 'userModel' when calling createUser");
      }

      var pathParams = {};
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = [];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = _UserAPIModel.default;
      return this.apiClient.callApi('/users', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the deleteUser operation.
     * @callback module:api/UsersApi~deleteUserCallback
     * @param {String} error Error message, if any.
     * @param {module:model/UserAPIModel} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete User
     * Delete a user with given userID
     * @param {String} uid 
     * @param {module:api/UsersApi~deleteUserCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/UserAPIModel}
     */

  }, {
    key: "deleteUser",
    value: function deleteUser(uid, callback) {
      var postBody = null; // verify the required parameter 'uid' is set

      if (uid === undefined || uid === null) {
        throw new Error("Missing the required parameter 'uid' when calling deleteUser");
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
      var returnType = _UserAPIModel.default;
      return this.apiClient.callApi('/users/{uid}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the getCurrentUser operation.
     * @callback module:api/UsersApi~getCurrentUserCallback
     * @param {String} error Error message, if any.
     * @param {module:model/UserAPIModel} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get Current
     * @param {module:api/UsersApi~getCurrentUserCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/UserAPIModel}
     */

  }, {
    key: "getCurrentUser",
    value: function getCurrentUser(callback) {
      var postBody = null;
      var pathParams = {};
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['OAuth2PasswordBearer'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _UserAPIModel.default;
      return this.apiClient.callApi('/users', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the getSingleUser operation.
     * @callback module:api/UsersApi~getSingleUserCallback
     * @param {String} error Error message, if any.
     * @param {module:model/UserAPIModel} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Show User
     * Get a single user with given userID
     * @param {String} uid 
     * @param {module:api/UsersApi~getSingleUserCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/UserAPIModel}
     */

  }, {
    key: "getSingleUser",
    value: function getSingleUser(uid, callback) {
      var postBody = null; // verify the required parameter 'uid' is set

      if (uid === undefined || uid === null) {
        throw new Error("Missing the required parameter 'uid' when calling getSingleUser");
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
      var returnType = _UserAPIModel.default;
      return this.apiClient.callApi('/users/{uid}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the updateCurrentSemester operation.
     * @callback module:api/UsersApi~updateCurrentSemesterCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Message} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update Current Semester
     * Update current semester ID of a user with given userID
     * @param {String} uid 
     * @param {module:model/UpdateSemesterModel} updateSemesterModel 
     * @param {module:api/UsersApi~updateCurrentSemesterCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Message}
     */

  }, {
    key: "updateCurrentSemester",
    value: function updateCurrentSemester(uid, updateSemesterModel, callback) {
      var postBody = updateSemesterModel; // verify the required parameter 'uid' is set

      if (uid === undefined || uid === null) {
        throw new Error("Missing the required parameter 'uid' when calling updateCurrentSemester");
      } // verify the required parameter 'updateSemesterModel' is set


      if (updateSemesterModel === undefined || updateSemesterModel === null) {
        throw new Error("Missing the required parameter 'updateSemesterModel' when calling updateCurrentSemester");
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
      var returnType = _Message.default;
      return this.apiClient.callApi('/users/{uid}/current-semester', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the updateCurrentUniversity operation.
     * @callback module:api/UsersApi~updateCurrentUniversityCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Message} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update Current University
     * Update current university ID of a user with given userID
     * @param {String} uid 
     * @param {module:model/UpdateUniversityModel} updateUniversityModel 
     * @param {module:api/UsersApi~updateCurrentUniversityCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Message}
     */

  }, {
    key: "updateCurrentUniversity",
    value: function updateCurrentUniversity(uid, updateUniversityModel, callback) {
      var postBody = updateUniversityModel; // verify the required parameter 'uid' is set

      if (uid === undefined || uid === null) {
        throw new Error("Missing the required parameter 'uid' when calling updateCurrentUniversity");
      } // verify the required parameter 'updateUniversityModel' is set


      if (updateUniversityModel === undefined || updateUniversityModel === null) {
        throw new Error("Missing the required parameter 'updateUniversityModel' when calling updateCurrentUniversity");
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
      var returnType = _Message.default;
      return this.apiClient.callApi('/users/{uid}/current-university', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the updateEntranceyear operation.
     * @callback module:api/UsersApi~updateEntranceyearCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Message} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update Entrance Year
     * Update entrance year of a user with given userID
     * @param {String} uid 
     * @param {module:model/UpdateEntranceYearModel} updateEntranceYearModel 
     * @param {module:api/UsersApi~updateEntranceyearCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Message}
     */

  }, {
    key: "updateEntranceyear",
    value: function updateEntranceyear(uid, updateEntranceYearModel, callback) {
      var postBody = updateEntranceYearModel; // verify the required parameter 'uid' is set

      if (uid === undefined || uid === null) {
        throw new Error("Missing the required parameter 'uid' when calling updateEntranceyear");
      } // verify the required parameter 'updateEntranceYearModel' is set


      if (updateEntranceYearModel === undefined || updateEntranceYearModel === null) {
        throw new Error("Missing the required parameter 'updateEntranceYearModel' when calling updateEntranceyear");
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
      var returnType = _Message.default;
      return this.apiClient.callApi('/users/{uid}/entrance-year', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the updatePassword operation.
     * @callback module:api/UsersApi~updatePasswordCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Message} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update Password
     * Update password of a user with given userID
     * @param {String} uid 
     * @param {module:model/UpdatePasswordModel} updatePasswordModel 
     * @param {module:api/UsersApi~updatePasswordCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Message}
     */

  }, {
    key: "updatePassword",
    value: function updatePassword(uid, updatePasswordModel, callback) {
      var postBody = updatePasswordModel; // verify the required parameter 'uid' is set

      if (uid === undefined || uid === null) {
        throw new Error("Missing the required parameter 'uid' when calling updatePassword");
      } // verify the required parameter 'updatePasswordModel' is set


      if (updatePasswordModel === undefined || updatePasswordModel === null) {
        throw new Error("Missing the required parameter 'updatePasswordModel' when calling updatePassword");
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
      var returnType = _Message.default;
      return this.apiClient.callApi('/users/{uid}/change-password', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
  }]);

  return UsersApi;
}();

exports.default = UsersApi;