
angular.module('app').controller('ActivateCtrl', function ($scope, $http, AuthSvc, IdentitySvc, NotifierSvc,$routeParams) {

console.log('call $routeParams');
console.log($routeParams);

$http.get('/api/activate?activationCode='+$routeParams.activateCode+'&userId='+$routeParams.id).
	success(function(data, status, headers, config) {
	// this callback will be called asynchronously
	// when the response is available
		console.log('success');
		$scope.display=true;
		$scope.email=$routeParams.email;
}).
	error(function(data, status, headers, config) {
		// called asynchronously if an error occurs
		// or server returns response with an error status.
		console.log('error');
		$scope.display=false;
	});

});