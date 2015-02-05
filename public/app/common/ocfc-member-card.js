//6.26.2014, create directive that displays user image
angular.module('app').directive('ocfcMemberCard', function () {
	return{
		restrict: 'E',
		scope: {
			user:'=',
			isCurrentUserAdmin:'='
		},
		replace: true,
		templateUrl: '/partials/common/ocfc-member-card',
		controller: function ($scope) {
			//no restriction required since we're returning all members
			$scope.memberDropdown = [
				{
					"text": "Remove Member",
					"click": "editPost()"
				},
				{
					"text": "Make Sub-Admin",
					"click": "deletePost()"
				}
			];
			$scope.pendingDropdown = [
				{
					"text": "Approve Join",
					"click": "editPost()"
				},
				{
					"text": "Deny Join",
					"click": "deletePost()"
				}
			];
		}
	};
});