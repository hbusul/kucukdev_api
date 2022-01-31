"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _CurriculumLessonModel = _interopRequireDefault(require("../model/CurriculumLessonModel"));

var _HTTPValidationError = _interopRequireDefault(require("../model/HTTPValidationError"));

var _Message = _interopRequireDefault(require("../model/Message"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/**
* CurriculumLessons service.
* @module api/CurriculumLessonsApi
* @version 1.0.0
*/
var CurriculumLessonsApi = /*#__PURE__*/function () {
  /**
  * Constructs a new CurriculumLessonsApi. 
  * @alias module:api/CurriculumLessonsApi
  * @class
  * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
  * default to {@link module:ApiClient#instance} if unspecified.
  */
  function CurriculumLessonsApi(apiClient) {
    _classCallCheck(this, CurriculumLessonsApi);

    this.apiClient = apiClient || _ApiClient.default.instance;
  }
  /**
   * Callback function to receive the result of the createCurriculumLesson operation.
   * @callback module:api/CurriculumLessonsApi~createCurriculumLessonCallback
   * @param {String} error Error message, if any.
   * @param {module:model/CurriculumLessonModel} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Create Curriculum Lesson
   * Create lesson for a curriculum semester with given universityID, universityDepartmentID, departmentCurriculumID and curriculumSemesterID
   * @param {String} unid 
   * @param {String} depid 
   * @param {String} curid 
   * @param {String} cursid 
   * @param {module:model/CurriculumLessonModel} curriculumLessonModel 
   * @param {module:api/CurriculumLessonsApi~createCurriculumLessonCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/CurriculumLessonModel}
   */


  _createClass(CurriculumLessonsApi, [{
    key: "createCurriculumLesson",
    value: function createCurriculumLesson(unid, depid, curid, cursid, curriculumLessonModel, callback) {
      var postBody = curriculumLessonModel; // verify the required parameter 'unid' is set

      if (unid === undefined || unid === null) {
        throw new Error("Missing the required parameter 'unid' when calling createCurriculumLesson");
      } // verify the required parameter 'depid' is set


      if (depid === undefined || depid === null) {
        throw new Error("Missing the required parameter 'depid' when calling createCurriculumLesson");
      } // verify the required parameter 'curid' is set


      if (curid === undefined || curid === null) {
        throw new Error("Missing the required parameter 'curid' when calling createCurriculumLesson");
      } // verify the required parameter 'cursid' is set


      if (cursid === undefined || cursid === null) {
        throw new Error("Missing the required parameter 'cursid' when calling createCurriculumLesson");
      } // verify the required parameter 'curriculumLessonModel' is set


      if (curriculumLessonModel === undefined || curriculumLessonModel === null) {
        throw new Error("Missing the required parameter 'curriculumLessonModel' when calling createCurriculumLesson");
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
      var returnType = _CurriculumLessonModel.default;
      return this.apiClient.callApi('/universities/{unid}/departments/{depid}/curriculums/{curid}/semesters{cursid}/lessons', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the deleteCurriculumLesson operation.
     * @callback module:api/CurriculumLessonsApi~deleteCurriculumLessonCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Message} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete Curriculum Lesson
     * Delete a university department with given universityID, universityDepartmentID, departmentCurriculumID, curriculumSemesterID and curriculumLessonID
     * @param {String} unid 
     * @param {String} depid 
     * @param {String} curid 
     * @param {String} cursid 
     * @param {String} curlid 
     * @param {module:api/CurriculumLessonsApi~deleteCurriculumLessonCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Message}
     */

  }, {
    key: "deleteCurriculumLesson",
    value: function deleteCurriculumLesson(unid, depid, curid, cursid, curlid, callback) {
      var postBody = null; // verify the required parameter 'unid' is set

      if (unid === undefined || unid === null) {
        throw new Error("Missing the required parameter 'unid' when calling deleteCurriculumLesson");
      } // verify the required parameter 'depid' is set


      if (depid === undefined || depid === null) {
        throw new Error("Missing the required parameter 'depid' when calling deleteCurriculumLesson");
      } // verify the required parameter 'curid' is set


      if (curid === undefined || curid === null) {
        throw new Error("Missing the required parameter 'curid' when calling deleteCurriculumLesson");
      } // verify the required parameter 'cursid' is set


      if (cursid === undefined || cursid === null) {
        throw new Error("Missing the required parameter 'cursid' when calling deleteCurriculumLesson");
      } // verify the required parameter 'curlid' is set


      if (curlid === undefined || curlid === null) {
        throw new Error("Missing the required parameter 'curlid' when calling deleteCurriculumLesson");
      }

      var pathParams = {
        'unid': unid,
        'depid': depid,
        'curid': curid,
        'cursid': cursid,
        'curlid': curlid
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['OAuth2PasswordBearer'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _Message.default;
      return this.apiClient.callApi('/universities/{unid}/departments/{depid}/curriculums/{curid}/semesters/{cursid}/lessons/{curlid}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the getSingleCurriculumLesson operation.
     * @callback module:api/CurriculumLessonsApi~getSingleCurriculumLessonCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CurriculumLessonModel} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Show Curriculum Lesson
     * Get a single semester of a curriculum with given universityID, universityDepartmentID, departmentCurriculumID, curriculumSemesterID and curriculumLessonID
     * @param {String} unid 
     * @param {String} depid 
     * @param {String} curid 
     * @param {String} cursid 
     * @param {String} curlid 
     * @param {module:api/CurriculumLessonsApi~getSingleCurriculumLessonCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CurriculumLessonModel}
     */

  }, {
    key: "getSingleCurriculumLesson",
    value: function getSingleCurriculumLesson(unid, depid, curid, cursid, curlid, callback) {
      var postBody = null; // verify the required parameter 'unid' is set

      if (unid === undefined || unid === null) {
        throw new Error("Missing the required parameter 'unid' when calling getSingleCurriculumLesson");
      } // verify the required parameter 'depid' is set


      if (depid === undefined || depid === null) {
        throw new Error("Missing the required parameter 'depid' when calling getSingleCurriculumLesson");
      } // verify the required parameter 'curid' is set


      if (curid === undefined || curid === null) {
        throw new Error("Missing the required parameter 'curid' when calling getSingleCurriculumLesson");
      } // verify the required parameter 'cursid' is set


      if (cursid === undefined || cursid === null) {
        throw new Error("Missing the required parameter 'cursid' when calling getSingleCurriculumLesson");
      } // verify the required parameter 'curlid' is set


      if (curlid === undefined || curlid === null) {
        throw new Error("Missing the required parameter 'curlid' when calling getSingleCurriculumLesson");
      }

      var pathParams = {
        'unid': unid,
        'depid': depid,
        'curid': curid,
        'cursid': cursid,
        'curlid': curlid
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = [];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _CurriculumLessonModel.default;
      return this.apiClient.callApi('/universities/{unid}/departments/{depid}/curriculums/{curid}/semesters/{cursid}/lessons/{curlid}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the listCurriculumLessons operation.
     * @callback module:api/CurriculumLessonsApi~listCurriculumLessonsCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/CurriculumLessonModel>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List Curriculum Lessons
     * list all lessons of a curriculum semester of a department with given universityID, universityDepartmentID, departmentCurriculumID and curriculumSemesterID
     * @param {String} unid 
     * @param {String} depid 
     * @param {String} curid 
     * @param {String} cursid 
     * @param {module:api/CurriculumLessonsApi~listCurriculumLessonsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/CurriculumLessonModel>}
     */

  }, {
    key: "listCurriculumLessons",
    value: function listCurriculumLessons(unid, depid, curid, cursid, callback) {
      var postBody = null; // verify the required parameter 'unid' is set

      if (unid === undefined || unid === null) {
        throw new Error("Missing the required parameter 'unid' when calling listCurriculumLessons");
      } // verify the required parameter 'depid' is set


      if (depid === undefined || depid === null) {
        throw new Error("Missing the required parameter 'depid' when calling listCurriculumLessons");
      } // verify the required parameter 'curid' is set


      if (curid === undefined || curid === null) {
        throw new Error("Missing the required parameter 'curid' when calling listCurriculumLessons");
      } // verify the required parameter 'cursid' is set


      if (cursid === undefined || cursid === null) {
        throw new Error("Missing the required parameter 'cursid' when calling listCurriculumLessons");
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
      var returnType = [_CurriculumLessonModel.default];
      return this.apiClient.callApi('/universities/{unid}/departments/{depid}/curriculums/{curid}/semesters{cursid}/lessons', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the updateCurriculumLesson operation.
     * @callback module:api/CurriculumLessonsApi~updateCurriculumLessonCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Message} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update Curriculum Lesson
     * Update semester of a curriculum with given universityID, universityDepartmentID, departmentCurriculumID, curriculumSemesterID and curriculumLessonID
     * @param {String} unid 
     * @param {String} depid 
     * @param {String} curid 
     * @param {String} cursid 
     * @param {String} curlid 
     * @param {module:model/CurriculumLessonModel} curriculumLessonModel 
     * @param {module:api/CurriculumLessonsApi~updateCurriculumLessonCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Message}
     */

  }, {
    key: "updateCurriculumLesson",
    value: function updateCurriculumLesson(unid, depid, curid, cursid, curlid, curriculumLessonModel, callback) {
      var postBody = curriculumLessonModel; // verify the required parameter 'unid' is set

      if (unid === undefined || unid === null) {
        throw new Error("Missing the required parameter 'unid' when calling updateCurriculumLesson");
      } // verify the required parameter 'depid' is set


      if (depid === undefined || depid === null) {
        throw new Error("Missing the required parameter 'depid' when calling updateCurriculumLesson");
      } // verify the required parameter 'curid' is set


      if (curid === undefined || curid === null) {
        throw new Error("Missing the required parameter 'curid' when calling updateCurriculumLesson");
      } // verify the required parameter 'cursid' is set


      if (cursid === undefined || cursid === null) {
        throw new Error("Missing the required parameter 'cursid' when calling updateCurriculumLesson");
      } // verify the required parameter 'curlid' is set


      if (curlid === undefined || curlid === null) {
        throw new Error("Missing the required parameter 'curlid' when calling updateCurriculumLesson");
      } // verify the required parameter 'curriculumLessonModel' is set


      if (curriculumLessonModel === undefined || curriculumLessonModel === null) {
        throw new Error("Missing the required parameter 'curriculumLessonModel' when calling updateCurriculumLesson");
      }

      var pathParams = {
        'unid': unid,
        'depid': depid,
        'curid': curid,
        'cursid': cursid,
        'curlid': curlid
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['OAuth2PasswordBearer'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = _Message.default;
      return this.apiClient.callApi('/universities/{unid}/departments/{depid}/curriculums/{curid}/semesters/{cursid}/lessons/{curlid}', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
  }]);

  return CurriculumLessonsApi;
}();

exports.default = CurriculumLessonsApi;