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
 * The CurriculumLessonModel model module.
 * @module model/CurriculumLessonModel
 * @version 1.0.0
 */
var CurriculumLessonModel = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>CurriculumLessonModel</code>.
   * @alias module:model/CurriculumLessonModel
   * @param name {String} 
   * @param code {String} 
   * @param lessonType {String} 
   */
  function CurriculumLessonModel(name, code, lessonType) {
    _classCallCheck(this, CurriculumLessonModel);

    CurriculumLessonModel.initialize(this, name, code, lessonType);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(CurriculumLessonModel, null, [{
    key: "initialize",
    value: function initialize(obj, name, code, lessonType) {
      obj['name'] = name;
      obj['code'] = code;
      obj['lessonType'] = lessonType;
    }
    /**
     * Constructs a <code>CurriculumLessonModel</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/CurriculumLessonModel} obj Optional instance to populate.
     * @return {module:model/CurriculumLessonModel} The populated <code>CurriculumLessonModel</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new CurriculumLessonModel();

        if (data.hasOwnProperty('_id')) {
          obj['_id'] = _ApiClient.default.convertToType(data['_id'], 'String');
        }

        if (data.hasOwnProperty('name')) {
          obj['name'] = _ApiClient.default.convertToType(data['name'], 'String');
        }

        if (data.hasOwnProperty('code')) {
          obj['code'] = _ApiClient.default.convertToType(data['code'], 'String');
        }

        if (data.hasOwnProperty('lessonType')) {
          obj['lessonType'] = _ApiClient.default.convertToType(data['lessonType'], 'String');
        }
      }

      return obj;
    }
  }]);

  return CurriculumLessonModel;
}();
/**
 * @member {String} _id
 */


CurriculumLessonModel.prototype['_id'] = undefined;
/**
 * @member {String} name
 */

CurriculumLessonModel.prototype['name'] = undefined;
/**
 * @member {String} code
 */

CurriculumLessonModel.prototype['code'] = undefined;
/**
 * @member {String} lessonType
 */

CurriculumLessonModel.prototype['lessonType'] = undefined;
var _default = CurriculumLessonModel;
exports.default = _default;