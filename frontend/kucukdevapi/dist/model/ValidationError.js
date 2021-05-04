"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The ValidationError model module.
 * @module model/ValidationError
 * @version 1.0.0
 */
var ValidationError = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>ValidationError</code>.
   * @alias module:model/ValidationError
   * @param loc {Array.<String>} 
   * @param msg {String} 
   * @param type {String} 
   */
  function ValidationError(loc, msg, type) {
    _classCallCheck(this, ValidationError);

    ValidationError.initialize(this, loc, msg, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(ValidationError, null, [{
    key: "initialize",
    value: function initialize(obj, loc, msg, type) {
      obj['loc'] = loc;
      obj['msg'] = msg;
      obj['type'] = type;
    }
    /**
     * Constructs a <code>ValidationError</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ValidationError} obj Optional instance to populate.
     * @return {module:model/ValidationError} The populated <code>ValidationError</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new ValidationError();

        if (data.hasOwnProperty('loc')) {
          obj['loc'] = _ApiClient.default.convertToType(data['loc'], ['String']);
        }

        if (data.hasOwnProperty('msg')) {
          obj['msg'] = _ApiClient.default.convertToType(data['msg'], 'String');
        }

        if (data.hasOwnProperty('type')) {
          obj['type'] = _ApiClient.default.convertToType(data['type'], 'String');
        }
      }

      return obj;
    }
  }]);

  return ValidationError;
}();
/**
 * @member {Array.<String>} loc
 */


ValidationError.prototype['loc'] = undefined;
/**
 * @member {String} msg
 */

ValidationError.prototype['msg'] = undefined;
/**
 * @member {String} type
 */

ValidationError.prototype['type'] = undefined;
var _default = ValidationError;
exports.default = _default;