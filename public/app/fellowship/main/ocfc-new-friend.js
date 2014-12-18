//6.26.2014, create directive that displays user image
angular.module('app').directive('ocfcNewFriend', function (FellowshipUserSvc,$routeParams) {
	return{
		restrict: 'E',
		replace: true,
		$scope: {}, //isolated scope
		templateUrl: '/partials/fellowship/main/ocfc-new-friend',
		controller: function ($scope) {
			$scope.fellowshipUsers = FellowshipUserSvc.getNewFriends(
				{
					fellowship_id: $routeParams.id
				}
				//below parameter is a callback, 1st parameter must be met
				, function () {
					console.log('chk $scope.fellowshipUsers');
					console.log($scope.fellowshipUsers);
				}
			);
		}
	};
});