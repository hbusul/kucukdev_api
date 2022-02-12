"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _UniversitySectionAPIModel = _interopRequireDefault(require("./UniversitySectionAPIModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/**
 * The UniversityLessonAPIModel model module.
 * @module model/UniversityLessonAPIModel
 * @version 1.0.0
 */
var UniversityLessonAPIModel = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>UniversityLessonAPIModel</code>.
   * @alias module:model/UniversityLessonAPIModel
   * @param name {String} 
   * @param code {String} 
   * @param ects {Number} 
   * @param absenceLimit {Number} 
   */
  function UniversityLessonAPIModel(name, code, ects, absenceLimit) {
    _classCallCheck(this, UniversityLessonAPIModel);

    UniversityLessonAPIModel.initialize(this, name, code, ects, absenceLimit);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(UniversityLessonAPIModel, null, [{
    key: "initialize",
    value: function initialize(obj, name, code, ects, absenceLimit) {
      obj['name'] = name;
      obj['code'] = code;
      obj['ects'] = ects;
      obj['absenceLimit'] = absenceLimit;
    }
    /**
     * Constructs a <code>UniversityLessonAPIModel</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/UniversityLessonAPIModel} obj Optional instance to populate.
     * @return {module:model/UniversityLessonAPIModel} The populated <code>UniversityLessonAPIModel</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new UniversityLessonAPIModel();

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

        if (data.hasOwnProperty('sections')) {
          obj['sections'] = _ApiClient.default.convertToType(data['sections'], [_UniversitySectionAPIModel.default]);
        }
      }

      return obj;
    }
  }]);

  return UniversityLessonAPIModel;
}();
/**
 * @member {String} _id
 */


UniversityLessonAPIModel.prototype['_id'] = undefined;
/**
 * @member {String} name
 */

UniversityLessonAPIModel.prototype['name'] = undefined;
/**
 * @member {String} code
 */

UniversityLessonAPIModel.prototype['code'] = undefined;
/**
 * @member {Number} ects
 */

UniversityLessonAPIModel.prototype['ects'] = undefined;
/**
 * @member {Number} absenceLimit
 */

UniversityLessonAPIModel.prototype['absenceLimit'] = undefined;
/**
 * @member {Array.<module:model/UniversitySectionAPIModel>} sections
 */

UniversityLessonAPIModel.prototype['sections'] = undefined;
var _default = UniversityLessonAPIModel;
exports.default = _default;