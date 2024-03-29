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
import UniversitySlotModel from './UniversitySlotModel';

/**
 * The UniversitySectionModel model module.
 * @module model/UniversitySectionModel
 * @version 1.0.0
 */
class UniversitySectionModel {
    /**
     * Constructs a new <code>UniversitySectionModel</code>.
     * @alias module:model/UniversitySectionModel
     * @param section {String} 
     * @param instructor {String} 
     * @param slots {Array.<module:model/UniversitySlotModel>} 
     */
    constructor(section, instructor, slots) { 
        
        UniversitySectionModel.initialize(this, section, instructor, slots);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, section, instructor, slots) { 
        obj['section'] = section;
        obj['instructor'] = instructor;
        obj['slots'] = slots;
    }

    /**
     * Constructs a <code>UniversitySectionModel</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/UniversitySectionModel} obj Optional instance to populate.
     * @return {module:model/UniversitySectionModel} The populated <code>UniversitySectionModel</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new UniversitySectionModel();

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
                obj['slots'] = ApiClient.convertToType(data['slots'], [UniversitySlotModel]);
            }
        }
        return obj;
    }


}

/**
 * @member {String} _id
 */
UniversitySectionModel.prototype['_id'] = undefined;

/**
 * @member {String} section
 */
UniversitySectionModel.prototype['section'] = undefined;

/**
 * @member {String} instructor
 */
UniversitySectionModel.prototype['instructor'] = undefined;

/**
 * @member {Array.<module:model/UniversitySlotModel>} slots
 */
UniversitySectionModel.prototype['slots'] = undefined;






export default UniversitySectionModel;

