//6.26.2014, create directive for post response icons
angular.module('app').directive('ocfcPostResIcons',function() {
	return{
		restrict: 'E',
		$scope: true,
		templateUrl: '/partials/fellowship/ocfc-post-res-icons',
		controller: function () {
		}
	};
});