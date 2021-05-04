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
 * The UserAPIModel model module.
 * @module model/UserAPIModel
 * @version 1.0.0
 */
var UserAPIModel = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>UserAPIModel</code>.
   * @alias module:model/UserAPIModel
   */
  function UserAPIModel() {
    _classCallCheck(this, UserAPIModel);

    UserAPIModel.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(UserAPIModel, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>UserAPIModel</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/UserAPIModel} obj Optional instance to populate.
     * @return {module:model/UserAPIModel} The populated <code>UserAPIModel</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new UserAPIModel();

        if (data.hasOwnProperty('_id')) {
          obj['_id'] = _ApiClient.default.convertToType(data['_id'], 'String');
        }

        if (data.hasOwnProperty('email')) {
          obj['email'] = _ApiClient.default.convertToType(data['email'], 'String');
        }

        if (data.hasOwnProperty('userGroup')) {
          obj['userGroup'] = _ApiClient.default.convertToType(data['userGroup'], 'String');
        }

        if (data.hasOwnProperty('curSemesterID')) {
          obj['curSemesterID'] = _ApiClient.default.convertToType(data['curSemesterID'], 'String');
        }

        if (data.hasOwnProperty('curUniversityID')) {
          obj['curUniversityID'] = _ApiClient.default.convertToType(data['curUniversityID'], 'String');
        }

        if (data.hasOwnProperty('entranceYear')) {
          obj['entranceYear'] = _ApiClient.default.convertToType(data['entranceYear'], 'Number');
        }
      }

      return obj;
    }
  }]);

  return UserAPIModel;
}();
/**
 * @member {String} _id
 */


UserAPIModel.prototype['_id'] = undefined;
/**
 * @member {String} email
 */

UserAPIModel.prototype['email'] = undefined;
/**
 * @member {String} userGroup
 */

UserAPIModel.prototype['userGroup'] = undefined;
/**
 * @member {String} curSemesterID
 */

UserAPIModel.prototype['curSemesterID'] = undefined;
/**
 * @member {String} curUniversityID
 */

UserAPIModel.prototype['curUniversityID'] = undefined;
/**
 * @member {Number} entranceYear
 */

UserAPIModel.prototype['entranceYear'] = undefined;
var _default = UserAPIModel;
exports.default = _default;