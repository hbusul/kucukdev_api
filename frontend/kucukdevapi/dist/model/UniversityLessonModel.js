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
 * The UniversityLessonModel model module.
 * @module model/UniversityLessonModel
 * @version 1.0.0
 */
var UniversityLessonModel = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>UniversityLessonModel</code>.
   * @alias module:model/UniversityLessonModel
   * @param name {String} 
   * @param code {String} 
   * @param ects {Number} 
   * @param absenceLimit {Number} 
   * @param section {String} 
   * @param instructor {String} 
   * @param slots {Array.<String>} 
   */
  function UniversityLessonModel(name, code, ects, absenceLimit, section, instructor, slots) {
    _classCallCheck(this, UniversityLessonModel);

    UniversityLessonModel.initialize(this, name, code, ects, absenceLimit, section, instructor, slots);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(UniversityLessonModel, null, [{
    key: "initialize",
    value: function initialize(obj, name, code, ects, absenceLimit, section, instructor, slots) {
      obj['name'] = name;
      obj['code'] = code;
      obj['ects'] = ects;
      obj['absenceLimit'] = absenceLimit;
      obj['section'] = section;
      obj['instructor'] = instructor;
      obj['slots'] = slots;
    }
    /**
     * Constructs a <code>UniversityLessonModel</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/UniversityLessonModel} obj Optional instance to populate.
     * @return {module:model/UniversityLessonModel} The populated <code>UniversityLessonModel</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new UniversityLessonModel();

        if (data.hasOwnProperty('_id')) {
          obj['_id'] = _ApiClient.default.convertToType(data['_id'], 'String');
        }

        if (data.hasOwnProperty('name')) {
          obj['name'] = _ApiClient.default.convertToType(data['name'], 'String');
        }

        if (data.hasOwnProperty('code')) {
          obj['code'] = _ApiClient.default.convertToType(data['code'], 'String');
        }

        if (data.hasOwnProperty('ects')) {
          obj['ects'] = _ApiClient.default.convertToType(data['ects'], 'Number');
        }

        if (data.hasOwnProperty('absenceLimit')) {
          obj['absenceLimit'] = _ApiClient.default.convertToType(data['absenceLimit'], 'Number');
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

  return UniversityLessonModel;
}();
/**
 * @member {String} _id
 */


UniversityLessonModel.prototype['_id'] = undefined;
/**
 * @member {String} name
 */

UniversityLessonModel.prototype['name'] = undefined;
/**
 * @member {String} code
 */

UniversityLessonModel.prototype['code'] = undefined;
/**
 * @member {Number} ects
 */

UniversityLessonModel.prototype['ects'] = undefined;
/**
 * @member {Number} absenceLimit
 */

UniversityLessonModel.prototype['absenceLimit'] = undefined;
/**
 * @member {String} section
 */

UniversityLessonModel.prototype['section'] = undefined;
/**
 * @member {String} instructor
 */

UniversityLessonModel.prototype['instructor'] = undefined;
/**
 * @member {Array.<String>} slots
 */

UniversityLessonModel.prototype['slots'] = undefined;
var _default = UniversityLessonModel;
exports.default = _default;