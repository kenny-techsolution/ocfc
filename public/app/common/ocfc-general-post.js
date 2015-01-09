//6.26.2014, create directive that displays user image
angular.module('app').directive('ocfcGeneralPost', function (IdentitySvc,CommentSvc,_) {
	return{
		restrict: 'E',
		scope: {
			post:'='
		},
		templateUrl: '/partials/common/ocfc-general-post',
		controller: function ($scope) {

			$scope.IdentitySvc= IdentitySvc;

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

			//update comment


		}
	};
});