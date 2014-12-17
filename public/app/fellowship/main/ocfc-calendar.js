//6.26.2014, create directive that displays user image
angular.module('app').directive('ocfcCalendar', function () {
	return{
		restrict: 'E',
		$scope: true,
		templateUrl: '/partials/fellowship/main/ocfc-calendar',
		controller: function () {
		}
	};
});