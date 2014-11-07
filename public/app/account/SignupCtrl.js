/*************************************************************************************
 This file creates a new Controller called SignupCtrl
 which takes $scope, UserSvc.js, NotifierSvc,$location,AuthSvc.js
 directives

 newUserData object is created containing username, password, firstName and LastName

 Checks data against AuthSvc.js to insure data is correct
 *************** ************************************************************************/


angular.module('app').controller('SignupCtrl', function ($scope, UserSvc, NotifierSvc, $location, AuthSvc) {
	$scope.signup = function () {
		var newUserData = {
			userName: $scope.email,
			password: $scope.password,
			firstName: $scope.fname,
			lastName: $scope.lname};

	AuthSvc.createUser(newUserData).then(function () {
			NotifierSvc.notify('User account created!');
			$location.path('/');
		}
		, function (reason) {
			NotifierSvc.error(reason);
		})
	}
});