//6.26.2014, create directive that displays user image
angular.module('app').directive('ocfcAboutUs', function (IdentitySvc, CommentApiSvc, _, FellowshipApiSvc) {
	return{
		restrict: 'E',
		scope: {
			fellowship:'=',
			post: '=',
			imagePopup: '=',
			posts: '=',
			dropdown: '=',
			isAdmin:'='
		}, //isolated scope
		templateUrl: '/partials/common/ocfc-about-us',
		controller: function ($scope) {
			console.log('ocfcAboutUs has been called');
			//console.log('chk $scope.fellowship obj');
			//console.log($scope.fellowship);

			$scope.IdentitySvc = IdentitySvc;
			$scope.showEdit = false;

			$scope.$watch('fellowship',function(newVal,oldVal){
				//console.log('chk newVal');
				//console.log(newVal);
				if(!newVal){
					//console.log('chk newVal within if condition');
					//console.log(newVal);
					$scope.newAboutContent = $scope.fellowship.about;
				}
			});

			$scope.hideEditPost = function () {
				console.log('hideEditPost function called');
				$scope.showEdit = false;
			};

			//edit post derived from dropdown
			$scope.editPost = function () {
				console.log('editPost function called');
				$scope.showEdit = true;
			};

			$scope.updateEditedPost = function () {
				console.log('updateEditedPost function called');
				$scope.fellowship.about = $scope.newAboutContent;

				//console.log('chk IdentitySvc obj');
				//console.log(IdentitySvc);

				//cannot update post other than your own
				if ($scope.isAdmin) {
					console.log('if condition is met, this post is made by current user');

					var updateAboutUs = angular.copy($scope.fellowship);

					//console.log('chk updatePost obj whether about has been updated');
					//console.log(updateAboutUs);

					//update post obj on the server side
					FellowshipApiSvc.update({id: updateAboutUs._id}, updateAboutUs, function () {
						console.log('front-end FellowshipSvc.update has completed');
					});
					$scope.showEdit = false;
				} else {
					alert('Sorry, you do no have rights to update About post unless you are an admin');
				}

			};


		}
	};
});

