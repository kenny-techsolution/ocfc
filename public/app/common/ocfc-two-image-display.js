angular.module('app').directive('ocfcTwoImageDisplay', function () {
	return{
		restrict: 'E',
		scope: {
			post:'='
		},
		replace: false,
		templateUrl: '/partials/common/ocfc-two-image-display',
		controller: function ($scope) {

		}
	};
});