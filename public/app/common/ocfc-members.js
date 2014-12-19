//6.26.2014, create directive that displays user image
angular.module('app').directive('ocfcMembers', function (FellowshipUserSvc,$routeParams) {
	return{
		restrict: 'E',
		$scope: {},
		replace: true,
		templateUrl: '/partials/common/ocfc-members',
		controller: function ($scope) {
			$scope.fellowshipUsers = FellowshipUserSvc.getAllMembers(
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