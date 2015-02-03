//6.26.2014, create directive that displays user image
angular.module('app').directive('ocfcAnnouncementPost', function (IdentitySvc, CommentApiSvc, _, PostApiSvc, PostCommentSvc,$rootScope) {
	return{
		restrict: 'E',
		scope: {
			post: '=',
			imagePopup: '=',
			posts: '=',
			dropdown: '=',
			entryTime:'='
		},
		templateUrl: '/partials/common/ocfc-announcement-post',
		controller: function ($scope) {
			console.log('ocfcAnnouncementPost has been called');
			$scope.isNew = (new Date($scope.post.createdOn)).getTime() > $scope.entryTime.getTime();

			//console.log('chk $scope.post.postType value');
			//console.log($scope.post.postType);

			//this is triggered by ocfoc-announcement, so that whenever a post is made,
			// announcement post will also be triggered
			$rootScope.$on('ocfcAnnouncement: newAnnouncement', function (event, data) {
				console.log('chk latest post data after emit within ocfc-announcement.js');
				console.log(data);
				$scope.post=data;
			});


			$scope.IdentitySvc = IdentitySvc;
			$scope.showEdit = false;
			$scope.newAnnouncePostContent = $scope.post.announcement[0].content;
			$scope.comment;

			if ($scope.post.postBy._id===IdentitySvc.currentUser._id) {
				$scope.isPoster=true;
			}else {
				$scope.isPoster=false;
			};

			//create
			$scope.createComment = PostCommentSvc.createComment;

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

			$scope.hideEditPost = function () {
				console.log('hideEditPost function called');
				$scope.showEdit = false;
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
					var post=PostApiSvc.update({id: updatePost._id}, updatePost, function () {
						//fire $rootscope.emit to trigger announcement.js directive
						$rootScope.$emit('ocfcAnnouncementPost: newAnnouncement', post); // $rootScope.$on
						console.log('front-end PostSvc.update has completed');
					});
					$scope.showEdit = false;
				} else {
					alert('Sorry, you do no have rights to update post other than your own');
				}
			};

			//delete comment
			$scope.deleteComment=PostCommentSvc.deleteComment;

			$scope.selectPost = function () {
				console.log('function selectPost called from ocfc-announcement-post');
				$scope.imagePopup.isPopupOpen = true;
				$scope.imagePopup.selectedPost = $scope.post;

				//console.log('chk $scope.imagePopup obj');
				//console.log($scope.imagePopup);
			};
		}
	};
});