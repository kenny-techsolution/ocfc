//6.26.2014, create directive that displays user image
angular.module('app').directive('ocfcGeneralPost', function (IdentitySvc,CommentApiSvc,_,PostApiSvc,PostCommentSvc) {
	return{
		restrict: 'E',
		scope: {
			post:'=',
			imagePopup:'=',
			posts:'=',
			dropdown:'='
		},
		templateUrl: '/partials/common/ocfc-general-post',
		controller: function ($scope) {

			console.log('ocfcGeneralPost has been called');
			//console.log('chk $scope.post.postType value');
			//console.log($scope.post.postType);

			//console.log('chk $scope.imagePopup ');
			//console.log($scope.imagePopup);

			$scope.IdentitySvc= IdentitySvc;
			$scope.showEdit=false;
			$scope.newGenPostContent=$scope.post.general[0].content;

			$scope.comment;


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
				console.log('updateEditedPost function called');
				$scope.post.general[0].content=$scope.newGenPostContent;
				//$scope.post.postType='general';
				//console.log('chk $scope.post.general[0].content obj');
				//console.log($scope.post.general[0].content);

				//cannot update post other than your own
				if ($scope.post.postBy._id===IdentitySvc.currentUser._id){
					console.log('if condition is met, this post is made by current user');

					var updatePost=angular.copy($scope.post);
					//do not allow update on images
					delete updatePost.imageIds;
					updatePost.postType="general";

					//update post obj on the server side
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
				console.log('function selectPost called from ocfc-general-post');
				$scope.imagePopup.isPopupOpen=true;
				$scope.imagePopup.selectedPost=$scope.post;

				console.log('chk $scope.imagePopup obj');
				console.log($scope.imagePopup);
			};

		}
	};
});