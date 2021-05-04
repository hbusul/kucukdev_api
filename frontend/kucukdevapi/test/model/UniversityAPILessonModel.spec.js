/**
 * FastAPI
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.1.0
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
    factory(root.expect, root.FastApi);
  }
}(this, function(expect, FastApi) {
  'use strict';

  var instance;

  beforeEach(function() {
    instance = new FastApi.UniversityAPILessonModel();
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

  describe('UniversityAPILessonModel', function() {
    it('should create an instance of UniversityAPILessonModel', function() {
      // uncomment below and update the code to test UniversityAPILessonModel
      //var instane = new FastApi.UniversityAPILessonModel();
      //expect(instance).to.be.a(FastApi.UniversityAPILessonModel);
    });

    it('should have the property id (base name: "_id")', function() {
      // uncomment below and update the code to test the property id
      //var instance = new FastApi.UniversityAPILessonModel();
      //expect(instance).to.be();
    });

    it('should have the property name (base name: "name")', function() {
      // uncomment below and update the code to test the property name
      //var instance = new FastApi.UniversityAPILessonModel();
      //expect(instance).to.be();
    });

    it('should have the property code (base name: "code")', function() {
      // uncomment below and update the code to test the property code
      //var instance = new FastApi.UniversityAPILessonModel();
      //expect(instance).to.be();
    });

    it('should have the property ects (base name: "ects")', function() {
      // uncomment below and update the code to test the property ects
      //var instance = new FastApi.UniversityAPILessonModel();
      //expect(instance).to.be();
    });

    it('should have the property absenceLimit (base name: "absenceLimit")', function() {
      // uncomment below and update the code to test the property absenceLimit
      //var instance = new FastApi.UniversityAPILessonModel();
      //expect(instance).to.be();
    });

    it('should have the property sections (base name: "sections")', function() {
      // uncomment below and update the code to test the property sections
      //var instance = new FastApi.UniversityAPILessonModel();
      //expect(instance).to.be();
    });

  });

}));
