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
import ValidationError from './ValidationError';

/**
 * The HTTPValidationError model module.
 * @module model/HTTPValidationError
 * @version 1.0.0
 */
class HTTPValidationError {
    /**
     * Constructs a new <code>HTTPValidationError</code>.
     * @alias module:model/HTTPValidationError
     */
    constructor() { 
        
        HTTPValidationError.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>HTTPValidationError</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/HTTPValidationError} obj Optional instance to populate.
     * @return {module:model/HTTPValidationError} The populated <code>HTTPValidationError</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new HTTPValidationError();

            if (data.hasOwnProperty('detail')) {
                obj['detail'] = ApiClient.convertToType(data['detail'], [ValidationError]);
            }
        }
        return obj;
    }


}

/**
 * @member {Array.<module:model/ValidationError>} detail
 */
HTTPValidationError.prototype['detail'] = undefined;






export default HTTPValidationError;

