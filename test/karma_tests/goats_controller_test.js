'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('goats controller', function() {
  var $ControllerConstructor;
  var $httpBackend;
  var $scope;

  beforeEach(angular.mock.module('goatsApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a controller', function() {
    var goatsController = $ControllerConstructor('goatsController', {$scope: $scope});
    expect(typeof goatsController).toBe('object');
    expect(Array.isArray($scope.goats)).toBe(true);
    console.log("MOCK CONTROLLER ACTIVE");
  });

  describe('REST requests', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should have a getAll function', function() {
      $httpBackend.expectGET('/api/v1/goats').respond(200, [{goatSays: 'eat me!'}]);

      var goatsController = $ControllerConstructor('goatsController', {$scope: $scope});
      $scope.getAll();
      $httpBackend.flush();

      expect($scope.goats[0].goatSays).toBe('eat me!');
    });

    it('should be able to commit a goat to the pen of Goats', function () {
      $httpBackend.expectPOST('/api/v1/goats').respond(200, {_id: 1, goatSays: 'help me out here dude'});

      var goatsController = $ControllerConstructor('goatsController', {$scope: $scope});
      $scope.create({goatSays: 'help me out here dude'});
      $httpBackend.flush();

      expect($scope.goats[0]._id).toBe(1);
    });

    it('should be able to transform yr goat', function () {
      $httpBackend.expectPUT('/api/v1/goats/1').respond(200);

      var goatsController = $ControllerConstructor('goatsController', {$scope: $scope});
      var goat = {goatSays: 'eat me!', _id: 1, editing: true};
      $scope.save(goat);
      $httpBackend.flush();

      expect(goat.editing).toBe(false);
    });

    it('should be able to fucking kill a goat', function () {
      $httpBackend.expectDELETE('/api/v1/goats/1').respond(200);

      $ControllerConstructor('goatsController', {$scope: $scope});
      var goat = {goatSays: 'eat me!', _id: 1, editing: true};
      $scope.goats.push(goat);
      $scope.remove(goat);
      $httpBackend.flush();

      expect($scope.goats.length).toBe(0);
    })
  });
});