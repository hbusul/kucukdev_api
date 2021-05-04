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
 * The UpdateEntranceYearModel model module.
 * @module model/UpdateEntranceYearModel
 * @version 1.0.0
 */
var UpdateEntranceYearModel = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>UpdateEntranceYearModel</code>.
   * @alias module:model/UpdateEntranceYearModel
   * @param entranceYear {Number} 
   */
  function UpdateEntranceYearModel(entranceYear) {
    _classCallCheck(this, UpdateEntranceYearModel);

    UpdateEntranceYearModel.initialize(this, entranceYear);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(UpdateEntranceYearModel, null, [{
    key: "initialize",
    value: function initialize(obj, entranceYear) {
      obj['entranceYear'] = entranceYear;
    }
    /**
     * Constructs a <code>UpdateEntranceYearModel</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/UpdateEntranceYearModel} obj Optional instance to populate.
     * @return {module:model/UpdateEntranceYearModel} The populated <code>UpdateEntranceYearModel</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new UpdateEntranceYearModel();

        if (data.hasOwnProperty('_id')) {
          obj['_id'] = _ApiClient.default.convertToType(data['_id'], 'String');
        }

        if (data.hasOwnProperty('entranceYear')) {
          obj['entranceYear'] = _ApiClient.default.convertToType(data['entranceYear'], 'Number');
        }
      }

      return obj;
    }
  }]);

  return UpdateEntranceYearModel;
}();
/**
 * @member {String} _id
 */


UpdateEntranceYearModel.prototype['_id'] = undefined;
/**
 * @member {Number} entranceYear
 */

UpdateEntranceYearModel.prototype['entranceYear'] = undefined;
var _default = UpdateEntranceYearModel;
exports.default = _default;