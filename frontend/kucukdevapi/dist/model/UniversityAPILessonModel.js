"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _UniversitySectionModel = _interopRequireDefault(require("./UniversitySectionModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The UniversityAPILessonModel model module.
 * @module model/UniversityAPILessonModel
 * @version 1.0.0
 */
var UniversityAPILessonModel = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>UniversityAPILessonModel</code>.
   * @alias module:model/UniversityAPILessonModel
   * @param name {String} 
   * @param code {String} 
   * @param ects {Number} 
   * @param absenceLimit {Number} 
   */
  function UniversityAPILessonModel(name, code, ects, absenceLimit) {
    _classCallCheck(this, UniversityAPILessonModel);

    UniversityAPILessonModel.initialize(this, name, code, ects, absenceLimit);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(UniversityAPILessonModel, null, [{
    key: "initialize",
    value: function initialize(obj, name, code, ects, absenceLimit) {
      obj['name'] = name;
      obj['code'] = code;
      obj['ects'] = ects;
      obj['absenceLimit'] = absenceLimit;
    }
    /**
     * Constructs a <code>UniversityAPILessonModel</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/UniversityAPILessonModel} obj Optional instance to populate.
     * @return {module:model/UniversityAPILessonModel} The populated <code>UniversityAPILessonModel</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new UniversityAPILessonModel();

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
          obj['sections'] = _ApiClient.default.convertToType(data['sections'], [_UniversitySectionModel.default]);
        }
      }

      return obj;
    }
  }]);

  return UniversityAPILessonModel;
}();
/**
 * @member {String} _id
 */


UniversityAPILessonModel.prototype['_id'] = undefined;
/**
 * @member {String} name
 */

UniversityAPILessonModel.prototype['name'] = undefined;
/**
 * @member {String} code
 */

UniversityAPILessonModel.prototype['code'] = undefined;
/**
 * @member {Number} ects
 */

UniversityAPILessonModel.prototype['ects'] = undefined;
/**
 * @member {Number} absenceLimit
 */

UniversityAPILessonModel.prototype['absenceLimit'] = undefined;
/**
 * @member {Array.<module:model/UniversitySectionModel>} sections
 */

UniversityAPILessonModel.prototype['sections'] = undefined;
var _default = UniversityAPILessonModel;
exports.default = _default;