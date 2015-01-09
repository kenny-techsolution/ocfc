//6.26.2014, create directive that displays user image
angular.module('app').directive('ocfcGeneralPost', function (IdentitySvc,CommentSvc) {
	return{
		restrict: 'E',
		scope: {
			post:'='
		},
		templateUrl: '/partials/common/ocfc-general-post',
		controller: function ($scope) {

			$scope.comment;
			$scope.postTypeStr=function(){

				if($scope.postType===0){
					return 'General'
				}else{
					//default to General
					return 'General'
				}
			};

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


		}
	};
});