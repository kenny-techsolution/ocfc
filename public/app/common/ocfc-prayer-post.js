//6.26.2014, create directive that displays user image
angular.module('app').directive('ocfcPrayerPost', function (IdentitySvc,CommentApiSvc,_,PostApiSvc,PostCommentSvc) {
	return{
		restrict: 'E',
		scope: {
			post:'=',
			imagePopup:'=',
			posts:'=',
			dropdown:'='
		},
		templateUrl: '/partials/common/ocfc-prayer-post',
		controller: function ($scope) {

			console.log('ocfcPrayerPost has been called');
			//console.log('chk on $scope.post obj for prayer');
			//console.log($scope.post);

			//console.log('chk $scope.post.postType value');
			//console.log($scope.post.postType);

			$scope.IdentitySvc= IdentitySvc;
			$scope.showEdit=false;
			$scope.newQuestPostContent=$scope.post.prayer;

			$scope.comment;


			if ($scope.post.postBy._id===IdentitySvc.currentUser._id) {
				$scope.isPoster=true;
			}else {
				$scope.isPoster=false;
			};

			//create
			$scope.createComment=PostCommentSvc.createComment;

			//edit post
			$scope.editPost=function(){
				console.log('editPost function called');
				$scope.showEdit=true;
			};

			//delete post
			$scope.deletePost=function(){
				console.log('deletePost function called');
				console.log('chk post obj');
				console.log($scope.post);

				var post = PostApiSvc.get({id:$scope.post._id}, function() {
					console.log('chk variable post obj');
					console.log(post);
					post.$delete({id:$scope.post._id},function(){
						console.log(post._id +' post has been deleted');

						//remove post id from posts array
						for(var i=0;i<$scope.posts.length;i++){
							if ($scope.posts[i]._id===$scope.post._id){
								$scope.posts.splice(i, 1);
								console.log('chk index to be spliced/removed');
								console.log(i);
							}
						}

					});
				});

			};

			$scope.hideEditPost=function(){
				console.log('hideEditPost function called');
				$scope.showEdit=false;
			};

			//console.log('chk $scope.post obj');
			//console.log($scope.post);

			$scope.updateEditedPost=function(){
				//console.log('chk $scope.post obj');
				//console.log($scope.post);
				console.log('updateEditedPost function called for prayer post');
				$scope.post.prayer=$scope.newPrayPostContent;
				//$scope.post.postType='prayer';
				//console.log('chk $scope.post.prayer obj');
				//console.log($scope.post.prayer);

				//TODO make postType a string value on both front & back end

				//cannot update post other than your own
				if ($scope.post.postBy._id===IdentitySvc.currentUser._id){
					//update post obj on the server side
					var updatePost=angular.copy($scope.post);
					//do not allow update on images
					delete updatePost.imageIds;
					updatePost.postType="prayer";

					PostApiSvc.update({id:updatePost._id},updatePost,function(){
						console.log('front-end PostSvc.update has completed');
					});

					$scope.showEdit=false;

				}else{
					alert('Sorry, you do no have rights to update post other than your own');
				}
			};

			//delete comment
			$scope.deleteComment=PostCommentSvc.deleteComment;

			$scope.selectPost=function(){
				console.log('function selectPost called from ocfc-prayer-post');
				$scope.imagePopup.isPopupOpen=true;
				$scope.imagePopup.selectedPost=$scope.post;

				//console.log('chk $scope.imagePopup obj');
				//console.log($scope.imagePopup);
			};
		}
	};
});

