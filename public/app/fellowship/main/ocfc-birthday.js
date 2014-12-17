//6.26.2014, create directive that displays user image
angular.module('app').directive('ocfcBirthday', function () {
	return{
		restrict: 'E',
		$scope: true,
		templateUrl: '/partials/fellowship/main/ocfc-birthday',
		controller: function () {
		}
	};
});