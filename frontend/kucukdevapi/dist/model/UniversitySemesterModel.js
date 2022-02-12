"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _UniversityLessonAPIModel = _interopRequireDefault(require("./UniversityLessonAPIModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/**
 * The UniversitySemesterModel model module.
 * @module model/UniversitySemesterModel
 * @version 1.0.0
 */
var UniversitySemesterModel = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>UniversitySemesterModel</code>.
   * @alias module:model/UniversitySemesterModel
   * @param name {String} 
   */
  function UniversitySemesterModel(name) {
    _classCallCheck(this, UniversitySemesterModel);

    UniversitySemesterModel.initialize(this, name);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(UniversitySemesterModel, null, [{
    key: "initialize",
    value: function initialize(obj, name) {
      obj['name'] = name;
    }
    /**
     * Constructs a <code>UniversitySemesterModel</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/UniversitySemesterModel} obj Optional instance to populate.
     * @return {module:model/UniversitySemesterModel} The populated <code>UniversitySemesterModel</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new UniversitySemesterModel();

        if (data.hasOwnProperty('_id')) {
          obj['_id'] = _ApiClient.default.convertToType(data['_id'], 'String');
        }

        if (data.hasOwnProperty('name')) {
          obj['name'] = _ApiClient.default.convertToType(data['name'], 'String');
        }

        if (data.hasOwnProperty('lessons')) {
          obj['lessons'] = _ApiClient.default.convertToType(data['lessons'], [_UniversityLessonAPIModel.default]);
        }
      }

      return obj;
    }
  }]);

  return UniversitySemesterModel;
}();
/**
 * @member {String} _id
 */


UniversitySemesterModel.prototype['_id'] = undefined;
/**
 * @member {String} name
 */

UniversitySemesterModel.prototype['name'] = undefined;
/**
 * @member {Array.<module:model/UniversityLessonAPIModel>} lessons
 */

UniversitySemesterModel.prototype['lessons'] = undefined;
var _default = UniversitySemesterModel;
exports.default = _default;