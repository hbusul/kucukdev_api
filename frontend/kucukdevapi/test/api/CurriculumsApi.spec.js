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

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD.
    define(['expect.js', process.cwd()+'/src/index'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    factory(require('expect.js'), require(process.cwd()+'/src/index'));
  } else {
    // Browser globals (root is window)
    factory(root.expect, root.Kucukdevapi);
  }
}(this, function(expect, Kucukdevapi) {
  'use strict';

  var instance;

  beforeEach(function() {
    instance = new Kucukdevapi.CurriculumsApi();
  });

  var getProperty = function(object, getter, property) {
    // Use getter method if present; otherwise, get the property directly.
    if (typeof object[getter] === 'function')
      return object[getter]();
    else
      return object[property];
  }

  var setProperty = function(object, setter, property, value) {
    // Use setter method if present; otherwise, set the property directly.
    if (typeof object[setter] === 'function')
      object[setter](value);
    else
      object[property] = value;
  }

  describe('CurriculumsApi', function() {
    describe('createUniversityDepartmentCurriculum', function() {
      it('should call createUniversityDepartmentCurriculum successfully', function(done) {
        //uncomment below and update the code to test createUniversityDepartmentCurriculum
        //instance.createUniversityDepartmentCurriculum(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('deleteUniversityDepartmentCurriculum', function() {
      it('should call deleteUniversityDepartmentCurriculum successfully', function(done) {
        //uncomment below and update the code to test deleteUniversityDepartmentCurriculum
        //instance.deleteUniversityDepartmentCurriculum(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getSingleUniversityDepartmentCurriculum', function() {
      it('should call getSingleUniversityDepartmentCurriculum successfully', function(done) {
        //uncomment below and update the code to test getSingleUniversityDepartmentCurriculum
        //instance.getSingleUniversityDepartmentCurriculum(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('listUniversityDepartmentCurriculums', function() {
      it('should call listUniversityDepartmentCurriculums successfully', function(done) {
        //uncomment below and update the code to test listUniversityDepartmentCurriculums
        //instance.listUniversityDepartmentCurriculums(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('updateUniversityDepartmentCurriculum', function() {
      it('should call updateUniversityDepartmentCurriculum successfully', function(done) {
        //uncomment below and update the code to test updateUniversityDepartmentCurriculum
        //instance.updateUniversityDepartmentCurriculum(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
  });

}));
