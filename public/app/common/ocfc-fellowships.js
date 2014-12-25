//6.26.2014, create directive that displays user image
angular.module('app').directive('ocfcFellowships', function (FellowshipUserSvc,$routeParams) {
	return{
		restrict: 'E',
		$scope: {},
		replace: true,
		templateUrl: '/partials/common/ocfc-fellowships',
		controller: function ($scope) {


		}
	};
});