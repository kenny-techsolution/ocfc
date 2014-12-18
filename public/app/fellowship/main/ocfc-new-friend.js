//6.26.2014, create directive that displays user image
angular.module('app').directive('ocfcNewFriend', function (FellowshipUserSvc,$routeParams) {
	return{
		restrict: 'E',
		replace: true,
		$scope: {}, //isolated scope
		templateUrl: '/partials/fellowship/main/ocfc-new-friend',
		controller: function ($scope) {

			console.log('chk $routeParams.fellowship_id');
			console.log($routeParams.id);

			$scope.fellowshipUsers = FellowshipUserSvc.get(
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