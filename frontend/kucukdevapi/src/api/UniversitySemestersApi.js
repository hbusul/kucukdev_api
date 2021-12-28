/**
 * kucukdevapi
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */


import ApiClient from "../ApiClient";
import HTTPValidationError from '../model/HTTPValidationError';
import Message from '../model/Message';
import UniversitySemesterModel from '../model/UniversitySemesterModel';

/**
* UniversitySemesters service.
* @module api/UniversitySemestersApi
* @version 1.0.0
*/
export default class UniversitySemestersApi {

    /**
    * Constructs a new UniversitySemestersApi. 
    * @alias module:api/UniversitySemestersApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
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
    createUniversitySemester(unid, universitySemesterModel, callback) {
      let postBody = universitySemesterModel;
      // verify the required parameter 'unid' is set
      if (unid === undefined || unid === null) {
        throw new Error("Missing the required parameter 'unid' when calling createUniversitySemester");
      }
      // verify the required parameter 'universitySemesterModel' is set
      if (universitySemesterModel === undefined || universitySemesterModel === null) {
        throw new Error("Missing the required parameter 'universitySemesterModel' when calling createUniversitySemester");
      }

      let pathParams = {
        'unid': unid
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['OAuth2PasswordBearer'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = UniversitySemesterModel;
      return this.apiClient.callApi(
        '/universities/{unid}/semesters', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
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
    deleteUniversitySemester(unid, unisid, callback) {
      let postBody = null;
      // verify the required parameter 'unid' is set
      if (unid === undefined || unid === null) {
        throw new Error("Missing the required parameter 'unid' when calling deleteUniversitySemester");
      }
      // verify the required parameter 'unisid' is set
      if (unisid === undefined || unisid === null) {
        throw new Error("Missing the required parameter 'unisid' when calling deleteUniversitySemester");
      }

      let pathParams = {
        'unid': unid,
        'unisid': unisid
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['OAuth2PasswordBearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = Message;
      return this.apiClient.callApi(
        '/universities/{unid}/semesters/{unisid}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
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
    getSingleUniversitySemesters(unid, unisid, callback) {
      let postBody = null;
      // verify the required parameter 'unid' is set
      if (unid === undefined || unid === null) {
        throw new Error("Missing the required parameter 'unid' when calling getSingleUniversitySemesters");
      }
      // verify the required parameter 'unisid' is set
      if (unisid === undefined || unisid === null) {
        throw new Error("Missing the required parameter 'unisid' when calling getSingleUniversitySemesters");
      }

      let pathParams = {
        'unid': unid,
        'unisid': unisid
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = [UniversitySemesterModel];
      return this.apiClient.callApi(
        '/universities/{unid}/semesters/{unisid}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
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
    listUniversitySemesters(unid, callback) {
      let postBody = null;
      // verify the required parameter 'unid' is set
      if (unid === undefined || unid === null) {
        throw new Error("Missing the required parameter 'unid' when calling listUniversitySemesters");
      }

      let pathParams = {
        'unid': unid
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = [UniversitySemesterModel];
      return this.apiClient.callApi(
        '/universities/{unid}/semesters', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
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
    updateUniversitySemester(unid, unisid, universitySemesterModel, callback) {
      let postBody = universitySemesterModel;
      // verify the required parameter 'unid' is set
      if (unid === undefined || unid === null) {
        throw new Error("Missing the required parameter 'unid' when calling updateUniversitySemester");
      }
      // verify the required parameter 'unisid' is set
      if (unisid === undefined || unisid === null) {
        throw new Error("Missing the required parameter 'unisid' when calling updateUniversitySemester");
      }
      // verify the required parameter 'universitySemesterModel' is set
      if (universitySemesterModel === undefined || universitySemesterModel === null) {
        throw new Error("Missing the required parameter 'universitySemesterModel' when calling updateUniversitySemester");
      }

      let pathParams = {
        'unid': unid,
        'unisid': unisid
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['OAuth2PasswordBearer'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = Message;
      return this.apiClient.callApi(
        '/universities/{unid}/semesters/{unisid}', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}