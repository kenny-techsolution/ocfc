angular.module('app').directive('ocfcToolBarNav', function ($routeParams,$location) {
	return{
		restrict: 'E',
		scope: {
			FellowshipDataSvc:'='
		},
		templateUrl: '/partials/common/ocfc-tool-bar-nav',
		controller: function ($scope) {

			$scope.goto = function(subpage){
				$location.path('/fellowship/'+ $routeParams.id + '/' + subpage);
			};


		}
	};
});