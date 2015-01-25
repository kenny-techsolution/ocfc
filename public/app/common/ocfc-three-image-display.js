angular.module('app').directive('ocfcThreeImageDisplay', function () {
	return{
		restrict: 'E',
		scope: {
			post:'=',
			imagePrefix:'='
		},
		replace: true,
		templateUrl: '/partials/common/ocfc-three-image-display',
		controller: function ($scope) {

		}
	};
});