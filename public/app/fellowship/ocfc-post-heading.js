//6.26.2014, create directive for post heading
angular.module('app').directive('ocfcPostHeading',function() {
	return{
		restrict: 'E',
		$scope: true,
		templateUrl: '/partials/fellowship/ocfc-post-heading',
		controller: function () {
		}
	};
});