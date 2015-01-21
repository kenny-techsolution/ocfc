//6.26.2014, create directive that displays user image
angular.module('app').directive('ocfcAnnouncement', function (IdentitySvc, CommentSvc, _, PostSvc, PostCommentSvc) {
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

				var post = PostSvc.get({id: $scope.post._id}, function () {
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


		}
	};
});