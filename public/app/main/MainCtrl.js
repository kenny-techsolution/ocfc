//This code stores all records into mvMainCtrl controller
angular.module('app').controller('MainCtrl', function ($scope,IdentitySvc,$http,$location) {
	console.log("IdentitySvc.isAuthenticated()");
	console.log(IdentitySvc.currentUser);
	$scope.IdentitySvc = IdentitySvc;

	$scope.logout = function(){
		console.log("logout");
		$http.post("/logout").success(function(){
			$location.path("/");
			IdentitySvc.currentUser = null;
		});
	};
});