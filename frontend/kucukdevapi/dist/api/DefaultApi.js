"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _HTTPValidationError = _interopRequireDefault(require("../model/HTTPValidationError"));

var _Message = _interopRequireDefault(require("../model/Message"));

var _Token = _interopRequireDefault(require("../model/Token"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
* Default service.
* @module api/DefaultApi
* @version 1.0.0
*/
var DefaultApi = /*#__PURE__*/function () {
  /**
  * Constructs a new DefaultApi. 
  * @alias module:api/DefaultApi
  * @class
  * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
  * default to {@link module:ApiClient#instance} if unspecified.
  */
  function DefaultApi(apiClient) {
    _classCallCheck(this, DefaultApi);

    this.apiClient = apiClient || _ApiClient.default.instance;
  }
  /**
   * Callback function to receive the result of the loginForAccessTokenTokenPost operation.
   * @callback module:api/DefaultApi~loginForAccessTokenTokenPostCallback
   * @param {String} error Error message, if any.
   * @param {module:model/Token} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Login For Access Token
   * @param {String} username 
   * @param {String} password 
   * @param {Object} opts Optional parameters
   * @param {String} opts.grantType 
   * @param {String} opts.scope  (default to '')
   * @param {String} opts.clientId 
   * @param {String} opts.clientSecret 
   * @param {module:api/DefaultApi~loginForAccessTokenTokenPostCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/Token}
   */


  _createClass(DefaultApi, [{
    key: "loginForAccessTokenTokenPost",
    value: function loginForAccessTokenTokenPost(username, password, opts, callback) {
      opts = opts || {};
      var postBody = null; // verify the required parameter 'username' is set

      if (username === undefined || username === null) {
        throw new Error("Missing the required parameter 'username' when calling loginForAccessTokenTokenPost");
      } // verify the required parameter 'password' is set


      if (password === undefined || password === null) {
        throw new Error("Missing the required parameter 'password' when calling loginForAccessTokenTokenPost");
      }

      var pathParams = {};
      var queryParams = {};
      var headerParams = {};
      var formParams = {
        'grant_type': opts['grantType'],
        'username': username,
        'password': password,
        'scope': opts['scope'],
        'client_id': opts['clientId'],
        'client_secret': opts['clientSecret']
      };
      var authNames = [];
      var contentTypes = ['application/x-www-form-urlencoded'];
      var accepts = ['application/json'];
      var returnType = _Token.default;
      return this.apiClient.callApi('/token', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
  }]);

  return DefaultApi;
}();

exports.default = DefaultApi;