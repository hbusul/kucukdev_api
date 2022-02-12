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
 * The UpdateSemesterModel model module.
 * @module model/UpdateSemesterModel
 * @version 1.0.0
 */
var UpdateSemesterModel = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>UpdateSemesterModel</code>.
   * @alias module:model/UpdateSemesterModel
   * @param curSemesterID {String} 
   */
  function UpdateSemesterModel(curSemesterID) {
    _classCallCheck(this, UpdateSemesterModel);

    UpdateSemesterModel.initialize(this, curSemesterID);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(UpdateSemesterModel, null, [{
    key: "initialize",
    value: function initialize(obj, curSemesterID) {
      obj['curSemesterID'] = curSemesterID;
    }
    /**
     * Constructs a <code>UpdateSemesterModel</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/UpdateSemesterModel} obj Optional instance to populate.
     * @return {module:model/UpdateSemesterModel} The populated <code>UpdateSemesterModel</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new UpdateSemesterModel();

        if (data.hasOwnProperty('curSemesterID')) {
          obj['curSemesterID'] = _ApiClient.default.convertToType(data['curSemesterID'], 'String');
        }
      }

      return obj;
    }
  }]);

  return UpdateSemesterModel;
}();
/**
 * @member {String} curSemesterID
 */


UpdateSemesterModel.prototype['curSemesterID'] = undefined;
var _default = UpdateSemesterModel;
exports.default = _default;