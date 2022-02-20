"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _UserSemesterModel = _interopRequireDefault(require("./UserSemesterModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/**
 * The UserModel model module.
 * @module model/UserModel
 * @version 1.0.0
 */
var UserModel = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>UserModel</code>.
   * @alias module:model/UserModel
   * @param email {String} 
   * @param password {String} 
   */
  function UserModel(email, password) {
    _classCallCheck(this, UserModel);

    UserModel.initialize(this, email, password);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(UserModel, null, [{
    key: "initialize",
    value: function initialize(obj, email, password) {
      obj['email'] = email;
      obj['password'] = password;
    }
    /**
     * Constructs a <code>UserModel</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/UserModel} obj Optional instance to populate.
     * @return {module:model/UserModel} The populated <code>UserModel</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new UserModel();

        if (data.hasOwnProperty('_id')) {
          obj['_id'] = _ApiClient.default.convertToType(data['_id'], 'String');
        }

        if (data.hasOwnProperty('email')) {
          obj['email'] = _ApiClient.default.convertToType(data['email'], 'String');
        }

        if (data.hasOwnProperty('password')) {
          obj['password'] = _ApiClient.default.convertToType(data['password'], 'String');
        }

        if (data.hasOwnProperty('semesters')) {
          obj['semesters'] = _ApiClient.default.convertToType(data['semesters'], [_UserSemesterModel.default]);
        }
      }

      return obj;
    }
  }]);

  return UserModel;
}();
/**
 * @member {String} _id
 */


UserModel.prototype['_id'] = undefined;
/**
 * @member {String} email
 */

UserModel.prototype['email'] = undefined;
/**
 * @member {String} password
 */

UserModel.prototype['password'] = undefined;
/**
 * @member {Array.<module:model/UserSemesterModel>} semesters
 */

UserModel.prototype['semesters'] = undefined;
var _default = UserModel;
exports.default = _default;