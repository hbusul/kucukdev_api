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
 * The UpdateUniversityNameModel model module.
 * @module model/UpdateUniversityNameModel
 * @version 1.0.0
 */
class UpdateUniversityNameModel {
    /**
     * Constructs a new <code>UpdateUniversityNameModel</code>.
     * @alias module:model/UpdateUniversityNameModel
     * @param name {String} 
     */
    constructor(name) { 
        
        UpdateUniversityNameModel.initialize(this, name);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, name) { 
        obj['name'] = name;
    }

    /**
     * Constructs a <code>UpdateUniversityNameModel</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/UpdateUniversityNameModel} obj Optional instance to populate.
     * @return {module:model/UpdateUniversityNameModel} The populated <code>UpdateUniversityNameModel</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new UpdateUniversityNameModel();

            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
        }
        return obj;
    }


}

/**
 * @member {String} name
 */
UpdateUniversityNameModel.prototype['name'] = undefined;






export default UpdateUniversityNameModel;

