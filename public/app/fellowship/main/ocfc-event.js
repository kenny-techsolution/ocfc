//6.26.2014, create directive that displays user image
angular.module('app').directive('ocfcEvent', function () {
	return{
		restrict: 'E',
		$scope: true,
		templateUrl: '/partials/fellowship/main/ocfc-event',
		controller: function () {
		}
	};
});