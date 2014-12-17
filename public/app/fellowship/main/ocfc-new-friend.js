//6.26.2014, create directive that displays user image
angular.module('app').directive('ocfcNewFriend', function () {
	return{
		restrict: 'E',
		$scope: true,
		templateUrl: '/partials/fellowship/main/ocfc-new-friend',
		controller: function (FellowshipUserSvc) {
			$scope.fellowshipUsers = FellowshipUserSvc.get(
				{
					fellowshipId: $routeParams.fellowship_id}
				//below parameter is a callback, 1st parameter must be met
				, function () {

				}
			);
		}
	};
});