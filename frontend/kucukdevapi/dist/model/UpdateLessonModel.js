"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _SlotModel = _interopRequireDefault(require("./SlotModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/**
 * The UpdateLessonModel model module.
 * @module model/UpdateLessonModel
 * @version 1.0.0
 */
var UpdateLessonModel = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>UpdateLessonModel</code>.
   * @alias module:model/UpdateLessonModel
   * @param name {String} 
   * @param instructor {String} 
   * @param absenceLimit {Number} 
   * @param slots {Array.<module:model/SlotModel>} 
   */
  function UpdateLessonModel(name, instructor, absenceLimit, slots) {
    _classCallCheck(this, UpdateLessonModel);

    UpdateLessonModel.initialize(this, name, instructor, absenceLimit, slots);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(UpdateLessonModel, null, [{
    key: "initialize",
    value: function initialize(obj, name, instructor, absenceLimit, slots) {
      obj['name'] = name;
      obj['instructor'] = instructor;
      obj['absenceLimit'] = absenceLimit;
      obj['slots'] = slots;
    }
    /**
     * Constructs a <code>UpdateLessonModel</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/UpdateLessonModel} obj Optional instance to populate.
     * @return {module:model/UpdateLessonModel} The populated <code>UpdateLessonModel</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new UpdateLessonModel();

        if (data.hasOwnProperty('name')) {
          obj['name'] = _ApiClient.default.convertToType(data['name'], 'String');
        }

        if (data.hasOwnProperty('instructor')) {
          obj['instructor'] = _ApiClient.default.convertToType(data['instructor'], 'String');
        }

        if (data.hasOwnProperty('absenceLimit')) {
          obj['absenceLimit'] = _ApiClient.default.convertToType(data['absenceLimit'], 'Number');
        }

        if (data.hasOwnProperty('slots')) {
          obj['slots'] = _ApiClient.default.convertToType(data['slots'], [_SlotModel.default]);
        }
      }

      return obj;
    }
  }]);

  return UpdateLessonModel;
}();
/**
 * @member {String} name
 */


UpdateLessonModel.prototype['name'] = undefined;
/**
 * @member {String} instructor
 */

UpdateLessonModel.prototype['instructor'] = undefined;
/**
 * @member {Number} absenceLimit
 */

UpdateLessonModel.prototype['absenceLimit'] = undefined;
/**
 * @member {Array.<module:model/SlotModel>} slots
 */

UpdateLessonModel.prototype['slots'] = undefined;
var _default = UpdateLessonModel;
exports.default = _default;