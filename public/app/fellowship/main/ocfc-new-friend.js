//6.26.2014, create directive that displays user image
angular.module('app').directive('ocfcNewFriend', function () {
	return{
		restrict: 'E',
		$scope: true,
		templateUrl: '/partials/fellowship/main/ocfc-new-friend',
		controller: function (FellowshipUserSvc,$routeParams,$scope) {
			$scope.fellowshipUsers = FellowshipUserSvc.get(
				{
					fellowshipId: $routeParams.fellowship_id}
				//below parameter is a callback, 1st parameter must be met
				, function () {
					$scope.fellowshipUsers.userId=ObjectId("5475549cb8733c5d864688ea");
				}
			);
		}
	};
});