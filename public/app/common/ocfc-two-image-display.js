angular.module('app').directive('ocfcTwoImageDisplay', function () {
	return{
		restrict: 'E',
		scope: {
			post:'=',
			imagePrefix:'='
		},
		replace: true,
		templateUrl: '/partials/common/ocfc-two-image-display',
		controller: function ($scope) {

		}
	};
});