"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _UniversityCurriculumModel = _interopRequireDefault(require("./UniversityCurriculumModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/**
 * The UniversityDepartmentModel model module.
 * @module model/UniversityDepartmentModel
 * @version 1.0.0
 */
var UniversityDepartmentModel = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>UniversityDepartmentModel</code>.
   * @alias module:model/UniversityDepartmentModel
   * @param name {String} 
   */
  function UniversityDepartmentModel(name) {
    _classCallCheck(this, UniversityDepartmentModel);

    UniversityDepartmentModel.initialize(this, name);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(UniversityDepartmentModel, null, [{
    key: "initialize",
    value: function initialize(obj, name) {
      obj['name'] = name;
    }
    /**
     * Constructs a <code>UniversityDepartmentModel</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/UniversityDepartmentModel} obj Optional instance to populate.
     * @return {module:model/UniversityDepartmentModel} The populated <code>UniversityDepartmentModel</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new UniversityDepartmentModel();

        if (data.hasOwnProperty('_id')) {
          obj['_id'] = _ApiClient.default.convertToType(data['_id'], 'String');
        }

        if (data.hasOwnProperty('name')) {
          obj['name'] = _ApiClient.default.convertToType(data['name'], 'String');
        }

        if (data.hasOwnProperty('curriculums')) {
          obj['curriculums'] = _ApiClient.default.convertToType(data['curriculums'], [_UniversityCurriculumModel.default]);
        }
      }

      return obj;
    }
  }]);

  return UniversityDepartmentModel;
}();
/**
 * @member {String} _id
 */


UniversityDepartmentModel.prototype['_id'] = undefined;
/**
 * @member {String} name
 */

UniversityDepartmentModel.prototype['name'] = undefined;
/**
 * @member {Array.<module:model/UniversityCurriculumModel>} curriculums
 */

UniversityDepartmentModel.prototype['curriculums'] = undefined;
var _default = UniversityDepartmentModel;
exports.default = _default;