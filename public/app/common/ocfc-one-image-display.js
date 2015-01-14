angular.module('app').directive('ocfcOneImageDisplay', function () {
	return{
		restrict: 'E',
		scope: {
			post:'='
		},
		replace: false,
		templateUrl: '/partials/common/ocfc-one-image-display',
		controller: function ($scope) {

		}
	};
});