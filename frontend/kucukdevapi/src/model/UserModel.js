/**
 * kucukdevapi
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';
import UserSemesterModel from './UserSemesterModel';

/**
 * The UserModel model module.
 * @module model/UserModel
 * @version 1.0.0
 */
class UserModel {
    /**
     * Constructs a new <code>UserModel</code>.
     * @alias module:model/UserModel
     * @param email {String} 
     * @param password {String} 
     */
    constructor(email, password) { 
        
        UserModel.initialize(this, email, password);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, email, password) { 
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
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new UserModel();

            if (data.hasOwnProperty('_id')) {
                obj['_id'] = ApiClient.convertToType(data['_id'], 'String');
            }
            if (data.hasOwnProperty('email')) {
                obj['email'] = ApiClient.convertToType(data['email'], 'String');
            }
            if (data.hasOwnProperty('password')) {
                obj['password'] = ApiClient.convertToType(data['password'], 'String');
            }
            if (data.hasOwnProperty('semesters')) {
                obj['semesters'] = ApiClient.convertToType(data['semesters'], [UserSemesterModel]);
            }
        }
        return obj;
    }


}

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






export default UserModel;

