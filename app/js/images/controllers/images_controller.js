'use strict';

module.exports = function(app) {
	app.controller('imagesController', ['$scope', '$http', function($scope, $http) {
		$scope.images = [];
		$scope.getAll = function() {
			$http({
				method: 'GET',
				url: '/api/v1/images',
			})
			.success(function(data) {
				$scope.images = data;
			})
			.error(function(data, status) {
				console.log(data);
			})
		};

		$scope.create = function(image) {
			$http({
				method: 'POST',
				url: '/api/v1/images',
				data: image
			})
			.success(function(data) {
				$scope.images.push(data);
			})
			.error(function(data) {
				console.log(data);
			})
		};

		$scope.save = function(image) {
			$http({
				method: 'PUT',
				url: '/api/v1/images/' + image._id,
				data: image
			})
			.success(function() {
				image.editing = false;
			})
			.error(function(data) {
				console.log(data);
			})
		};

		$scope.remove = function(image) {
			$http({
				method: 'DELETE',
				url: '/api/v1/images/' + image._id
			})
			.success(function() {
				$scope.images.splice($scope.images.indexOf(image), 1);
				alert("THAT was the tastiest image!");
			})
			.error(function(data) {
				console.log(data);
			});
		};

		$scope.editToggle = function(image) {
			if (image.editing) {
				image.imageDesc = image.oldImageDesc;
				image.imageName = image.oldImageName;
				image.editing = false;
			} else {
				image.oldImageDesc = image.imageDesc;
				image.oldImageName = image.imageName;
				image.editing = true;
			}
		};

	}]);
};