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
 * The CurriculumLessonModel model module.
 * @module model/CurriculumLessonModel
 * @version 1.0.0
 */
class CurriculumLessonModel {
    /**
     * Constructs a new <code>CurriculumLessonModel</code>.
     * @alias module:model/CurriculumLessonModel
     * @param name {String} 
     * @param code {String} 
     * @param lessonType {String} 
     */
    constructor(name, code, lessonType) { 
        
        CurriculumLessonModel.initialize(this, name, code, lessonType);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, name, code, lessonType) { 
        obj['name'] = name;
        obj['code'] = code;
        obj['lessonType'] = lessonType;
    }

    /**
     * Constructs a <code>CurriculumLessonModel</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/CurriculumLessonModel} obj Optional instance to populate.
     * @return {module:model/CurriculumLessonModel} The populated <code>CurriculumLessonModel</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new CurriculumLessonModel();

            if (data.hasOwnProperty('_id')) {
                obj['_id'] = ApiClient.convertToType(data['_id'], 'String');
            }
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('code')) {
                obj['code'] = ApiClient.convertToType(data['code'], 'String');
            }
            if (data.hasOwnProperty('lessonType')) {
                obj['lessonType'] = ApiClient.convertToType(data['lessonType'], 'String');
            }
        }
        return obj;
    }


}

/**
 * @member {String} _id
 */
CurriculumLessonModel.prototype['_id'] = undefined;

/**
 * @member {String} name
 */
CurriculumLessonModel.prototype['name'] = undefined;

/**
 * @member {String} code
 */
CurriculumLessonModel.prototype['code'] = undefined;

/**
 * @member {String} lessonType
 */
CurriculumLessonModel.prototype['lessonType'] = undefined;






export default CurriculumLessonModel;

