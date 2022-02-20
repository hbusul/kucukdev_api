"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/**
 * The Token model module.
 * @module model/Token
 * @version 1.0.0
 */
var Token = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>Token</code>.
   * @alias module:model/Token
   * @param accessToken {String} 
   * @param tokenType {String} 
   */
  function Token(accessToken, tokenType) {
    _classCallCheck(this, Token);

    Token.initialize(this, accessToken, tokenType);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(Token, null, [{
    key: "initialize",
    value: function initialize(obj, accessToken, tokenType) {
      obj['access_token'] = accessToken;
      obj['token_type'] = tokenType;
    }
    /**
     * Constructs a <code>Token</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Token} obj Optional instance to populate.
     * @return {module:model/Token} The populated <code>Token</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new Token();

        if (data.hasOwnProperty('access_token')) {
          obj['access_token'] = _ApiClient.default.convertToType(data['access_token'], 'String');
        }

        if (data.hasOwnProperty('token_type')) {
          obj['token_type'] = _ApiClient.default.convertToType(data['token_type'], 'String');
        }
      }

      return obj;
    }
  }]);

  return Token;
}();
/**
 * @member {String} access_token
 */


Token.prototype['access_token'] = undefined;
/**
 * @member {String} token_type
 */

Token.prototype['token_type'] = undefined;
var _default = Token;
exports.default = _default;