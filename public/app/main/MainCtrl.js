//This code stores all records into mvMainCtrl controller
angular.module('app').controller('MainCtrl', function ($scope,IdentitySvc) {
	$scope.dynamicPopoverTitle ='Hello,World Title';
	$scope.dynamicPopover ='Hello,World';
	console.log("IdentitySvc.isAuthenticated()");
	console.log(IdentitySvc.currentUser);
	$scope.IdentitySvc = IdentitySvc;
});