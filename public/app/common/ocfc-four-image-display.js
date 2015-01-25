angular.module('app').directive('ocfcFourImageDisplay', function () {
	return{
		restrict: 'E',
		scope: {
			post:'=',
			imagePrefix:'='
		},
		replace: true,
		templateUrl: '/partials/common/ocfc-four-image-display',
		controller: function ($scope) {

		}
	};
});