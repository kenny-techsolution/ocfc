angular.module('app').directive('ocfcThreeImageDisplay', function () {
	return{
		restrict: 'E',
		scope: {
			post:'='
		},
		replace: false,
		templateUrl: '/partials/common/ocfc-three-image-display',
		controller: function ($scope) {

		}
	};
});