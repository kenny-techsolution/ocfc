angular.module('app').directive('ocfcExplore', function (IdentitySvc) {
	return{
		restrict: 'E',
		scope: true,
		templateUrl: '/partials/common/ocfc-explore',
		controller: function ($scope) {
			$scope.users=IdentitySvc;
			$scope.userFellowships=$scope.users.currentUser.fellowships;
			$scope.userChurches=$scope.users.currentUser.churches;



			console.log('chk $scope.users obj');
			console.log($scope.users);

			console.log('chk $scope.userFellowships obj');
			console.log($scope.userFellowships);

			console.log('chk $scope.userChurches obj');
			console.log($scope.userChurches);

		}
	};
});