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
 * The UpdateUniversityNameModel model module.
 * @module model/UpdateUniversityNameModel
 * @version 1.0.0
 */
var UpdateUniversityNameModel = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>UpdateUniversityNameModel</code>.
   * @alias module:model/UpdateUniversityNameModel
   * @param name {String} 
   */
  function UpdateUniversityNameModel(name) {
    _classCallCheck(this, UpdateUniversityNameModel);

    UpdateUniversityNameModel.initialize(this, name);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(UpdateUniversityNameModel, null, [{
    key: "initialize",
    value: function initialize(obj, name) {
      obj['name'] = name;
    }
    /**
     * Constructs a <code>UpdateUniversityNameModel</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/UpdateUniversityNameModel} obj Optional instance to populate.
     * @return {module:model/UpdateUniversityNameModel} The populated <code>UpdateUniversityNameModel</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new UpdateUniversityNameModel();

        if (data.hasOwnProperty('name')) {
          obj['name'] = _ApiClient.default.convertToType(data['name'], 'String');
        }
      }

      return obj;
    }
  }]);

  return UpdateUniversityNameModel;
}();
/**
 * @member {String} name
 */


UpdateUniversityNameModel.prototype['name'] = undefined;
var _default = UpdateUniversityNameModel;
exports.default = _default;