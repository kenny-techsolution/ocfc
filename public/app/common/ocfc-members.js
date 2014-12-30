//6.26.2014, create directive that displays user image
angular.module('app').directive('ocfcMembers', function () {
	return{
		restrict: 'E',
		scope: {
			users:'='
		},
		replace: true,
		templateUrl: '/partials/common/ocfc-members',
		controller: function ($scope) {
			//no restriction required since we're returning all members
		}
	};
});