//6.26.2014, create directive for wall category
angular.module('app').directive('ocfcWallCategory',function() {
	return{
		restrict: 'E',
		$scope: true,
		templateUrl: '/partials/fellowship/ocfc-wall-category',
		controller: function () {
		}
	};
});