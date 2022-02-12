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
 * The MessageCreate model module.
 * @module model/MessageCreate
 * @version 1.0.0
 */
var MessageCreate = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>MessageCreate</code>.
   * @alias module:model/MessageCreate
   * @param id {String} 
   * @param message {String} 
   */
  function MessageCreate(id, message) {
    _classCallCheck(this, MessageCreate);

    MessageCreate.initialize(this, id, message);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(MessageCreate, null, [{
    key: "initialize",
    value: function initialize(obj, id, message) {
      obj['_id'] = id;
      obj['message'] = message;
    }
    /**
     * Constructs a <code>MessageCreate</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/MessageCreate} obj Optional instance to populate.
     * @return {module:model/MessageCreate} The populated <code>MessageCreate</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new MessageCreate();

        if (data.hasOwnProperty('_id')) {
          obj['_id'] = _ApiClient.default.convertToType(data['_id'], 'String');
        }

        if (data.hasOwnProperty('message')) {
          obj['message'] = _ApiClient.default.convertToType(data['message'], 'String');
        }
      }

      return obj;
    }
  }]);

  return MessageCreate;
}();
/**
 * @member {String} _id
 */


MessageCreate.prototype['_id'] = undefined;
/**
 * @member {String} message
 */

MessageCreate.prototype['message'] = undefined;
var _default = MessageCreate;
exports.default = _default;