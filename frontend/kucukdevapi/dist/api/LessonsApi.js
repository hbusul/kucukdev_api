"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _AbsenceModel = _interopRequireDefault(require("../model/AbsenceModel"));

var _HTTPValidationError = _interopRequireDefault(require("../model/HTTPValidationError"));

var _LessonAPIModel = _interopRequireDefault(require("../model/LessonAPIModel"));

var _LessonModel = _interopRequireDefault(require("../model/LessonModel"));

var _Message = _interopRequireDefault(require("../model/Message"));

var _UpdateLessonModel = _interopRequireDefault(require("../model/UpdateLessonModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
* Lessons service.
* @module api/LessonsApi
* @version 1.0.0
*/
var LessonsApi = /*#__PURE__*/function () {
  /**
  * Constructs a new LessonsApi. 
  * @alias module:api/LessonsApi
  * @class
  * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
  * default to {@link module:ApiClient#instance} if unspecified.
  */
  function LessonsApi(apiClient) {
    _classCallCheck(this, LessonsApi);

    this.apiClient = apiClient || _ApiClient.default.instance;
  }
  /**
   * Callback function to receive the result of the createAbsence operation.
   * @callback module:api/LessonsApi~createAbsenceCallback
   * @param {String} error Error message, if any.
   * @param {module:model/Message} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Create Absence
   * Create an absence for a lesson with given userID, semesterID and lessonID
   * @param {String} uid 
   * @param {String} sid 
   * @param {String} lid 
   * @param {module:model/AbsenceModel} absenceModel 
   * @param {module:api/LessonsApi~createAbsenceCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/Message}
   */


  _createClass(LessonsApi, [{
    key: "createAbsence",
    value: function createAbsence(uid, sid, lid, absenceModel, callback) {
      var postBody = absenceModel; // verify the required parameter 'uid' is set

      if (uid === undefined || uid === null) {
        throw new Error("Missing the required parameter 'uid' when calling createAbsence");
      } // verify the required parameter 'sid' is set


      if (sid === undefined || sid === null) {
        throw new Error("Missing the required parameter 'sid' when calling createAbsence");
      } // verify the required parameter 'lid' is set


      if (lid === undefined || lid === null) {
        throw new Error("Missing the required parameter 'lid' when calling createAbsence");
      } // verify the required parameter 'absenceModel' is set


      if (absenceModel === undefined || absenceModel === null) {
        throw new Error("Missing the required parameter 'absenceModel' when calling createAbsence");
      }

      var pathParams = {
        'uid': uid,
        'sid': sid,
        'lid': lid
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['OAuth2PasswordBearer'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = _Message.default;
      return this.apiClient.callApi('/users/{uid}/semesters/{sid}/lessons/{lid}/absences', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the createLesson operation.
     * @callback module:api/LessonsApi~createLessonCallback
     * @param {String} error Error message, if any.
     * @param {module:model/LessonAPIModel} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Create Lesson
     * Create a lessons for a semester with given userID, semesterID
     * @param {String} uid 
     * @param {String} sid 
     * @param {module:model/LessonModel} lessonModel 
     * @param {module:api/LessonsApi~createLessonCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/LessonAPIModel}
     */

  }, {
    key: "createLesson",
    value: function createLesson(uid, sid, lessonModel, callback) {
      var postBody = lessonModel; // verify the required parameter 'uid' is set

      if (uid === undefined || uid === null) {
        throw new Error("Missing the required parameter 'uid' when calling createLesson");
      } // verify the required parameter 'sid' is set


      if (sid === undefined || sid === null) {
        throw new Error("Missing the required parameter 'sid' when calling createLesson");
      } // verify the required parameter 'lessonModel' is set


      if (lessonModel === undefined || lessonModel === null) {
        throw new Error("Missing the required parameter 'lessonModel' when calling createLesson");
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
      var returnType = _LessonAPIModel.default;
      return this.apiClient.callApi('/users/{uid}/semesters/{sid}/lessons', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the deleteAbsence operation.
     * @callback module:api/LessonsApi~deleteAbsenceCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Message} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete Absence
     * Delete an absence from a lesson with given userID, semesterID and lessonID
     * @param {String} uid 
     * @param {String} sid 
     * @param {String} lid 
     * @param {module:model/AbsenceModel} absenceModel 
     * @param {module:api/LessonsApi~deleteAbsenceCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Message}
     */

  }, {
    key: "deleteAbsence",
    value: function deleteAbsence(uid, sid, lid, absenceModel, callback) {
      var postBody = absenceModel; // verify the required parameter 'uid' is set

      if (uid === undefined || uid === null) {
        throw new Error("Missing the required parameter 'uid' when calling deleteAbsence");
      } // verify the required parameter 'sid' is set


      if (sid === undefined || sid === null) {
        throw new Error("Missing the required parameter 'sid' when calling deleteAbsence");
      } // verify the required parameter 'lid' is set


      if (lid === undefined || lid === null) {
        throw new Error("Missing the required parameter 'lid' when calling deleteAbsence");
      } // verify the required parameter 'absenceModel' is set


      if (absenceModel === undefined || absenceModel === null) {
        throw new Error("Missing the required parameter 'absenceModel' when calling deleteAbsence");
      }

      var pathParams = {
        'uid': uid,
        'sid': sid,
        'lid': lid
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['OAuth2PasswordBearer'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = _Message.default;
      return this.apiClient.callApi('/users/{uid}/semesters/{sid}/lessons/{lid}/absences', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the deleteLesson operation.
     * @callback module:api/LessonsApi~deleteLessonCallback
     * @param {String} error Error message, if any.
     * @param {module:model/LessonModel} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete Lesson
     * Delete a lesson with given userID, semesterID and lessonID
     * @param {String} uid 
     * @param {String} sid 
     * @param {String} lid 
     * @param {module:api/LessonsApi~deleteLessonCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/LessonModel}
     */

  }, {
    key: "deleteLesson",
    value: function deleteLesson(uid, sid, lid, callback) {
      var postBody = null; // verify the required parameter 'uid' is set

      if (uid === undefined || uid === null) {
        throw new Error("Missing the required parameter 'uid' when calling deleteLesson");
      } // verify the required parameter 'sid' is set


      if (sid === undefined || sid === null) {
        throw new Error("Missing the required parameter 'sid' when calling deleteLesson");
      } // verify the required parameter 'lid' is set


      if (lid === undefined || lid === null) {
        throw new Error("Missing the required parameter 'lid' when calling deleteLesson");
      }

      var pathParams = {
        'uid': uid,
        'sid': sid,
        'lid': lid
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['OAuth2PasswordBearer'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _LessonModel.default;
      return this.apiClient.callApi('/users/{uid}/semesters/{sid}/lessons/{lid}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the getSingleLesson operation.
     * @callback module:api/LessonsApi~getSingleLessonCallback
     * @param {String} error Error message, if any.
     * @param {module:model/LessonAPIModel} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Show Lesson
     * Get a single lesson with given userID, semesterID and lessonID
     * @param {String} uid 
     * @param {String} sid 
     * @param {String} lid 
     * @param {module:api/LessonsApi~getSingleLessonCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/LessonAPIModel}
     */

  }, {
    key: "getSingleLesson",
    value: function getSingleLesson(uid, sid, lid, callback) {
      var postBody = null; // verify the required parameter 'uid' is set

      if (uid === undefined || uid === null) {
        throw new Error("Missing the required parameter 'uid' when calling getSingleLesson");
      } // verify the required parameter 'sid' is set


      if (sid === undefined || sid === null) {
        throw new Error("Missing the required parameter 'sid' when calling getSingleLesson");
      } // verify the required parameter 'lid' is set


      if (lid === undefined || lid === null) {
        throw new Error("Missing the required parameter 'lid' when calling getSingleLesson");
      }

      var pathParams = {
        'uid': uid,
        'sid': sid,
        'lid': lid
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['OAuth2PasswordBearer'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _LessonAPIModel.default;
      return this.apiClient.callApi('/users/{uid}/semesters/{sid}/lessons/{lid}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the listLessonsOfSemester operation.
     * @callback module:api/LessonsApi~listLessonsOfSemesterCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/LessonAPIModel>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List Lessons
     * List all lessons of a semester with given userID, semesterID
     * @param {String} uid 
     * @param {String} sid 
     * @param {module:api/LessonsApi~listLessonsOfSemesterCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/LessonAPIModel>}
     */

  }, {
    key: "listLessonsOfSemester",
    value: function listLessonsOfSemester(uid, sid, callback) {
      var postBody = null; // verify the required parameter 'uid' is set

      if (uid === undefined || uid === null) {
        throw new Error("Missing the required parameter 'uid' when calling listLessonsOfSemester");
      } // verify the required parameter 'sid' is set


      if (sid === undefined || sid === null) {
        throw new Error("Missing the required parameter 'sid' when calling listLessonsOfSemester");
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
      var returnType = [_LessonAPIModel.default];
      return this.apiClient.callApi('/users/{uid}/semesters/{sid}/lessons', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the updateLesson operation.
     * @callback module:api/LessonsApi~updateLessonCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Message} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update Lesson
     * Update a lesson with given userID, semesterID and lessonID
     * @param {String} uid 
     * @param {String} sid 
     * @param {String} lid 
     * @param {module:model/UpdateLessonModel} updateLessonModel 
     * @param {module:api/LessonsApi~updateLessonCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Message}
     */

  }, {
    key: "updateLesson",
    value: function updateLesson(uid, sid, lid, updateLessonModel, callback) {
      var postBody = updateLessonModel; // verify the required parameter 'uid' is set

      if (uid === undefined || uid === null) {
        throw new Error("Missing the required parameter 'uid' when calling updateLesson");
      } // verify the required parameter 'sid' is set


      if (sid === undefined || sid === null) {
        throw new Error("Missing the required parameter 'sid' when calling updateLesson");
      } // verify the required parameter 'lid' is set


      if (lid === undefined || lid === null) {
        throw new Error("Missing the required parameter 'lid' when calling updateLesson");
      } // verify the required parameter 'updateLessonModel' is set


      if (updateLessonModel === undefined || updateLessonModel === null) {
        throw new Error("Missing the required parameter 'updateLessonModel' when calling updateLesson");
      }

      var pathParams = {
        'uid': uid,
        'sid': sid,
        'lid': lid
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['OAuth2PasswordBearer'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = _Message.default;
      return this.apiClient.callApi('/users/{uid}/semesters/{sid}/lessons/{lid}', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
  }]);

  return LessonsApi;
}();

exports.default = LessonsApi;