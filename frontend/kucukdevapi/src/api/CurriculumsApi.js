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
import UniversityCurriculumModel from '../model/UniversityCurriculumModel';

/**
* Curriculums service.
* @module api/CurriculumsApi
* @version 1.0.0
*/
export default class CurriculumsApi {

    /**
    * Constructs a new CurriculumsApi. 
    * @alias module:api/CurriculumsApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
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
    createUniversityDepartmentCurriculum(unid, depid, universityCurriculumModel, callback) {
      let postBody = universityCurriculumModel;
      // verify the required parameter 'unid' is set
      if (unid === undefined || unid === null) {
        throw new Error("Missing the required parameter 'unid' when calling createUniversityDepartmentCurriculum");
      }
      // verify the required parameter 'depid' is set
      if (depid === undefined || depid === null) {
        throw new Error("Missing the required parameter 'depid' when calling createUniversityDepartmentCurriculum");
      }
      // verify the required parameter 'universityCurriculumModel' is set
      if (universityCurriculumModel === undefined || universityCurriculumModel === null) {
        throw new Error("Missing the required parameter 'universityCurriculumModel' when calling createUniversityDepartmentCurriculum");
      }

      let pathParams = {
        'unid': unid,
        'depid': depid
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
      let returnType = UniversityCurriculumModel;
      return this.apiClient.callApi(
        '/universities/{unid}/departments/{depid}/curriculums', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
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
    deleteUniversityDepartmentCurriculum(unid, depid, curid, callback) {
      let postBody = null;
      // verify the required parameter 'unid' is set
      if (unid === undefined || unid === null) {
        throw new Error("Missing the required parameter 'unid' when calling deleteUniversityDepartmentCurriculum");
      }
      // verify the required parameter 'depid' is set
      if (depid === undefined || depid === null) {
        throw new Error("Missing the required parameter 'depid' when calling deleteUniversityDepartmentCurriculum");
      }
      // verify the required parameter 'curid' is set
      if (curid === undefined || curid === null) {
        throw new Error("Missing the required parameter 'curid' when calling deleteUniversityDepartmentCurriculum");
      }

      let pathParams = {
        'unid': unid,
        'depid': depid,
        'curid': curid
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
        '/universities/{unid}/departments/{depid}/curriculums/{curid}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
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
    getSingleUniversityDepartmentCurriculum(unid, depid, curid, callback) {
      let postBody = null;
      // verify the required parameter 'unid' is set
      if (unid === undefined || unid === null) {
        throw new Error("Missing the required parameter 'unid' when calling getSingleUniversityDepartmentCurriculum");
      }
      // verify the required parameter 'depid' is set
      if (depid === undefined || depid === null) {
        throw new Error("Missing the required parameter 'depid' when calling getSingleUniversityDepartmentCurriculum");
      }
      // verify the required parameter 'curid' is set
      if (curid === undefined || curid === null) {
        throw new Error("Missing the required parameter 'curid' when calling getSingleUniversityDepartmentCurriculum");
      }

      let pathParams = {
        'unid': unid,
        'depid': depid,
        'curid': curid
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
      let returnType = UniversityCurriculumModel;
      return this.apiClient.callApi(
        '/universities/{unid}/departments/{depid}/curriculums/{curid}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
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
    listUniversityDepartmentCurriculums(unid, depid, callback) {
      let postBody = null;
      // verify the required parameter 'unid' is set
      if (unid === undefined || unid === null) {
        throw new Error("Missing the required parameter 'unid' when calling listUniversityDepartmentCurriculums");
      }
      // verify the required parameter 'depid' is set
      if (depid === undefined || depid === null) {
        throw new Error("Missing the required parameter 'depid' when calling listUniversityDepartmentCurriculums");
      }

      let pathParams = {
        'unid': unid,
        'depid': depid
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
      let returnType = [UniversityCurriculumModel];
      return this.apiClient.callApi(
        '/universities/{unid}/departments/{depid}/curriculums', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
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
    updateUniversityDepartmentCurriculum(unid, depid, curid, universityCurriculumModel, callback) {
      let postBody = universityCurriculumModel;
      // verify the required parameter 'unid' is set
      if (unid === undefined || unid === null) {
        throw new Error("Missing the required parameter 'unid' when calling updateUniversityDepartmentCurriculum");
      }
      // verify the required parameter 'depid' is set
      if (depid === undefined || depid === null) {
        throw new Error("Missing the required parameter 'depid' when calling updateUniversityDepartmentCurriculum");
      }
      // verify the required parameter 'curid' is set
      if (curid === undefined || curid === null) {
        throw new Error("Missing the required parameter 'curid' when calling updateUniversityDepartmentCurriculum");
      }
      // verify the required parameter 'universityCurriculumModel' is set
      if (universityCurriculumModel === undefined || universityCurriculumModel === null) {
        throw new Error("Missing the required parameter 'universityCurriculumModel' when calling updateUniversityDepartmentCurriculum");
      }

      let pathParams = {
        'unid': unid,
        'depid': depid,
        'curid': curid
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
        '/universities/{unid}/departments/{depid}/curriculums/{curid}', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}
