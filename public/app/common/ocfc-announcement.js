//6.26.2014, create directive that displays user image
angular.module('app').directive('ocfcAnnouncement', function ($routeParams) {
	return{
		restrict: 'E',
		scope: true,
		templateUrl: '/partials/common/ocfc-announcement',
		controller: function ($scope) {

			console.log('chk $routeParam');
			console.log($routeParams);

			console.log('chk $scope.FellowshipDataSvc');
			console.log($scope.FellowshipDataSvc);


		}
	};
});