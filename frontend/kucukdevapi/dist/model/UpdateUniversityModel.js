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
 * The UpdateUniversityModel model module.
 * @module model/UpdateUniversityModel
 * @version 1.0.0
 */
var UpdateUniversityModel = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>UpdateUniversityModel</code>.
   * @alias module:model/UpdateUniversityModel
   * @param curUniversityID {String} 
   */
  function UpdateUniversityModel(curUniversityID) {
    _classCallCheck(this, UpdateUniversityModel);

    UpdateUniversityModel.initialize(this, curUniversityID);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(UpdateUniversityModel, null, [{
    key: "initialize",
    value: function initialize(obj, curUniversityID) {
      obj['curUniversityID'] = curUniversityID;
    }
    /**
     * Constructs a <code>UpdateUniversityModel</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/UpdateUniversityModel} obj Optional instance to populate.
     * @return {module:model/UpdateUniversityModel} The populated <code>UpdateUniversityModel</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new UpdateUniversityModel();

        if (data.hasOwnProperty('curUniversityID')) {
          obj['curUniversityID'] = _ApiClient.default.convertToType(data['curUniversityID'], 'String');
        }
      }

      return obj;
    }
  }]);

  return UpdateUniversityModel;
}();
/**
 * @member {String} curUniversityID
 */


UpdateUniversityModel.prototype['curUniversityID'] = undefined;
var _default = UpdateUniversityModel;
exports.default = _default;