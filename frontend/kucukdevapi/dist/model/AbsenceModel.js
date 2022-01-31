"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/**
 * The AbsenceModel model module.
 * @module model/AbsenceModel
 * @version 1.0.0
 */
var AbsenceModel = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>AbsenceModel</code>.
   * @alias module:model/AbsenceModel
   * @param week {Number} 
   * @param day {Number} 
   * @param hour {Number} 
   * @param isLab {Number} 
   */
  function AbsenceModel(week, day, hour, isLab) {
    _classCallCheck(this, AbsenceModel);

    AbsenceModel.initialize(this, week, day, hour, isLab);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(AbsenceModel, null, [{
    key: "initialize",
    value: function initialize(obj, week, day, hour, isLab) {
      obj['week'] = week;
      obj['day'] = day;
      obj['hour'] = hour;
      obj['isLab'] = isLab;
    }
    /**
     * Constructs a <code>AbsenceModel</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AbsenceModel} obj Optional instance to populate.
     * @return {module:model/AbsenceModel} The populated <code>AbsenceModel</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new AbsenceModel();

        if (data.hasOwnProperty('week')) {
          obj['week'] = _ApiClient.default.convertToType(data['week'], 'Number');
        }

        if (data.hasOwnProperty('day')) {
          obj['day'] = _ApiClient.default.convertToType(data['day'], 'Number');
        }

        if (data.hasOwnProperty('hour')) {
          obj['hour'] = _ApiClient.default.convertToType(data['hour'], 'Number');
        }

        if (data.hasOwnProperty('isLab')) {
          obj['isLab'] = _ApiClient.default.convertToType(data['isLab'], 'Number');
        }
      }

      return obj;
    }
  }]);

  return AbsenceModel;
}();
/**
 * @member {Number} week
 */


AbsenceModel.prototype['week'] = undefined;
/**
 * @member {Number} day
 */

AbsenceModel.prototype['day'] = undefined;
/**
 * @member {Number} hour
 */

AbsenceModel.prototype['hour'] = undefined;
/**
 * @member {Number} isLab
 */

AbsenceModel.prototype['isLab'] = undefined;
var _default = AbsenceModel;
exports.default = _default;