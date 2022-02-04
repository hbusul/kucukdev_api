"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _ValidationError = _interopRequireDefault(require("./ValidationError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The HTTPValidationError model module.
 * @module model/HTTPValidationError
 * @version 1.0.0
 */
var HTTPValidationError = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>HTTPValidationError</code>.
   * @alias module:model/HTTPValidationError
   */
  function HTTPValidationError() {
    _classCallCheck(this, HTTPValidationError);

    HTTPValidationError.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(HTTPValidationError, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>HTTPValidationError</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/HTTPValidationError} obj Optional instance to populate.
     * @return {module:model/HTTPValidationError} The populated <code>HTTPValidationError</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new HTTPValidationError();

        if (data.hasOwnProperty('detail')) {
          obj['detail'] = _ApiClient.default.convertToType(data['detail'], [_ValidationError.default]);
        }
      }

      return obj;
    }
  }]);

  return HTTPValidationError;
}();
/**
 * @member {Array.<module:model/ValidationError>} detail
 */


HTTPValidationError.prototype['detail'] = undefined;
var _default = HTTPValidationError;
exports.default = _default;