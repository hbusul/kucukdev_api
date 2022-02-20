"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _CurriculumSemesterModel = _interopRequireDefault(require("../model/CurriculumSemesterModel"));

var _HTTPValidationError = _interopRequireDefault(require("../model/HTTPValidationError"));

var _Message = _interopRequireDefault(require("../model/Message"));

var _MessageCreate = _interopRequireDefault(require("../model/MessageCreate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/**
* CurriculumSemesters service.
* @module api/CurriculumSemestersApi
* @version 1.0.0
*/
var CurriculumSemestersApi = /*#__PURE__*/function () {
  /**
  * Constructs a new CurriculumSemestersApi. 
  * @alias module:api/CurriculumSemestersApi
  * @class
  * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
  * default to {@link module:ApiClient#instance} if unspecified.
  */
  function CurriculumSemestersApi(apiClient) {
    _classCallCheck(this, CurriculumSemestersApi);

    this.apiClient = apiClient || _ApiClient.default.instance;
  }
  /**
   * Callback function to receive the result of the createCurriculumSemester operation.
   * @callback module:api/CurriculumSemestersApi~createCurriculumSemesterCallback
   * @param {String} error Error message, if any.
   * @param {module:model/MessageCreate} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Create Curriculum Semester
   * Create semester for a curriculum with given universityID, universityDepartmentID and departmentCurriculumID
   * @param {String} unid 
   * @param {String} depid 
   * @param {String} curid 
   * @param {module:model/CurriculumSemesterModel} curriculumSemesterModel 
   * @param {module:api/CurriculumSemestersApi~createCurriculumSemesterCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/MessageCreate}
   */


  _createClass(CurriculumSemestersApi, [{
    key: "createCurriculumSemester",
    value: function createCurriculumSemester(unid, depid, curid, curriculumSemesterModel, callback) {
      var postBody = curriculumSemesterModel; // verify the required parameter 'unid' is set

      if (unid === undefined || unid === null) {
        throw new Error("Missing the required parameter 'unid' when calling createCurriculumSemester");
      } // verify the required parameter 'depid' is set


      if (depid === undefined || depid === null) {
        throw new Error("Missing the required parameter 'depid' when calling createCurriculumSemester");
      } // verify the required parameter 'curid' is set


      if (curid === undefined || curid === null) {
        throw new Error("Missing the required parameter 'curid' when calling createCurriculumSemester");
      } // verify the required parameter 'curriculumSemesterModel' is set


      if (curriculumSemesterModel === undefined || curriculumSemesterModel === null) {
        throw new Error("Missing the required parameter 'curriculumSemesterModel' when calling createCurriculumSemester");
      }

      var pathParams = {
        'unid': unid,
        'depid': depid,
        'curid': curid
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['OAuth2PasswordBearer'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = _MessageCreate.default;
      return this.apiClient.callApi('/universities/{unid}/departments/{depid}/curriculums/{curid}/semesters', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the deleteCurriculumSemester operation.
     * @callback module:api/CurriculumSemestersApi~deleteCurriculumSemesterCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Message} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete Curriculum Semester
     * Delete a university department with given universityID, universityDepartmentID, departmentCurriculumID and curriculumSemesterID
     * @param {String} unid 
     * @param {String} depid 
     * @param {String} curid 
     * @param {String} cursid 
     * @param {module:api/CurriculumSemestersApi~deleteCurriculumSemesterCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Message}
     */

  }, {
    key: "deleteCurriculumSemester",
    value: function deleteCurriculumSemester(unid, depid, curid, cursid, callback) {
      var postBody = null; // verify the required parameter 'unid' is set

      if (unid === undefined || unid === null) {
        throw new Error("Missing the required parameter 'unid' when calling deleteCurriculumSemester");
      } // verify the required parameter 'depid' is set


      if (depid === undefined || depid === null) {
        throw new Error("Missing the required parameter 'depid' when calling deleteCurriculumSemester");
      } // verify the required parameter 'curid' is set


      if (curid === undefined || curid === null) {
        throw new Error("Missing the required parameter 'curid' when calling deleteCurriculumSemester");
      } // verify the required parameter 'cursid' is set


      if (cursid === undefined || cursid === null) {
        throw new Error("Missing the required parameter 'cursid' when calling deleteCurriculumSemester");
      }

      var pathParams = {
        'unid': unid,
        'depid': depid,
        'curid': curid,
        'cursid': cursid
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['OAuth2PasswordBearer'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _Message.default;
      return this.apiClient.callApi('/universities/{unid}/departments/{depid}/curriculums/{curid}/semesters/{cursid}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the getSingleCurriculumSemester operation.
     * @callback module:api/CurriculumSemestersApi~getSingleCurriculumSemesterCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CurriculumSemesterModel} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Show Curriculum Semester
     * Get a single semester of a curriculum with given universityID, universityDepartmentID, departmentCurriculumID and curriculumSemesterID
     * @param {String} unid 
     * @param {String} depid 
     * @param {String} curid 
     * @param {String} cursid 
     * @param {module:api/CurriculumSemestersApi~getSingleCurriculumSemesterCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CurriculumSemesterModel}
     */

  }, {
    key: "getSingleCurriculumSemester",
    value: function getSingleCurriculumSemester(unid, depid, curid, cursid, callback) {
      var postBody = null; // verify the required parameter 'unid' is set

      if (unid === undefined || unid === null) {
        throw new Error("Missing the required parameter 'unid' when calling getSingleCurriculumSemester");
      } // verify the required parameter 'depid' is set


      if (depid === undefined || depid === null) {
        throw new Error("Missing the required parameter 'depid' when calling getSingleCurriculumSemester");
      } // verify the required parameter 'curid' is set


      if (curid === undefined || curid === null) {
        throw new Error("Missing the required parameter 'curid' when calling getSingleCurriculumSemester");
      } // verify the required parameter 'cursid' is set


      if (cursid === undefined || cursid === null) {
        throw new Error("Missing the required parameter 'cursid' when calling getSingleCurriculumSemester");
      }

      var pathParams = {
        'unid': unid,
        'depid': depid,
        'curid': curid,
        'cursid': cursid
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = [];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _CurriculumSemesterModel.default;
      return this.apiClient.callApi('/universities/{unid}/departments/{depid}/curriculums/{curid}/semesters/{cursid}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the listCurriculumSemesters operation.
     * @callback module:api/CurriculumSemestersApi~listCurriculumSemestersCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/CurriculumSemesterModel>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List Curriculum Semesters
     * list all semesters of a curriculum of a department with given universityID, universityDepartmentID and departmentCurriculumID
     * @param {String} unid 
     * @param {String} depid 
     * @param {String} curid 
     * @param {module:api/CurriculumSemestersApi~listCurriculumSemestersCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/CurriculumSemesterModel>}
     */

  }, {
    key: "listCurriculumSemesters",
    value: function listCurriculumSemesters(unid, depid, curid, callback) {
      var postBody = null; // verify the required parameter 'unid' is set

      if (unid === undefined || unid === null) {
        throw new Error("Missing the required parameter 'unid' when calling listCurriculumSemesters");
      } // verify the required parameter 'depid' is set


      if (depid === undefined || depid === null) {
        throw new Error("Missing the required parameter 'depid' when calling listCurriculumSemesters");
      } // verify the required parameter 'curid' is set


      if (curid === undefined || curid === null) {
        throw new Error("Missing the required parameter 'curid' when calling listCurriculumSemesters");
      }

      var pathParams = {
        'unid': unid,
        'depid': depid,
        'curid': curid
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = [];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = [_CurriculumSemesterModel.default];
      return this.apiClient.callApi('/universities/{unid}/departments/{depid}/curriculums/{curid}/semesters', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the updateCurriculumSemester operation.
     * @callback module:api/CurriculumSemestersApi~updateCurriculumSemesterCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Message} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update Curriculum Semester
     * Update semester of a curriculum with given universityID, universityDepartmentID, departmentCurriculumID and curriculumSemesterID
     * @param {String} unid 
     * @param {String} depid 
     * @param {String} curid 
     * @param {String} cursid 
     * @param {module:model/CurriculumSemesterModel} curriculumSemesterModel 
     * @param {module:api/CurriculumSemestersApi~updateCurriculumSemesterCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Message}
     */

  }, {
    key: "updateCurriculumSemester",
    value: function updateCurriculumSemester(unid, depid, curid, cursid, curriculumSemesterModel, callback) {
      var postBody = curriculumSemesterModel; // verify the required parameter 'unid' is set

      if (unid === undefined || unid === null) {
        throw new Error("Missing the required parameter 'unid' when calling updateCurriculumSemester");
      } // verify the required parameter 'depid' is set


      if (depid === undefined || depid === null) {
        throw new Error("Missing the required parameter 'depid' when calling updateCurriculumSemester");
      } // verify the required parameter 'curid' is set


      if (curid === undefined || curid === null) {
        throw new Error("Missing the required parameter 'curid' when calling updateCurriculumSemester");
      } // verify the required parameter 'cursid' is set


      if (cursid === undefined || cursid === null) {
        throw new Error("Missing the required parameter 'cursid' when calling updateCurriculumSemester");
      } // verify the required parameter 'curriculumSemesterModel' is set


      if (curriculumSemesterModel === undefined || curriculumSemesterModel === null) {
        throw new Error("Missing the required parameter 'curriculumSemesterModel' when calling updateCurriculumSemester");
      }

      var pathParams = {
        'unid': unid,
        'depid': depid,
        'curid': curid,
        'cursid': cursid
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['OAuth2PasswordBearer'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = _Message.default;
      return this.apiClient.callApi('/universities/{unid}/departments/{depid}/curriculums/{curid}/semesters/{cursid}', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
  }]);

  return CurriculumSemestersApi;
}();

exports.default = CurriculumSemestersApi;