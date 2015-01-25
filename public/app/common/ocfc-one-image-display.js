angular.module('app').directive('ocfcOneImageDisplay', function () {
	return{
		restrict: 'E',
		scope: {
			post:'=',
			imagePrefix:'='
		},
		replace: true,
		templateUrl: '/partials/common/ocfc-one-image-display',
		controller: function ($scope) {
		}
	};
});