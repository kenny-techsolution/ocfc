//6.26.2014, create directive for post types
angular.module('app').directive('ocfcPostTypes',function() {
	return{
		restrict: 'E',
		templateUrl: '/partials/fellowship/ocfc-post-types'
	};
});