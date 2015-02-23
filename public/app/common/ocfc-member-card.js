//6.26.2014, create directive that displays user image
angular.module('app').directive('ocfcMemberCard', function ($http, FellowshipDataSvc) {
	return{
		restrict: 'E',
		scope: {
			user:'=',
			isCurrentUserAdmin:'='
		},
		replace: true,
		templateUrl: '/partials/common/ocfc-member-card',
		controller: function ($scope) {
			$scope.FellowshipDataSvc = FellowshipDataSvc;
			$scope.makeSubAdmin = function (user) {
				console.log("$scope.user");
				console.log($scope.user);
				$http.put('/api/fellowships/'+ $scope.FellowshipDataSvc.fellowship._id +'/users/' + $scope.user.userId._id + '/makeSubAdmin', {}).
					success(function(data){
						if(data.status ==='success') {
							user.role = "subadmin";
						}
		 			}).error(function(data){
						console.log(data);
					});
			};
			$scope.removeSubAdmin = function (user) {
				console.log("$scope.user");
				console.log($scope.user);
				$http.put('/api/fellowships/'+ $scope.FellowshipDataSvc.fellowship._id +'/users/' + $scope.user.userId._id + '/removeSubAdmin', {}).
					success(function(data){
						if(data.status ==='success') {
							user.role = "member";
						}
		 			}).error(function(data){
						console.log(data);
					});
			};
			$scope.approveJoin = function (user) {
				console.log("approveJoin");
				console.log($scope.user);
				$http.put('/api/fellowships/'+ $scope.FellowshipDataSvc.fellowship._id +'/users/' + $scope.user.userId._id + '/approveUserToFellowship', {}).
					success(function(data){
						if(data.status ==='success') {
							user.status = "approved";
						}
		 			}).error(function(data){
						console.log(data);
					});
			};
			$scope.denyJoin = function (user) {
				console.log("approveJoin");
				console.log($scope.user);
				$http.put('/api/fellowships/'+ $scope.FellowshipDataSvc.fellowship._id +'/users/' + $scope.user.userId._id + '/denyUserToFellowship', {}).
					success(function(data){
						if(data.status ==='success') {
							user.status = "denied";
						}
		 			}).error(function(data){
						console.log(data);
					});
			};
			$scope.removeMember = function (user) {
				console.log("approveJoin");
				console.log($scope.user);
				$http.put('/api/fellowships/'+ $scope.FellowshipDataSvc.fellowship._id +'/users/' + $scope.user.userId._id + '/removeUserFromFellowship', {}).
					success(function(data){
						if(data.status ==='success') {
							user.status = "removed";
						}
		 			}).error(function(data){
						console.log(data);
					});
			};
			//no restriction required since we're returning all members
			$scope.memberDropdown = [
				{
					"text": "Remove Member",
					"click": "removeMember(user)"
				},
				{
					"text": "Make Sub-Admin",
					"click": "makeSubAdmin(user)"
				}
			];
			$scope.subAdminDropdown = [
				{
					"text": "Remove Member",
					"click": "removeMember(user)"
				},
				{
					"text": "remove Sub-Admin",
					"click": "removeSubAdmin(user)"
				}
			];
			$scope.pendingDropdown = [
				{
					"text": "Approve Join",
					"click": "approveJoin(user)"
				},
				{
					"text": "Deny Join",
					"click": "denyJoin(user)"
				}
			];
		}
	};
});