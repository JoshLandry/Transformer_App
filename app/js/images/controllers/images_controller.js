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

          $scope.currentImage.data = new Uint8Array(data);

         	$scope.currentImage.colorPalette = new Int8Array(data, 54, 1024);

         	var blob = new Blob( [ $scope.currentImage.data ], { type: "image/jpeg" } );
			    var urlCreator = window.URL || window.webkitURL;
			    var imageUrl = urlCreator.createObjectURL( blob );
			    $scope.currentImage.URL = imageUrl;
          
          console.log($scope.currentImage.data);
          console.log($scope.currentImage.colorPalette);
          console.log($scope.currentImage.URL);

          $location.path('/original_image');
        })
        .error(function(data, status) {
          $scope.info = "Request failed with status: " + status;
          alert("this is not a valid image file.  it will be removed from the menu.");
          $scope.remove(image);
        });
    };

    $scope.render = function() {
    	var blob = new Blob( [ $scope.currentImage.data ], { type: "image/jpeg" } );
			var urlCreator = window.URL || window.webkitURL;
			var imageUrl = urlCreator.createObjectURL( blob );
			$scope.currentImage.URL = imageUrl;
			$location.path('/original_image');
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

		// transphormations

		$scope.invert = function() {
    	var colorPalette = $scope.currentImage.colorPalette;

		  for(var i=0; i<1024; i++) {
		    colorPalette[i] = (colorPalette[i] -255) * -1;
		  }

		  console.log(colorPalette);
		  $scope.render();
		};

		$scope.random = function() {
		  var colorPalette = $scope.currentImage.colorPalette;

		  for(var i=0; i<1024; i++) {
		    colorPalette[i] = colorPalette[i + Math.floor(Math.random() * 10)];
		  }

		  console.log(colorPalette);
		  $scope.render();
		};

		$scope.colorStep = function() {
		  var colorPalette = $scope.currentImage.colorPalette;

		  for(var i=0; i<1024; i++) {
		    colorPalette[i] = colorPalette[i + 1];
		  }

		  console.log(colorPalette);
		  $scope.render();
		};

	}]);
};