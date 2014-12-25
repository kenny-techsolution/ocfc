//6.26.2014, create directive that displays user image
angular.module('app').directive('ocfcNewFriend', function (FellowshipUserSvc,ChurchUserSvc,$routeParams) {
	return{
		restrict: 'E',
		replace: false,
		scope: {
			groupType:"@"
		}, //isolated scope
		templateUrl: '/partials/common/ocfc-new-friend',
		controller: function ($scope) {
			console.log('chk $scope.groupType value!!!');
			console.log($scope.groupType);
			if($scope.groupType==='fellowship'){
				console.log('ocfcNewFriend directive has been called for group-type fellowship');
				console.log('chk $scope.groupType value');
				console.log($scope.groupType);
				//logic to populate fellowship users
				$scope.users = FellowshipUserSvc.getNewFriends(
					{
						fellowship_id: $routeParams.id
					}
					//below parameter is a callback, 1st parameter must be met
					, function () {
						console.log('chk $scope.users of FellowshipUserSvc.getNewFriends was called');
						console.log($scope.users);
					}
				);
			}else if ($scope.groupType==='church'){
				console.log('ocfcNewFriend directive has been called for group-type church');
				console.log('chk $scope.groupType value');
				console.log($scope.groupType);
				//add logic to populate church users
				$scope.users = ChurchUserSvc.getNewFriends(
					{
						church_id: $routeParams.id
					}
					//below parameter is a callback, 1st parameter must be met
					, function () {
						console.log('chk $scope.users of ChurchUserSvc.getNewFriends was called');
						console.log($scope.users);
					}
				);

			}

		}
	};
});

