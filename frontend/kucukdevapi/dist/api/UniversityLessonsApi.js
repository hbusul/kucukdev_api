"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _HTTPValidationError = _interopRequireDefault(require("../model/HTTPValidationError"));

var _Message = _interopRequireDefault(require("../model/Message"));

var _UniversityLessonAPIModel = _interopRequireDefault(require("../model/UniversityLessonAPIModel"));

var _UniversityLessonModel = _interopRequireDefault(require("../model/UniversityLessonModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
* UniversityLessons service.
* @module api/UniversityLessonsApi
* @version 1.0.0
*/
var UniversityLessonsApi = /*#__PURE__*/function () {
  /**
  * Constructs a new UniversityLessonsApi. 
  * @alias module:api/UniversityLessonsApi
  * @class
  * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
  * default to {@link module:ApiClient#instance} if unspecified.
  */
  function UniversityLessonsApi(apiClient) {
    _classCallCheck(this, UniversityLessonsApi);

    this.apiClient = apiClient || _ApiClient.default.instance;
  }
  /**
   * Callback function to receive the result of the createUniversityLesson operation.
   * @callback module:api/UniversityLessonsApi~createUniversityLessonCallback
   * @param {String} error Error message, if any.
   * @param {module:model/Message} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Create University Lesson
   * Create a lesson for a semester of a university with given universityID and universitySemesterID
   * @param {String} unid 
   * @param {String} unisid 
   * @param {module:model/UniversityLessonModel} universityLessonModel 
   * @param {module:api/UniversityLessonsApi~createUniversityLessonCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/Message}
   */


  _createClass(UniversityLessonsApi, [{
    key: "createUniversityLesson",
    value: function createUniversityLesson(unid, unisid, universityLessonModel, callback) {
      var postBody = universityLessonModel; // verify the required parameter 'unid' is set

      if (unid === undefined || unid === null) {
        throw new Error("Missing the required parameter 'unid' when calling createUniversityLesson");
      } // verify the required parameter 'unisid' is set


      if (unisid === undefined || unisid === null) {
        throw new Error("Missing the required parameter 'unisid' when calling createUniversityLesson");
      } // verify the required parameter 'universityLessonModel' is set


      if (universityLessonModel === undefined || universityLessonModel === null) {
        throw new Error("Missing the required parameter 'universityLessonModel' when calling createUniversityLesson");
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
      return this.apiClient.callApi('/universities/{unid}/semesters/{unisid}/lessons', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the deleteUniversityLesson operation.
     * @callback module:api/UniversityLessonsApi~deleteUniversityLessonCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Message} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete University Lesson
     * Delete a university lesson with given universityID, universitySemesterID and universityLessonID
     * @param {String} unid 
     * @param {String} unisid 
     * @param {String} unilid 
     * @param {module:api/UniversityLessonsApi~deleteUniversityLessonCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Message}
     */

  }, {
    key: "deleteUniversityLesson",
    value: function deleteUniversityLesson(unid, unisid, unilid, callback) {
      var postBody = null; // verify the required parameter 'unid' is set

      if (unid === undefined || unid === null) {
        throw new Error("Missing the required parameter 'unid' when calling deleteUniversityLesson");
      } // verify the required parameter 'unisid' is set


      if (unisid === undefined || unisid === null) {
        throw new Error("Missing the required parameter 'unisid' when calling deleteUniversityLesson");
      } // verify the required parameter 'unilid' is set


      if (unilid === undefined || unilid === null) {
        throw new Error("Missing the required parameter 'unilid' when calling deleteUniversityLesson");
      }

      var pathParams = {
        'unid': unid,
        'unisid': unisid,
        'unilid': unilid
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['OAuth2PasswordBearer'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _Message.default;
      return this.apiClient.callApi('/universities/{unid}/semesters/{unisid}/lessons/{unilid}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the getSingleLessonWithCode operation.
     * @callback module:api/UniversityLessonsApi~getSingleLessonWithCodeCallback
     * @param {String} error Error message, if any.
     * @param {module:model/UniversityLessonAPIModel} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Show Lesson With Code
     * Get a single lesson of a university semester with given universityID and Lesson Code
     * @param {String} unid 
     * @param {String} code 
     * @param {module:api/UniversityLessonsApi~getSingleLessonWithCodeCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/UniversityLessonAPIModel}
     */

  }, {
    key: "getSingleLessonWithCode",
    value: function getSingleLessonWithCode(unid, code, callback) {
      var postBody = null; // verify the required parameter 'unid' is set

      if (unid === undefined || unid === null) {
        throw new Error("Missing the required parameter 'unid' when calling getSingleLessonWithCode");
      } // verify the required parameter 'code' is set


      if (code === undefined || code === null) {
        throw new Error("Missing the required parameter 'code' when calling getSingleLessonWithCode");
      }

      var pathParams = {
        'unid': unid
      };
      var queryParams = {
        'code': code
      };
      var headerParams = {};
      var formParams = {};
      var authNames = [];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _UniversityLessonAPIModel.default;
      return this.apiClient.callApi('/universities/{unid}/semesters/current-semester/lessons/find-code', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the getSingleUniversitySemesterLesson operation.
     * @callback module:api/UniversityLessonsApi~getSingleUniversitySemesterLessonCallback
     * @param {String} error Error message, if any.
     * @param {module:model/UniversityLessonAPIModel} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Show University Lesson
     * Get a single lesson of a university semester with given universityID, universitySemesterID and universityLessonID
     * @param {String} unid 
     * @param {String} unisid 
     * @param {String} unilid 
     * @param {module:api/UniversityLessonsApi~getSingleUniversitySemesterLessonCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/UniversityLessonAPIModel}
     */

  }, {
    key: "getSingleUniversitySemesterLesson",
    value: function getSingleUniversitySemesterLesson(unid, unisid, unilid, callback) {
      var postBody = null; // verify the required parameter 'unid' is set

      if (unid === undefined || unid === null) {
        throw new Error("Missing the required parameter 'unid' when calling getSingleUniversitySemesterLesson");
      } // verify the required parameter 'unisid' is set


      if (unisid === undefined || unisid === null) {
        throw new Error("Missing the required parameter 'unisid' when calling getSingleUniversitySemesterLesson");
      } // verify the required parameter 'unilid' is set


      if (unilid === undefined || unilid === null) {
        throw new Error("Missing the required parameter 'unilid' when calling getSingleUniversitySemesterLesson");
      }

      var pathParams = {
        'unid': unid,
        'unisid': unisid,
        'unilid': unilid
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = [];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _UniversityLessonAPIModel.default;
      return this.apiClient.callApi('/universities/{unid}/semesters/{unisid}/lessons/{unilid}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the listUniversitySemesterLessons operation.
     * @callback module:api/UniversityLessonsApi~listUniversitySemesterLessonsCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/UniversityLessonAPIModel>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List University Lessons
     * list all lessons for a semesters of a university with given universityID and universitySemesterID
     * @param {String} unid 
     * @param {String} unisid 
     * @param {module:api/UniversityLessonsApi~listUniversitySemesterLessonsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/UniversityLessonAPIModel>}
     */

  }, {
    key: "listUniversitySemesterLessons",
    value: function listUniversitySemesterLessons(unid, unisid, callback) {
      var postBody = null; // verify the required parameter 'unid' is set

      if (unid === undefined || unid === null) {
        throw new Error("Missing the required parameter 'unid' when calling listUniversitySemesterLessons");
      } // verify the required parameter 'unisid' is set


      if (unisid === undefined || unisid === null) {
        throw new Error("Missing the required parameter 'unisid' when calling listUniversitySemesterLessons");
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
      var returnType = [_UniversityLessonAPIModel.default];
      return this.apiClient.callApi('/universities/{unid}/semesters/{unisid}/lessons', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the updateUniversityLesson operation.
     * @callback module:api/UniversityLessonsApi~updateUniversityLessonCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Message} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update University Lesson
     * Update lesson of a university semester with given universityID, universitySemesterID and universityLessonID
     * @param {String} unid 
     * @param {String} unisid 
     * @param {String} unilid 
     * @param {module:model/UniversityLessonAPIModel} universityLessonAPIModel 
     * @param {module:api/UniversityLessonsApi~updateUniversityLessonCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Message}
     */

  }, {
    key: "updateUniversityLesson",
    value: function updateUniversityLesson(unid, unisid, unilid, universityLessonAPIModel, callback) {
      var postBody = universityLessonAPIModel; // verify the required parameter 'unid' is set

      if (unid === undefined || unid === null) {
        throw new Error("Missing the required parameter 'unid' when calling updateUniversityLesson");
      } // verify the required parameter 'unisid' is set


      if (unisid === undefined || unisid === null) {
        throw new Error("Missing the required parameter 'unisid' when calling updateUniversityLesson");
      } // verify the required parameter 'unilid' is set


      if (unilid === undefined || unilid === null) {
        throw new Error("Missing the required parameter 'unilid' when calling updateUniversityLesson");
      } // verify the required parameter 'universityLessonAPIModel' is set


      if (universityLessonAPIModel === undefined || universityLessonAPIModel === null) {
        throw new Error("Missing the required parameter 'universityLessonAPIModel' when calling updateUniversityLesson");
      }

      var pathParams = {
        'unid': unid,
        'unisid': unisid,
        'unilid': unilid
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['OAuth2PasswordBearer'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = _Message.default;
      return this.apiClient.callApi('/universities/{unid}/semesters/{unisid}/lessons/{unilid}', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
  }]);

  return UniversityLessonsApi;
}();

exports.default = UniversityLessonsApi;