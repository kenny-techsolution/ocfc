angular.module('app').directive('ocfcExplore', function (IdentitySvc) {
	//replace the directive tag with jade template from ocfc-explore
	return{
		restrict: 'E',
		replace: false,
		scope:{exploreDropDown:'='},
		templateUrl: '/partials/common/ocfc-explore',
		controller: function ($scope) {
			//directive only compiles once
			$scope.users=IdentitySvc;
			//set array of empty ensure ngRepeat won't break
			$scope.userFellowships=[];
			$scope.userChurches=[];
			//watch checks changes of a scope variable
			$scope.$watch('users.currentUser', function(){
				if(typeof $scope.users.currentUser != 'undefined' && $scope.users.currentUser != null){
					console.log('chk $scope.users.currentUser');
					console.log($scope.users.currentUser)
					$scope.userFellowships=$scope.users.currentUser.fellowships;
					$scope.userChurches=$scope.users.currentUser.churches;
				}
			});

			$scope.toggleExploreDropdown=function(){
				console.log('test $scope.exploreDropDown');
				$scope.exploreDropDown=!$scope.exploreDropDown;
			};
		}
	};
});