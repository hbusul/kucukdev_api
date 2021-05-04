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
 * The UniversitySectionModel model module.
 * @module model/UniversitySectionModel
 * @version 1.0.0
 */
var UniversitySectionModel = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>UniversitySectionModel</code>.
   * @alias module:model/UniversitySectionModel
   * @param section {String} 
   * @param instructor {String} 
   * @param slots {Array.<String>} 
   */
  function UniversitySectionModel(section, instructor, slots) {
    _classCallCheck(this, UniversitySectionModel);

    UniversitySectionModel.initialize(this, section, instructor, slots);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(UniversitySectionModel, null, [{
    key: "initialize",
    value: function initialize(obj, section, instructor, slots) {
      obj['section'] = section;
      obj['instructor'] = instructor;
      obj['slots'] = slots;
    }
    /**
     * Constructs a <code>UniversitySectionModel</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/UniversitySectionModel} obj Optional instance to populate.
     * @return {module:model/UniversitySectionModel} The populated <code>UniversitySectionModel</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new UniversitySectionModel();

        if (data.hasOwnProperty('_id')) {
          obj['_id'] = _ApiClient.default.convertToType(data['_id'], 'String');
        }

        if (data.hasOwnProperty('section')) {
          obj['section'] = _ApiClient.default.convertToType(data['section'], 'String');
        }

        if (data.hasOwnProperty('instructor')) {
          obj['instructor'] = _ApiClient.default.convertToType(data['instructor'], 'String');
        }

        if (data.hasOwnProperty('slots')) {
          obj['slots'] = _ApiClient.default.convertToType(data['slots'], ['String']);
        }
      }

      return obj;
    }
  }]);

  return UniversitySectionModel;
}();
/**
 * @member {String} _id
 */


UniversitySectionModel.prototype['_id'] = undefined;
/**
 * @member {String} section
 */

UniversitySectionModel.prototype['section'] = undefined;
/**
 * @member {String} instructor
 */

UniversitySectionModel.prototype['instructor'] = undefined;
/**
 * @member {Array.<String>} slots
 */

UniversitySectionModel.prototype['slots'] = undefined;
var _default = UniversitySectionModel;
exports.default = _default;