//6.26.2014, create directive that displays user image
angular.module('app').directive('ocfcGeneralPost', function () {
	return{
		restrict: 'E',
		scope: true,
		templateUrl: '/partials/common/ocfc-general-post',
		controller: function () {
		}
	};
});