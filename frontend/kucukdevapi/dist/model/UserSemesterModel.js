"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _LessonModel = _interopRequireDefault(require("./LessonModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/**
 * The UserSemesterModel model module.
 * @module model/UserSemesterModel
 * @version 1.0.0
 */
var UserSemesterModel = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>UserSemesterModel</code>.
   * @alias module:model/UserSemesterModel
   * @param name {String} 
   * @param startDate {Date} 
   * @param endDate {Date} 
   * @param startHour {String} 
   * @param dLesson {Number} 
   * @param dBreak {Number} 
   * @param slotCount {Number} 
   */
  function UserSemesterModel(name, startDate, endDate, startHour, dLesson, dBreak, slotCount) {
    _classCallCheck(this, UserSemesterModel);

    UserSemesterModel.initialize(this, name, startDate, endDate, startHour, dLesson, dBreak, slotCount);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(UserSemesterModel, null, [{
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
     * Constructs a <code>UserSemesterModel</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/UserSemesterModel} obj Optional instance to populate.
     * @return {module:model/UserSemesterModel} The populated <code>UserSemesterModel</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new UserSemesterModel();

        if (data.hasOwnProperty('_id')) {
          obj['_id'] = _ApiClient.default.convertToType(data['_id'], 'String');
        }

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

        if (data.hasOwnProperty('lessons')) {
          obj['lessons'] = _ApiClient.default.convertToType(data['lessons'], [_LessonModel.default]);
        }
      }

      return obj;
    }
  }]);

  return UserSemesterModel;
}();
/**
 * @member {String} _id
 */


UserSemesterModel.prototype['_id'] = undefined;
/**
 * @member {String} name
 */

UserSemesterModel.prototype['name'] = undefined;
/**
 * @member {Date} startDate
 */

UserSemesterModel.prototype['startDate'] = undefined;
/**
 * @member {Date} endDate
 */

UserSemesterModel.prototype['endDate'] = undefined;
/**
 * @member {String} startHour
 */

UserSemesterModel.prototype['startHour'] = undefined;
/**
 * @member {Number} dLesson
 */

UserSemesterModel.prototype['dLesson'] = undefined;
/**
 * @member {Number} dBreak
 */

UserSemesterModel.prototype['dBreak'] = undefined;
/**
 * @member {Number} slotCount
 */

UserSemesterModel.prototype['slotCount'] = undefined;
/**
 * @member {Array.<module:model/LessonModel>} lessons
 */

UserSemesterModel.prototype['lessons'] = undefined;
var _default = UserSemesterModel;
exports.default = _default;