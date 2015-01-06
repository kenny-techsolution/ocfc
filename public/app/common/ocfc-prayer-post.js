//6.26.2014, create directive that displays user image
angular.module('app').directive('ocfcPrayerPost', function () {
	return{
		restrict: 'E',
		scope: true,
		templateUrl: '/partials/common/ocfc-prayer-post',
		controller: function () {
		}
	};
});