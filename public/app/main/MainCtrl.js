//This code stores all records into mvMainCtrl controller
angular.module('app').controller('MainCtrl', function ($scope,IdentitySvc,$http,$location) {
	$scope.IdentitySvc = IdentitySvc;
	$scope.logout = function(){
		console.log("logout");
		$http.post("/logout").success(function(){
			$location.path("/");
			IdentitySvc.currentUser = null;
		});
	};
});