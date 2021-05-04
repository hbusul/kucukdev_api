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
 * The AbsenceModel model module.
 * @module model/AbsenceModel
 * @version 1.0.0
 */
var AbsenceModel = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>AbsenceModel</code>.
   * @alias module:model/AbsenceModel
   * @param absence {String} 
   */
  function AbsenceModel(absence) {
    _classCallCheck(this, AbsenceModel);

    AbsenceModel.initialize(this, absence);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(AbsenceModel, null, [{
    key: "initialize",
    value: function initialize(obj, absence) {
      obj['absence'] = absence;
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

        if (data.hasOwnProperty('_id')) {
          obj['_id'] = _ApiClient.default.convertToType(data['_id'], 'String');
        }

        if (data.hasOwnProperty('absence')) {
          obj['absence'] = _ApiClient.default.convertToType(data['absence'], 'String');
        }
      }

      return obj;
    }
  }]);

  return AbsenceModel;
}();
/**
 * @member {String} _id
 */


AbsenceModel.prototype['_id'] = undefined;
/**
 * @member {String} absence
 */

AbsenceModel.prototype['absence'] = undefined;
var _default = AbsenceModel;
exports.default = _default;