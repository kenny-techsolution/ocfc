//6.26.2014, create directive that displays user image
angular.module('app').directive('ocfcGeneralPost', function (IdentitySvc,CommentSvc,_,PostSvc) {
	return{
		restrict: 'E',
		scope: {
			post:'=',
			imagePopup:'=',
			posts:'='
		},
		templateUrl: '/partials/common/ocfc-general-post',
		controller: function ($scope) {

			//console.log('chk $scope.imagePopup ');
			//console.log($scope.imagePopup);

			$scope.IdentitySvc= IdentitySvc;
			$scope.showEdit=false;
			$scope.newGenPostContent=$scope.post.general[0].content;

			$scope.dropdown=[{
				"text": "Edit",
				"click": "editPost()"
			},{
				"text": "Delete",
				"click": "deletePost()"
				}];

			$scope.comment;
			$scope.postTypeStr=function(){

				if($scope.postType===0){
					return 'General'
				}else{
					//default to General
					return 'General'
				}
			};

			//create
			$scope.createComment=function(){
				console.log('front-end createComment is being called');
				var comment=new CommentSvc({userId:IdentitySvc.currentUser._id,
					post_id:$scope.post._id,
					comment:$scope.comment,
					fullName:IdentitySvc.currentUser.fullName});

				comment.$save(function(){
					console.log('comment has been saved');
					$scope.post.comments.push(comment);

					console.log('chk $scope.comments');
					console.log($scope.comments);

				});
			};

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

				var post = PostSvc.get({id:$scope.post._id}, function() {
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
				$scope.post.postType='general';
				console.log('chk $scope.post.general[0].content obj');
				console.log($scope.post.general[0].content);

				//cannot update post other than your own
				if ($scope.post.postBy._id===IdentitySvc.currentUser._id){
					//update post obj on the server side
					PostSvc.update({id:$scope.post._id},$scope.post,function(){
						console.log('front-end PostSvc.update has completed');
					});

					$scope.showEdit=false;

				}else{
					alert('Sorry, you do no have rights to update post other than your own');
				}
			};

			//delete comment
			$scope.deleteComment=function(input){
				console.log('chk $scope.post');
				console.log($scope.post);

				var removedComment = CommentSvc.get({postId:$scope.post._id,id:input._id}, function() {
					removedComment.$delete(function(){
						console.log('delete callback is called');
						$scope.post.comments=_.filter($scope.post.comments, function(comment){ return comment._id !== input._id; });
					});
				});
			};

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