//6.26.2014, create directive that displays user image
angular.module('app').directive('ocfcNewFriend', function () {
	return{
		restrict: 'E',
		$scope: true,
		templateUrl: '/partials/fellowship/main/ocfc-new-friend',
		controller: function () {
		}
	};
});