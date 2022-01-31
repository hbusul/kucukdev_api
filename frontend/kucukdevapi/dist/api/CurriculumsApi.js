"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _HTTPValidationError = _interopRequireDefault(require("../model/HTTPValidationError"));

var _Message = _interopRequireDefault(require("../model/Message"));

var _UniversityCurriculumModel = _interopRequireDefault(require("../model/UniversityCurriculumModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/**
* Curriculums service.
* @module api/CurriculumsApi
* @version 1.0.0
*/
var CurriculumsApi = /*#__PURE__*/function () {
  /**
  * Constructs a new CurriculumsApi. 
  * @alias module:api/CurriculumsApi
  * @class
  * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
  * default to {@link module:ApiClient#instance} if unspecified.
  */
  function CurriculumsApi(apiClient) {
    _classCallCheck(this, CurriculumsApi);

    this.apiClient = apiClient || _ApiClient.default.instance;
  }
  /**
   * Callback function to receive the result of the createUniversityDepartmentCurriculum operation.
   * @callback module:api/CurriculumsApi~createUniversityDepartmentCurriculumCallback
   * @param {String} error Error message, if any.
   * @param {module:model/UniversityCurriculumModel} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Create Department Curriculum
   * Create department for a university with given universityID and universityDepartmentID
   * @param {String} unid 
   * @param {String} depid 
   * @param {module:model/UniversityCurriculumModel} universityCurriculumModel 
   * @param {module:api/CurriculumsApi~createUniversityDepartmentCurriculumCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/UniversityCurriculumModel}
   */


  _createClass(CurriculumsApi, [{
    key: "createUniversityDepartmentCurriculum",
    value: function createUniversityDepartmentCurriculum(unid, depid, universityCurriculumModel, callback) {
      var postBody = universityCurriculumModel; // verify the required parameter 'unid' is set

      if (unid === undefined || unid === null) {
        throw new Error("Missing the required parameter 'unid' when calling createUniversityDepartmentCurriculum");
      } // verify the required parameter 'depid' is set


      if (depid === undefined || depid === null) {
        throw new Error("Missing the required parameter 'depid' when calling createUniversityDepartmentCurriculum");
      } // verify the required parameter 'universityCurriculumModel' is set


      if (universityCurriculumModel === undefined || universityCurriculumModel === null) {
        throw new Error("Missing the required parameter 'universityCurriculumModel' when calling createUniversityDepartmentCurriculum");
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
      var returnType = _UniversityCurriculumModel.default;
      return this.apiClient.callApi('/universities/{unid}/departments/{depid}/curriculums', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the deleteUniversityDepartmentCurriculum operation.
     * @callback module:api/CurriculumsApi~deleteUniversityDepartmentCurriculumCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Message} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete Department Curriculum
     * Delete a university department with given universityID, universityDepartmentID and departmentCurriculumID
     * @param {String} unid 
     * @param {String} depid 
     * @param {String} curid 
     * @param {module:api/CurriculumsApi~deleteUniversityDepartmentCurriculumCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Message}
     */

  }, {
    key: "deleteUniversityDepartmentCurriculum",
    value: function deleteUniversityDepartmentCurriculum(unid, depid, curid, callback) {
      var postBody = null; // verify the required parameter 'unid' is set

      if (unid === undefined || unid === null) {
        throw new Error("Missing the required parameter 'unid' when calling deleteUniversityDepartmentCurriculum");
      } // verify the required parameter 'depid' is set


      if (depid === undefined || depid === null) {
        throw new Error("Missing the required parameter 'depid' when calling deleteUniversityDepartmentCurriculum");
      } // verify the required parameter 'curid' is set


      if (curid === undefined || curid === null) {
        throw new Error("Missing the required parameter 'curid' when calling deleteUniversityDepartmentCurriculum");
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
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _Message.default;
      return this.apiClient.callApi('/universities/{unid}/departments/{depid}/curriculums/{curid}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the getSingleUniversityDepartmentCurriculum operation.
     * @callback module:api/CurriculumsApi~getSingleUniversityDepartmentCurriculumCallback
     * @param {String} error Error message, if any.
     * @param {module:model/UniversityCurriculumModel} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Show Department Curriculum
     * Get a single semester of a university with given universityID, universityDepartmentID and departmentCurriculumID
     * @param {String} unid 
     * @param {String} depid 
     * @param {String} curid 
     * @param {module:api/CurriculumsApi~getSingleUniversityDepartmentCurriculumCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/UniversityCurriculumModel}
     */

  }, {
    key: "getSingleUniversityDepartmentCurriculum",
    value: function getSingleUniversityDepartmentCurriculum(unid, depid, curid, callback) {
      var postBody = null; // verify the required parameter 'unid' is set

      if (unid === undefined || unid === null) {
        throw new Error("Missing the required parameter 'unid' when calling getSingleUniversityDepartmentCurriculum");
      } // verify the required parameter 'depid' is set


      if (depid === undefined || depid === null) {
        throw new Error("Missing the required parameter 'depid' when calling getSingleUniversityDepartmentCurriculum");
      } // verify the required parameter 'curid' is set


      if (curid === undefined || curid === null) {
        throw new Error("Missing the required parameter 'curid' when calling getSingleUniversityDepartmentCurriculum");
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
      var returnType = _UniversityCurriculumModel.default;
      return this.apiClient.callApi('/universities/{unid}/departments/{depid}/curriculums/{curid}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the listUniversityDepartmentCurriculums operation.
     * @callback module:api/CurriculumsApi~listUniversityDepartmentCurriculumsCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/UniversityCurriculumModel>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List Department Curriculums
     * list all curriculums of a department of a university with given universityID and universityDepartmentID
     * @param {String} unid 
     * @param {String} depid 
     * @param {module:api/CurriculumsApi~listUniversityDepartmentCurriculumsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/UniversityCurriculumModel>}
     */

  }, {
    key: "listUniversityDepartmentCurriculums",
    value: function listUniversityDepartmentCurriculums(unid, depid, callback) {
      var postBody = null; // verify the required parameter 'unid' is set

      if (unid === undefined || unid === null) {
        throw new Error("Missing the required parameter 'unid' when calling listUniversityDepartmentCurriculums");
      } // verify the required parameter 'depid' is set


      if (depid === undefined || depid === null) {
        throw new Error("Missing the required parameter 'depid' when calling listUniversityDepartmentCurriculums");
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
      var returnType = [_UniversityCurriculumModel.default];
      return this.apiClient.callApi('/universities/{unid}/departments/{depid}/curriculums', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the updateUniversityDepartmentCurriculum operation.
     * @callback module:api/CurriculumsApi~updateUniversityDepartmentCurriculumCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Message} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update Department Curriculum
     * Update department of a university with given universityID, universityDepartmentID and departmentCurriculumID
     * @param {String} unid 
     * @param {String} depid 
     * @param {String} curid 
     * @param {module:model/UniversityCurriculumModel} universityCurriculumModel 
     * @param {module:api/CurriculumsApi~updateUniversityDepartmentCurriculumCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Message}
     */

  }, {
    key: "updateUniversityDepartmentCurriculum",
    value: function updateUniversityDepartmentCurriculum(unid, depid, curid, universityCurriculumModel, callback) {
      var postBody = universityCurriculumModel; // verify the required parameter 'unid' is set

      if (unid === undefined || unid === null) {
        throw new Error("Missing the required parameter 'unid' when calling updateUniversityDepartmentCurriculum");
      } // verify the required parameter 'depid' is set


      if (depid === undefined || depid === null) {
        throw new Error("Missing the required parameter 'depid' when calling updateUniversityDepartmentCurriculum");
      } // verify the required parameter 'curid' is set


      if (curid === undefined || curid === null) {
        throw new Error("Missing the required parameter 'curid' when calling updateUniversityDepartmentCurriculum");
      } // verify the required parameter 'universityCurriculumModel' is set


      if (universityCurriculumModel === undefined || universityCurriculumModel === null) {
        throw new Error("Missing the required parameter 'universityCurriculumModel' when calling updateUniversityDepartmentCurriculum");
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
      var returnType = _Message.default;
      return this.apiClient.callApi('/universities/{unid}/departments/{depid}/curriculums/{curid}', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
  }]);

  return CurriculumsApi;
}();

exports.default = CurriculumsApi;