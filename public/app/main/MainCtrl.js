//This code stores all records into mvMainCtrl controller
angular.module('app').controller('MainCtrl', function ($scope,IdentitySvc) {
	$scope.popover = {
		"title": "Title",
		"content": "Hello Popover<br />This is a multiline message!"
	};



	console.log("IdentitySvc.isAuthenticated()");
	console.log(IdentitySvc.currentUser);
	$scope.IdentitySvc = IdentitySvc;
});