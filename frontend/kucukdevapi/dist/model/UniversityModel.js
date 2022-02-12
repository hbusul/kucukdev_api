"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _UniversityDepartmentModel = _interopRequireDefault(require("./UniversityDepartmentModel"));

var _UniversitySemesterModel = _interopRequireDefault(require("./UniversitySemesterModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/**
 * The UniversityModel model module.
 * @module model/UniversityModel
 * @version 1.0.0
 */
var UniversityModel = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>UniversityModel</code>.
   * @alias module:model/UniversityModel
   * @param name {String} 
   */
  function UniversityModel(name) {
    _classCallCheck(this, UniversityModel);

    UniversityModel.initialize(this, name);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(UniversityModel, null, [{
    key: "initialize",
    value: function initialize(obj, name) {
      obj['name'] = name;
    }
    /**
     * Constructs a <code>UniversityModel</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/UniversityModel} obj Optional instance to populate.
     * @return {module:model/UniversityModel} The populated <code>UniversityModel</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new UniversityModel();

        if (data.hasOwnProperty('_id')) {
          obj['_id'] = _ApiClient.default.convertToType(data['_id'], 'String');
        }

        if (data.hasOwnProperty('name')) {
          obj['name'] = _ApiClient.default.convertToType(data['name'], 'String');
        }

        if (data.hasOwnProperty('departments')) {
          obj['departments'] = _ApiClient.default.convertToType(data['departments'], [_UniversityDepartmentModel.default]);
        }

        if (data.hasOwnProperty('semesters')) {
          obj['semesters'] = _ApiClient.default.convertToType(data['semesters'], [_UniversitySemesterModel.default]);
        }
      }

      return obj;
    }
  }]);

  return UniversityModel;
}();
/**
 * @member {String} _id
 */


UniversityModel.prototype['_id'] = undefined;
/**
 * @member {String} name
 */

UniversityModel.prototype['name'] = undefined;
/**
 * @member {Array.<module:model/UniversityDepartmentModel>} departments
 */

UniversityModel.prototype['departments'] = undefined;
/**
 * @member {Array.<module:model/UniversitySemesterModel>} semesters
 */

UniversityModel.prototype['semesters'] = undefined;
var _default = UniversityModel;
exports.default = _default;