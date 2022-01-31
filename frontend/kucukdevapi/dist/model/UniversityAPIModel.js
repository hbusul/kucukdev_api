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
 * The UniversityAPIModel model module.
 * @module model/UniversityAPIModel
 * @version 1.0.0
 */
var UniversityAPIModel = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>UniversityAPIModel</code>.
   * @alias module:model/UniversityAPIModel
   */
  function UniversityAPIModel() {
    _classCallCheck(this, UniversityAPIModel);

    UniversityAPIModel.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(UniversityAPIModel, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>UniversityAPIModel</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/UniversityAPIModel} obj Optional instance to populate.
     * @return {module:model/UniversityAPIModel} The populated <code>UniversityAPIModel</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new UniversityAPIModel();

        if (data.hasOwnProperty('_id')) {
          obj['_id'] = _ApiClient.default.convertToType(data['_id'], 'String');
        }

        if (data.hasOwnProperty('name')) {
          obj['name'] = _ApiClient.default.convertToType(data['name'], 'String');
        }

        if (data.hasOwnProperty('curSemesterID')) {
          obj['curSemesterID'] = _ApiClient.default.convertToType(data['curSemesterID'], 'String');
        }
      }

      return obj;
    }
  }]);

  return UniversityAPIModel;
}();
/**
 * @member {String} _id
 */


UniversityAPIModel.prototype['_id'] = undefined;
/**
 * @member {String} name
 */

UniversityAPIModel.prototype['name'] = undefined;
/**
 * @member {String} curSemesterID
 */

UniversityAPIModel.prototype['curSemesterID'] = undefined;
var _default = UniversityAPIModel;
exports.default = _default;