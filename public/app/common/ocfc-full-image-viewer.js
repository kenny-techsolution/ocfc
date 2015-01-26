//6.26.2014, create directive that displays user image
angular.module('app').directive('ocfcFullImageViewer', function (IdentitySvc, CommentApiSvc, _, PostApiSvc, ImageCommentApiSvc, ImageApiSvc, FellowshipDataSvc) {
	return{
		restrict: 'E',
		scope: {
			imagePopup: '=',
			imagePrefix: '='
		},
		templateUrl: '/partials/common/ocfc-full-image-viewer',
		controller: function ($scope) {
			$scope.$watch('imagePopup.selectedPost', function (newVal, oldVal) {
				//imageComments
				$scope.imageComments = [];

				console.log('chk $scope.imagePopup obj');
				console.log($scope.imagePopup);

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
				//id
				$scope.selectedImageId = $scope.currentImage._id;


				var getCommentsFromImage = function () {
					ImageApiSvc.get({image_id: $scope.selectedImageId,
						album_id: FellowshipDataSvc.fellowship.defaultAlbumId}, function (getImageObj) {
						console.log('front-end post has been called to grab a getImageObj from server');
						//console.log('chk getImageObj');
						//console.log(getImageObj);

						$scope.imageComments = getImageObj.comments;
						console.log('chk $scope.imageComments array');
						console.log($scope.imageComments);

					});

				};

				getCommentsFromImage();

				$scope.nextImage = function () {
					//console.log('$scope.nextImage called');

					if ($scope.currentPost.imageIds.length > 1) {

						if ($scope.currentImageIndex !== ($scope.currentPost.imageIds.length - 1)) {
							$scope.currentImageIndex = $scope.currentImageIndex + 1;
							$scope.selectedImage = $scope.currentPost.imageIds[$scope.currentImageIndex].path;
							$scope.selectedImageId = $scope.currentPost.imageIds[$scope.currentImageIndex]._id;

							//grab image comments data
							getCommentsFromImage();

							//console.log('chk $scope.selectedImage');
							//console.log($scope.selectedImage);

						} else {
							$scope.currentImageIndex = 0;
							$scope.selectedImage = $scope.currentPost.imageIds[$scope.currentImageIndex].path;
							$scope.selectedImageId = $scope.currentPost.imageIds[$scope.currentImageIndex]._id;
							//console.log('chk $scope.selectedImage');
							//console.log($scope.selectedImage);

							//grab image comments data
							getCommentsFromImage();

						}
					} else {
						$scope.selectedImage = $scope.currentImage.path;
						$scope.selectedImageId = $scope.currentImage._id;
						//console.log('else statement met, $scope.selectedImage');
						//console.log($scope.selectedImage);
						//grab image comments data
						getCommentsFromImage();

					}

				};

				$scope.backImage = function () {
					//console.log('$scope.backImage called');

					if ($scope.currentPost.imageIds.length > 1) {

						if ($scope.currentImageIndex !== 0) {

							$scope.currentImageIndex = $scope.currentImageIndex - 1;
							$scope.selectedImage = $scope.currentPost.imageIds[$scope.currentImageIndex].path;
							$scope.selectedImageId = $scope.currentPost.imageIds[$scope.currentImageIndex]._id;
							//console.log('chk $scope.selectedImage');
							//console.log($scope.selectedImage);
							//grab image comments data
							getCommentsFromImage();

						} else {
							$scope.currentImageIndex = ($scope.currentPost.imageIds.length - 1);
							$scope.selectedImage = $scope.currentPost.imageIds[$scope.currentImageIndex].path;
							$scope.selectedImageId = $scope.currentPost.imageIds[$scope.currentImageIndex]._id;
							//console.log('chk $scope.selectedImage');
							//console.log($scope.selectedImage);
							//grab image comments data
							getCommentsFromImage();

						}

					} else {
						$scope.selectedImage = $scope.currentImage.path;
						$scope.selectedImageId = $scope.currentImage._id;
						//console.log('else statement met, $scope.selectedImage');
						//console.log($scope.selectedImage);
						//grab image comments data
						getCommentsFromImage();

					}

				};

				$scope.closePopup = function () {
					console.log('function closePopup called from ocfc-full-image-viewer');
					$scope.imagePopup.isPopupOpen = false;

				};

				$scope.addCommentToImage = function (imageComment) {
					//app.post('/api/images/:image_id/comments', images.addCommentToImage);

					console.log('front-end addCommentToImage is being called');
					var commentObj = new ImageCommentApiSvc({userId: IdentitySvc.currentUser._id,
						comment: imageComment,
						fullName: IdentitySvc.currentUser.fullName,
						image_id: $scope.selectedImageId
					});

					commentObj.$save(function () {
						console.log('comment has been created on comment dataset, follow by updating image dataset');

						console.log('chk which imageId got saved for image comments');
						console.log(commentObj);

						//update certain fields
						var image = new ImageApiSvc();
						ImageApiSvc.update(
							{id: commentObj.image_id}
							, image, function () {
								///api/albums/:album_id/images/:image_id
								console.log('ImageApiSvc.update has been called');
								console.log('front-end updateImage from ocfc-full-image-viewer has completed');

								//get image data here
								//app.get('/api/albums/:album_id/images/:image_id', images.getImage);
								getCommentsFromImage();

							}
						);

					});
				};

			});

		}
	};

});