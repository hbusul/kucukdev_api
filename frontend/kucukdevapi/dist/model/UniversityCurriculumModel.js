"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _CurriculumSemesterModel = _interopRequireDefault(require("./CurriculumSemesterModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The UniversityCurriculumModel model module.
 * @module model/UniversityCurriculumModel
 * @version 1.0.0
 */
var UniversityCurriculumModel = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>UniversityCurriculumModel</code>.
   * @alias module:model/UniversityCurriculumModel
   * @param name {String} 
   * @param startYear {Number} 
   * @param endYear {Number} 
   */
  function UniversityCurriculumModel(name, startYear, endYear) {
    _classCallCheck(this, UniversityCurriculumModel);

    UniversityCurriculumModel.initialize(this, name, startYear, endYear);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(UniversityCurriculumModel, null, [{
    key: "initialize",
    value: function initialize(obj, name, startYear, endYear) {
      obj['name'] = name;
      obj['startYear'] = startYear;
      obj['endYear'] = endYear;
    }
    /**
     * Constructs a <code>UniversityCurriculumModel</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/UniversityCurriculumModel} obj Optional instance to populate.
     * @return {module:model/UniversityCurriculumModel} The populated <code>UniversityCurriculumModel</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new UniversityCurriculumModel();

        if (data.hasOwnProperty('_id')) {
          obj['_id'] = _ApiClient.default.convertToType(data['_id'], 'String');
        }

        if (data.hasOwnProperty('name')) {
          obj['name'] = _ApiClient.default.convertToType(data['name'], 'String');
        }

        if (data.hasOwnProperty('startYear')) {
          obj['startYear'] = _ApiClient.default.convertToType(data['startYear'], 'Number');
        }

        if (data.hasOwnProperty('endYear')) {
          obj['endYear'] = _ApiClient.default.convertToType(data['endYear'], 'Number');
        }

        if (data.hasOwnProperty('semesters')) {
          obj['semesters'] = _ApiClient.default.convertToType(data['semesters'], [_CurriculumSemesterModel.default]);
        }
      }

      return obj;
    }
  }]);

  return UniversityCurriculumModel;
}();
/**
 * @member {String} _id
 */


UniversityCurriculumModel.prototype['_id'] = undefined;
/**
 * @member {String} name
 */

UniversityCurriculumModel.prototype['name'] = undefined;
/**
 * @member {Number} startYear
 */

UniversityCurriculumModel.prototype['startYear'] = undefined;
/**
 * @member {Number} endYear
 */

UniversityCurriculumModel.prototype['endYear'] = undefined;
/**
 * @member {Array.<module:model/CurriculumSemesterModel>} semesters
 */

UniversityCurriculumModel.prototype['semesters'] = undefined;
var _default = UniversityCurriculumModel;
exports.default = _default;