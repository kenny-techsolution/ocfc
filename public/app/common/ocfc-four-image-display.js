angular.module('app').directive('ocfcFourImageDisplay', function () {
	return{
		restrict: 'E',
		scope: {
			post:'='
		},
		replace: false,
		templateUrl: '/partials/common/ocfc-four-image-display',
		controller: function ($scope) {

		}
	};
});