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
    instance = new Kucukdevapi.UserAPIModel();
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

  describe('UserAPIModel', function() {
    it('should create an instance of UserAPIModel', function() {
      // uncomment below and update the code to test UserAPIModel
      //var instance = new Kucukdevapi.UserAPIModel();
      //expect(instance).to.be.a(Kucukdevapi.UserAPIModel);
    });

    it('should have the property id (base name: "_id")', function() {
      // uncomment below and update the code to test the property id
      //var instance = new Kucukdevapi.UserAPIModel();
      //expect(instance).to.be();
    });

    it('should have the property email (base name: "email")', function() {
      // uncomment below and update the code to test the property email
      //var instance = new Kucukdevapi.UserAPIModel();
      //expect(instance).to.be();
    });

    it('should have the property userGroup (base name: "userGroup")', function() {
      // uncomment below and update the code to test the property userGroup
      //var instance = new Kucukdevapi.UserAPIModel();
      //expect(instance).to.be();
    });

    it('should have the property curSemesterID (base name: "curSemesterID")', function() {
      // uncomment below and update the code to test the property curSemesterID
      //var instance = new Kucukdevapi.UserAPIModel();
      //expect(instance).to.be();
    });

    it('should have the property curUniversityID (base name: "curUniversityID")', function() {
      // uncomment below and update the code to test the property curUniversityID
      //var instance = new Kucukdevapi.UserAPIModel();
      //expect(instance).to.be();
    });

    it('should have the property entranceYear (base name: "entranceYear")', function() {
      // uncomment below and update the code to test the property entranceYear
      //var instance = new Kucukdevapi.UserAPIModel();
      //expect(instance).to.be();
    });

  });

}));
