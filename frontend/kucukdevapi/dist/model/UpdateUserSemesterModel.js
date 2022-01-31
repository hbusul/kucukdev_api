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
 * The UpdateUserSemesterModel model module.
 * @module model/UpdateUserSemesterModel
 * @version 1.0.0
 */
var UpdateUserSemesterModel = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>UpdateUserSemesterModel</code>.
   * @alias module:model/UpdateUserSemesterModel
   * @param name {String} 
   * @param startDate {Date} 
   * @param endDate {Date} 
   * @param startHour {String} 
   * @param dLesson {Number} 
   * @param dBreak {Number} 
   * @param slotCount {Number} 
   */
  function UpdateUserSemesterModel(name, startDate, endDate, startHour, dLesson, dBreak, slotCount) {
    _classCallCheck(this, UpdateUserSemesterModel);

    UpdateUserSemesterModel.initialize(this, name, startDate, endDate, startHour, dLesson, dBreak, slotCount);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(UpdateUserSemesterModel, null, [{
    key: "initialize",
    value: function initialize(obj, name, startDate, endDate, startHour, dLesson, dBreak, slotCount) {
      obj['name'] = name;
      obj['startDate'] = startDate;
      obj['endDate'] = endDate;
      obj['startHour'] = startHour;
      obj['dLesson'] = dLesson;
      obj['dBreak'] = dBreak;
      obj['slotCount'] = slotCount;
    }
    /**
     * Constructs a <code>UpdateUserSemesterModel</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/UpdateUserSemesterModel} obj Optional instance to populate.
     * @return {module:model/UpdateUserSemesterModel} The populated <code>UpdateUserSemesterModel</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new UpdateUserSemesterModel();

        if (data.hasOwnProperty('name')) {
          obj['name'] = _ApiClient.default.convertToType(data['name'], 'String');
        }

        if (data.hasOwnProperty('startDate')) {
          obj['startDate'] = _ApiClient.default.convertToType(data['startDate'], 'Date');
        }

        if (data.hasOwnProperty('endDate')) {
          obj['endDate'] = _ApiClient.default.convertToType(data['endDate'], 'Date');
        }

        if (data.hasOwnProperty('startHour')) {
          obj['startHour'] = _ApiClient.default.convertToType(data['startHour'], 'String');
        }

        if (data.hasOwnProperty('dLesson')) {
          obj['dLesson'] = _ApiClient.default.convertToType(data['dLesson'], 'Number');
        }

        if (data.hasOwnProperty('dBreak')) {
          obj['dBreak'] = _ApiClient.default.convertToType(data['dBreak'], 'Number');
        }

        if (data.hasOwnProperty('slotCount')) {
          obj['slotCount'] = _ApiClient.default.convertToType(data['slotCount'], 'Number');
        }
      }

      return obj;
    }
  }]);

  return UpdateUserSemesterModel;
}();
/**
 * @member {String} name
 */


UpdateUserSemesterModel.prototype['name'] = undefined;
/**
 * @member {Date} startDate
 */

UpdateUserSemesterModel.prototype['startDate'] = undefined;
/**
 * @member {Date} endDate
 */

UpdateUserSemesterModel.prototype['endDate'] = undefined;
/**
 * @member {String} startHour
 */

UpdateUserSemesterModel.prototype['startHour'] = undefined;
/**
 * @member {Number} dLesson
 */

UpdateUserSemesterModel.prototype['dLesson'] = undefined;
/**
 * @member {Number} dBreak
 */

UpdateUserSemesterModel.prototype['dBreak'] = undefined;
/**
 * @member {Number} slotCount
 */

UpdateUserSemesterModel.prototype['slotCount'] = undefined;
var _default = UpdateUserSemesterModel;
exports.default = _default;