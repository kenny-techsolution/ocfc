angular.module('app').directive('ocfcFiveImageDisplay', function () {
	return{
		restrict: 'E',
		scope: {
			post:'=',
			selectedPost:'=',
			imagePrefix:'='
		},
		replace: true,
		templateUrl: '/partials/common/ocfc-five-image-display',
		controller: function ($scope) {

		}
	};
});