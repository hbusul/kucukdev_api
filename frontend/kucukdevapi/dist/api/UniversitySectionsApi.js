"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _HTTPValidationError = _interopRequireDefault(require("../model/HTTPValidationError"));

var _Message = _interopRequireDefault(require("../model/Message"));

var _UniversitySectionModel = _interopRequireDefault(require("../model/UniversitySectionModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
* UniversitySections service.
* @module api/UniversitySectionsApi
* @version 1.0.0
*/
var UniversitySectionsApi = /*#__PURE__*/function () {
  /**
  * Constructs a new UniversitySectionsApi. 
  * @alias module:api/UniversitySectionsApi
  * @class
  * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
  * default to {@link module:ApiClient#instance} if unspecified.
  */
  function UniversitySectionsApi(apiClient) {
    _classCallCheck(this, UniversitySectionsApi);

    this.apiClient = apiClient || _ApiClient.default.instance;
  }
  /**
   * Callback function to receive the result of the deleteLessonSection operation.
   * @callback module:api/UniversitySectionsApi~deleteLessonSectionCallback
   * @param {String} error Error message, if any.
   * @param {module:model/Message} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Delete Lesson Section
   * Delete a lesson section with given universityID, universitySemesterID, universityLessonID and sectionID
   * @param {String} unid 
   * @param {String} unisid 
   * @param {String} unilid 
   * @param {String} secid 
   * @param {module:api/UniversitySectionsApi~deleteLessonSectionCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/Message}
   */


  _createClass(UniversitySectionsApi, [{
    key: "deleteLessonSection",
    value: function deleteLessonSection(unid, unisid, unilid, secid, callback) {
      var postBody = null; // verify the required parameter 'unid' is set

      if (unid === undefined || unid === null) {
        throw new Error("Missing the required parameter 'unid' when calling deleteLessonSection");
      } // verify the required parameter 'unisid' is set


      if (unisid === undefined || unisid === null) {
        throw new Error("Missing the required parameter 'unisid' when calling deleteLessonSection");
      } // verify the required parameter 'unilid' is set


      if (unilid === undefined || unilid === null) {
        throw new Error("Missing the required parameter 'unilid' when calling deleteLessonSection");
      } // verify the required parameter 'secid' is set


      if (secid === undefined || secid === null) {
        throw new Error("Missing the required parameter 'secid' when calling deleteLessonSection");
      }

      var pathParams = {
        'unid': unid,
        'unisid': unisid,
        'unilid': unilid,
        'secid': secid
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['OAuth2PasswordBearer'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _Message.default;
      return this.apiClient.callApi('/universities/{unid}/semesters/{unisid}/lessons/{unilid}/sections/{secid}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the updateLessonSection operation.
     * @callback module:api/UniversitySectionsApi~updateLessonSectionCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Message} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update Lesson Section
     * Update section of a lesson with given universityID, universitySemesterID, universityLessonID and sectionID
     * @param {String} unid 
     * @param {String} unisid 
     * @param {String} unilid 
     * @param {String} secid 
     * @param {module:model/UniversitySectionModel} universitySectionModel 
     * @param {module:api/UniversitySectionsApi~updateLessonSectionCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Message}
     */

  }, {
    key: "updateLessonSection",
    value: function updateLessonSection(unid, unisid, unilid, secid, universitySectionModel, callback) {
      var postBody = universitySectionModel; // verify the required parameter 'unid' is set

      if (unid === undefined || unid === null) {
        throw new Error("Missing the required parameter 'unid' when calling updateLessonSection");
      } // verify the required parameter 'unisid' is set


      if (unisid === undefined || unisid === null) {
        throw new Error("Missing the required parameter 'unisid' when calling updateLessonSection");
      } // verify the required parameter 'unilid' is set


      if (unilid === undefined || unilid === null) {
        throw new Error("Missing the required parameter 'unilid' when calling updateLessonSection");
      } // verify the required parameter 'secid' is set


      if (secid === undefined || secid === null) {
        throw new Error("Missing the required parameter 'secid' when calling updateLessonSection");
      } // verify the required parameter 'universitySectionModel' is set


      if (universitySectionModel === undefined || universitySectionModel === null) {
        throw new Error("Missing the required parameter 'universitySectionModel' when calling updateLessonSection");
      }

      var pathParams = {
        'unid': unid,
        'unisid': unisid,
        'unilid': unilid,
        'secid': secid
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['OAuth2PasswordBearer'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = _Message.default;
      return this.apiClient.callApi('/universities/{unid}/semesters/{unisid}/lessons/{unilid}/sections/{secid}', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
  }]);

  return UniversitySectionsApi;
}();

exports.default = UniversitySectionsApi;