//This code stores all records into mvMainCtrl controller
angular.module('app').controller('MainCtrl', function ($scope, IdentitySvc, $http, $location,NotificationDataSvc) {
	console.log('front-end MainCtrl has been called');

	$scope.IdentitySvc = IdentitySvc;
	$scope.logout = function () {
		$http.post("/logout").success(function () {
			$location.path("/");
			IdentitySvc.currentUser = null;
		});
	};
	$scope.$location = $location;
	$scope.exploreDropDown = false;

	$scope.NotificationDataSvc=NotificationDataSvc;


	//watch for array object
	$scope.$watchCollection('NotificationDataSvc.notifications',function(newVal,oldVal){
		if (newVal){
			console.log('chk NotificationDataSvc.notifications');
			console.log(NotificationDataSvc.notifications);

		}

	});

	//to capture notification alert after user refresh page.
	//bc user won't have to go through login step
	//since user is still in session
	//_.isEmpty is only used for object
	if (!_.isEmpty(IdentitySvc.currentUser)){
		$scope.NotificationDataSvc.refresh();
	}

});