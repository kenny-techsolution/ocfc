//6.26.2014, create directive that displays user image
angular.module('app').directive('ocfcAnnouncement', function (IdentitySvc, CommentApiSvc, _, PostApiSvc) {
	return{
		restrict: 'E',
		scope: {
			post: '=',
			imagePopup: '=',
			posts: '=',
			dropdown: '='
		},
		templateUrl: '/partials/common/ocfc-announcement',
		controller: function ($scope) {
			console.log('ocfcAnnouncement has been called');

			$scope.IdentitySvc = IdentitySvc;
			$scope.showEdit = false;
			$scope.newAnnouncePostContent = $scope.post.announcement[0].content;

			if ($scope.post.postBy._id===IdentitySvc.currentUser._id) {
				$scope.isPoster=true;
			}else {
				$scope.isPoster=false;
			};

			$scope.hideEditPost = function () {
				console.log('hideEditPost function called');
				$scope.showEdit = false;
			};

			//edit post derived from dropdown
			$scope.editPost = function () {
				console.log('editPost function called');
				$scope.showEdit = true;
			};


			//delete post derived from dropdown
			$scope.deletePost = function () {
				console.log('deletePost function called');
				console.log('chk post obj');
				console.log($scope.post);

				var post = PostApiSvc.get({id: $scope.post._id}, function () {
					console.log('chk variable post obj');
					console.log(post);
					post.$delete({id: $scope.post._id}, function () {
						console.log(post._id + ' post has been deleted');

						//remove post id from posts array
						for (var i = 0; i < $scope.posts.length; i++) {
							if ($scope.posts[i]._id === $scope.post._id) {
								$scope.posts.splice(i, 1);
								console.log('chk index to be spliced/removed');
								console.log(i);
							}
						}

					});
				});

			};
			$scope.updateEditedPost = function () {
				//console.log('chk $scope.post obj');
				//console.log($scope.post);
				console.log('updateEditedPost function called');
				$scope.post.announcement[0].content = $scope.newAnnouncePostContent;
				//cannot update post other than your own
				if ($scope.post.postBy._id === IdentitySvc.currentUser._id) {
					console.log('if condition is met, this post is made by current user');

					var updatePost = angular.copy($scope.post);
					//do not allow update on images
					delete updatePost.imageIds;
					updatePost.postType = "announcement";

					//update post obj on the server side
					PostApiSvc.update({id: updatePost._id}, updatePost, function () {
						console.log('front-end PostSvc.update has completed');
					});
					$scope.showEdit = false;
				} else {
					alert('Sorry, you do no have rights to update post other than your own');
				}
			};

		}
	};
});