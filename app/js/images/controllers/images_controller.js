'use strict';

module.exports = function(app) {
	app.controller('imagesController', ['$scope', '$http', '$location', function($scope, $http, $location) {
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

		$scope.URL = "http://upload.wikimedia.org/wikipedia/en/2/24/Lenna.png";
		$scope.info = " ";

		$scope.currentImage = {};

		$scope.buffer = function(image) {
  		delete $http.defaults.headers.common['X-Requested-With'];
      $http.get(image.imageURL, {responseType: "arraybuffer"})
        .success(function(data) {
        	$scope.currentImage = data;
          $scope.info = "Read '" + image.imageURL + "' with " + data.byteLength
          + " bytes in a variable of type '" + typeof(data) + "'";
          console.log($scope.info);

          $scope.currentImage.data = new Int8Array(data);

         	$scope.currentImage.colorPalette = new Int8Array(data, 54, 1024);
          
          console.log($scope.currentImage.data);
          console.log($scope.currentImage.colorPalette);

          $location.path('/original_image');
        })
        .error(function(data, status) {
          $scope.info = "Request failed with status: " + status;
          alert("this is not a valid image file.  it will be removed from the menu.");
          $scope.remove(image);
        });
    };

		$scope.create = function(image) {
			$http({
				method: 'POST',
				url: '/api/v1/images',
				data: image
			})
			.success(function(data) {
				$scope.images.push(data);
				$location.path('/image_menu');
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
				alert("Your image has been deleted.");
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