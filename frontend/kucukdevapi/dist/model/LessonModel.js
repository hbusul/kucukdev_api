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
 * The LessonModel model module.
 * @module model/LessonModel
 * @version 1.0.0
 */
var LessonModel = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>LessonModel</code>.
   * @alias module:model/LessonModel
   * @param name {String} 
   * @param instructor {String} 
   * @param absenceLimit {Number} 
   * @param slots {Array.<String>} 
   */
  function LessonModel(name, instructor, absenceLimit, slots) {
    _classCallCheck(this, LessonModel);

    LessonModel.initialize(this, name, instructor, absenceLimit, slots);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(LessonModel, null, [{
    key: "initialize",
    value: function initialize(obj, name, instructor, absenceLimit, slots) {
      obj['name'] = name;
      obj['instructor'] = instructor;
      obj['absenceLimit'] = absenceLimit;
      obj['slots'] = slots;
    }
    /**
     * Constructs a <code>LessonModel</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/LessonModel} obj Optional instance to populate.
     * @return {module:model/LessonModel} The populated <code>LessonModel</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new LessonModel();

        if (data.hasOwnProperty('_id')) {
          obj['_id'] = _ApiClient.default.convertToType(data['_id'], 'String');
        }

        if (data.hasOwnProperty('name')) {
          obj['name'] = _ApiClient.default.convertToType(data['name'], 'String');
        }

        if (data.hasOwnProperty('instructor')) {
          obj['instructor'] = _ApiClient.default.convertToType(data['instructor'], 'String');
        }

        if (data.hasOwnProperty('absenceLimit')) {
          obj['absenceLimit'] = _ApiClient.default.convertToType(data['absenceLimit'], 'Number');
        }

        if (data.hasOwnProperty('slots')) {
          obj['slots'] = _ApiClient.default.convertToType(data['slots'], ['String']);
        }

        if (data.hasOwnProperty('absences')) {
          obj['absences'] = _ApiClient.default.convertToType(data['absences'], ['String']);
        }
      }

      return obj;
    }
  }]);

  return LessonModel;
}();
/**
 * @member {String} _id
 */


LessonModel.prototype['_id'] = undefined;
/**
 * @member {String} name
 */

LessonModel.prototype['name'] = undefined;
/**
 * @member {String} instructor
 */

LessonModel.prototype['instructor'] = undefined;
/**
 * @member {Number} absenceLimit
 */

LessonModel.prototype['absenceLimit'] = undefined;
/**
 * @member {Array.<String>} slots
 */

LessonModel.prototype['slots'] = undefined;
/**
 * @member {Array.<String>} absences
 */

LessonModel.prototype['absences'] = undefined;
var _default = LessonModel;
exports.default = _default;