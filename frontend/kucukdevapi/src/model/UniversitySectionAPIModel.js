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

/**
 * The UniversitySectionAPIModel model module.
 * @module model/UniversitySectionAPIModel
 * @version 1.0.0
 */
class UniversitySectionAPIModel {
    /**
     * Constructs a new <code>UniversitySectionAPIModel</code>.
     * @alias module:model/UniversitySectionAPIModel
     */
    constructor() { 
        
        UniversitySectionAPIModel.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>UniversitySectionAPIModel</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/UniversitySectionAPIModel} obj Optional instance to populate.
     * @return {module:model/UniversitySectionAPIModel} The populated <code>UniversitySectionAPIModel</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new UniversitySectionAPIModel();

            if (data.hasOwnProperty('_id')) {
                obj['_id'] = ApiClient.convertToType(data['_id'], 'String');
            }
            if (data.hasOwnProperty('section')) {
                obj['section'] = ApiClient.convertToType(data['section'], 'String');
            }
            if (data.hasOwnProperty('instructor')) {
                obj['instructor'] = ApiClient.convertToType(data['instructor'], 'String');
            }
            if (data.hasOwnProperty('slots')) {
                obj['slots'] = ApiClient.convertToType(data['slots'], [['Number']]);
            }
        }
        return obj;
    }


}

/**
 * @member {String} _id
 */
UniversitySectionAPIModel.prototype['_id'] = undefined;

/**
 * @member {String} section
 */
UniversitySectionAPIModel.prototype['section'] = undefined;

/**
 * @member {String} instructor
 */
UniversitySectionAPIModel.prototype['instructor'] = undefined;

/**
 * @member {Array.<Array.<Number>>} slots
 */
UniversitySectionAPIModel.prototype['slots'] = undefined;






export default UniversitySectionAPIModel;
