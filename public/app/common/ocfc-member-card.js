//6.26.2014, create directive that displays user image
angular.module('app').directive('ocfcMemberCard', function ($http, FellowshipDataSvc) {
	return{
		restrict: 'E',
		scope: {
			user:'=',
			isCurrentUserAdmin:'=',
			memberModal: '='
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
				$scope.memberModal.open = true;
				$scope.memberModal.title = "Deny " + user.userId.fullName + " to join?";
				//return;
				console.log("approveJoin");
				console.log($scope.user);
				$scope.memberModal.buttonTxt = "DENY";
				$scope.memberModal.user = $scope.user.userId;
				$scope.memberModal.actionFunc = function(fellowshipId, userId, reason){
					console.log("fellowshipId");
					console.log(fellowshipId);
					console.log("userId");
					console.log(userId);
					console.log(reason);
					return $http.put('/api/fellowships/'+ fellowshipId +'/users/' + userId + '/denyUserToFellowship', {reason: reason});
				};
			};
			$scope.removeMember = function (user) {
				$scope.memberModal.open = true;
				$scope.memberModal.title = "Remove " + user.userId.fullName + " from fellowship?";
				//return;
				//console.log("approveJoin");
				//console.log($scope.user);
				$scope.memberModal.buttonTxt = "REMOVE";
				$scope.memberModal.user = $scope.user.userId;
				$scope.memberModal.actionFunc = function(fellowshipId, userId, reason){
					console.log("fellowshipId");
					console.log(fellowshipId);
					console.log("userId");
					console.log(userId);
					console.log(reason);
					return $http.put('/api/fellowships/'+ fellowshipId +'/users/' + userId + '/removeUserFromFellowship', {reason: reason});
				};
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