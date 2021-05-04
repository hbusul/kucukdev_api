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
 * The LessonModel model module.
 * @module model/LessonModel
 * @version 1.0.0
 */
class LessonModel {
    /**
     * Constructs a new <code>LessonModel</code>.
     * @alias module:model/LessonModel
     * @param name {String} 
     * @param instructor {String} 
     * @param absenceLimit {Number} 
     * @param slots {Array.<String>} 
     */
    constructor(name, instructor, absenceLimit, slots) { 
        
        LessonModel.initialize(this, name, instructor, absenceLimit, slots);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, name, instructor, absenceLimit, slots) { 
        obj['name'] = name;
        obj['instructor'] = instructor;
        obj['absenceLimit'] = absenceLimit;
        obj['slots'] = slots;
    }

    /**
     * Constructs a <code>LessonModel</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/LessonModel} obj Optional instance to populate.
     * @return {module:model/LessonModel} The populated <code>LessonModel</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new LessonModel();

            if (data.hasOwnProperty('_id')) {
                obj['_id'] = ApiClient.convertToType(data['_id'], 'String');
            }
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('instructor')) {
                obj['instructor'] = ApiClient.convertToType(data['instructor'], 'String');
            }
            if (data.hasOwnProperty('absenceLimit')) {
                obj['absenceLimit'] = ApiClient.convertToType(data['absenceLimit'], 'Number');
            }
            if (data.hasOwnProperty('slots')) {
                obj['slots'] = ApiClient.convertToType(data['slots'], ['String']);
            }
            if (data.hasOwnProperty('absences')) {
                obj['absences'] = ApiClient.convertToType(data['absences'], ['String']);
            }
        }
        return obj;
    }


}

/**
 * @member {String} _id
 */
LessonModel.prototype['_id'] = undefined;

/**
 * @member {String} name
 */
LessonModel.prototype['name'] = undefined;

/**
 * @member {String} instructor
 */
LessonModel.prototype['instructor'] = undefined;

/**
 * @member {Number} absenceLimit
 */
LessonModel.prototype['absenceLimit'] = undefined;

/**
 * @member {Array.<String>} slots
 */
LessonModel.prototype['slots'] = undefined;

/**
 * @member {Array.<String>} absences
 */
LessonModel.prototype['absences'] = undefined;






export default LessonModel;

