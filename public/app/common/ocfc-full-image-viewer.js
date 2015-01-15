//6.26.2014, create directive that displays user image
angular.module('app').directive('ocfcFullImageViewer', function (IdentitySvc, CommentSvc, _, PostSvc) {
	return{
		restrict: 'E',
		scope: {
			imagePopup: '='
		},
		templateUrl: '/partials/common/ocfc-full-image-viewer',
		controller: function ($scope) {
			$scope.$watch('imagePopup.selectedPost', function (newVal, oldVal) {
				//post
				$scope.currentPost = $scope.imagePopup.selectedPost
				//console.log('chk $scope.currentPost obj within ocfc-full-image-viewer');
				//console.log($scope.currentPost);

				//currentImage
				$scope.currentImage = $scope.imagePopup.selectedPost.imageIds[0];
				//console.log('chk $scope.defaultImage obj within ocfc-full-image-viewer');
				//console.log($scope.defaultImage);

				//default
				//index
				$scope.currentImageIndex = 0;
				//path
				$scope.selectedImage = $scope.currentImage.path;

				$scope.nextImage = function () {
					//console.log('$scope.nextImage called');

					if ($scope.currentPost.imageIds.length > 1) {

						if ($scope.currentImageIndex !== ($scope.currentPost.imageIds.length - 1)) {
							$scope.currentImageIndex = $scope.currentImageIndex + 1;
							$scope.selectedImage = $scope.currentPost.imageIds[$scope.currentImageIndex].path;
							//console.log('chk $scope.selectedImage');
							//console.log($scope.selectedImage);

						} else {
							$scope.currentImageIndex = 0;
							$scope.selectedImage = $scope.currentPost.imageIds[$scope.currentImageIndex].path;
							//console.log('chk $scope.selectedImage');
							//console.log($scope.selectedImage);

						}
					} else {
						$scope.selectedImage = $scope.currentImage.path;
						//console.log('else statement met, $scope.selectedImage');
						//console.log($scope.selectedImage);
					}

				};

				$scope.backImage = function () {
					//console.log('$scope.backImage called');

					if ($scope.currentPost.imageIds.length > 1) {

						if ($scope.currentImageIndex !== 0) {

							$scope.currentImageIndex = $scope.currentImageIndex - 1;
							$scope.selectedImage = $scope.currentPost.imageIds[$scope.currentImageIndex].path;
							//console.log('chk $scope.selectedImage');
							//console.log($scope.selectedImage);

						} else {
							$scope.currentImageIndex = ($scope.currentPost.imageIds.length - 1);
							$scope.selectedImage = $scope.currentPost.imageIds[$scope.currentImageIndex].path;
							//console.log('chk $scope.selectedImage');
							//console.log($scope.selectedImage);
						}

					} else {
						$scope.selectedImage = $scope.currentImage.path;
						//console.log('else statement met, $scope.selectedImage');
						//console.log($scope.selectedImage);
					}

				};

				$scope.closePopup = function () {
					console.log('function closePopup called from ocfc-full-image-viewer');
					$scope.imagePopup.isPopupOpen = false;

				};

			});

		}
	};

});