"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _CurriculumLessonModel = _interopRequireDefault(require("./CurriculumLessonModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The CurriculumSemesterModel model module.
 * @module model/CurriculumSemesterModel
 * @version 1.0.0
 */
var CurriculumSemesterModel = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>CurriculumSemesterModel</code>.
   * @alias module:model/CurriculumSemesterModel
   * @param semester {Number} 
   */
  function CurriculumSemesterModel(semester) {
    _classCallCheck(this, CurriculumSemesterModel);

    CurriculumSemesterModel.initialize(this, semester);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(CurriculumSemesterModel, null, [{
    key: "initialize",
    value: function initialize(obj, semester) {
      obj['semester'] = semester;
    }
    /**
     * Constructs a <code>CurriculumSemesterModel</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/CurriculumSemesterModel} obj Optional instance to populate.
     * @return {module:model/CurriculumSemesterModel} The populated <code>CurriculumSemesterModel</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new CurriculumSemesterModel();

        if (data.hasOwnProperty('_id')) {
          obj['_id'] = _ApiClient.default.convertToType(data['_id'], 'String');
        }

        if (data.hasOwnProperty('semester')) {
          obj['semester'] = _ApiClient.default.convertToType(data['semester'], 'Number');
        }

        if (data.hasOwnProperty('lessons')) {
          obj['lessons'] = _ApiClient.default.convertToType(data['lessons'], [_CurriculumLessonModel.default]);
        }
      }

      return obj;
    }
  }]);

  return CurriculumSemesterModel;
}();
/**
 * @member {String} _id
 */


CurriculumSemesterModel.prototype['_id'] = undefined;
/**
 * @member {Number} semester
 */

CurriculumSemesterModel.prototype['semester'] = undefined;
/**
 * @member {Array.<module:model/CurriculumLessonModel>} lessons
 */

CurriculumSemesterModel.prototype['lessons'] = undefined;
var _default = CurriculumSemesterModel;
exports.default = _default;