angular.module('app').directive('ocfcUploadImage', function ($upload, ImageApiSvc,FellowshipDataSvc) {
	return{
		restrict: 'E',
		scope: {
			file:'=',
			files:'=',
			cloudinaryParams:'=',
			imageArray:'=',
			imageObjs:'='
		},
		replace: true,
		templateUrl: '/partials/common/ocfc-upload-image',
		controller: function ($scope) {
			console.log("scope file .............");
			console.log($scope.file);
			$scope.imageId = '';
			$scope.path = '/css/images/image_placeholder.png';
			$scope.progress = 0;
			console.log($scope.cloudinaryParams);
			$scope.upload = $upload.upload({
				url: "https://api.cloudinary.com/v1_1/" + $.cloudinary.config().cloud_name + "/upload",
				data: $scope.cloudinaryParams,
				file: $scope.file
			}).progress(function (e) {
				console.log('progress method is being called');
				$scope.progress = Math.round((e.loaded * 100.0) / e.total);
				if ($scope.progress == 100) {
					console.log('$scope.progress==100 IF statement has been called');
					setTimeout(function () {
						$scope.progress = 0;
					}, 10000);
				}
				$scope.$apply();
			}).success(function (data, status, headers, config) {
				$scope.path = 'https://res.cloudinary.com/ocfc/image/upload/' + data.public_id;
				$scope.$apply();

				//call create image
				console.log('front-end new image creation has been called');
				var image = new ImageApiSvc({path: data.public_id,
					album_id: FellowshipDataSvc.fellowship.defaultAlbumId});
				image.$save(function () {
					$scope.imageId = image._id;
					$scope.imageArray.push(image._id);
					$scope.imageObjs.push({image_id: image._id, image_path: image.path});
				});
			});
			$scope.removeImage = function(){
				$scope.imageArray.splice($scope.imageArray.indexOf($scope.imageId),1);
				for(var i=0;i<$scope.imageObjs.length;i++) {
					if($scope.imageObjs[i]['image_id']===$scope.imageId) {
						$scope.imageObjs.splice(i, 1);
					}
				}
				for(var i=0;i<$scope.files.length;i++) {
					if($scope.files[i].name===$scope.file.name) {
						$scope.files.splice(i, 1);
						return;
					}
				}
			};
		}
	};
});