/*************************************************************************************
 This file creates a new Controller called SignupCtrl
 which takes $scope, UserSvc.js, NotifierSvc,$location,AuthSvc.js
 directives

 newUserData object is created containing username, password, firstName and LastName

 Checks data against AuthSvc.js to insure data is correct
 *************** ************************************************************************/

angular.module('app').controller('SignupCtrl', function ($scope,$http,$routeParams,$location,IdentitySvc,UserSvc, NotifierSvc, $location, AuthSvc) {

			$scope.signin = function (username, password) {
				AuthSvc.authenticateUser(username, password).then(function (success) {
					if (success) {
						NotifierSvc.notify('You have successfully signed in!');
						//chk activation table if entry exist given userId
						console.log('chk IdentitySvc.currentUser._id');
						console.log(IdentitySvc.currentUser._id);
						$http.get('/api/getActivation?&userId='+IdentitySvc.currentUser._id).
							success(function(data, status, headers, config) {
								// this callback will be called asynchronously
								// when the response is available
								console.log('userId is successful, chk data');
								console.log(data);
								//then re-direct first time setup screen
								console.log('chk underscore');
								console.log(_);
								if (_.isEmpty(data)){
									$location.url('/personal');
								}else{
									$location.url('/firstTimer');
								}

							}).
							error(function(data, status, headers, config) {
								// called asynchronously if an error occurs
								// or server returns response with an error status.
								console.log('userId not found in Activation tbl');

							});

					} else {
						NotifierSvc.notify('Username/Password combination incorrect');
					}
				});
			};

			$scope.signup = function () {
				var birthday = new Date($scope.year, $scope.month-1, $scope.day);
				var newUserData = {
					fullName: $scope.fullName,
					userName: $scope.email,
					password: $scope.password,
					birthday: birthday,
					gender: $scope.gender
				};

				//newUser creates new instance of UserSvc service resource object
				//it then gets saved & data is passed into IdentitySvc.currentUser
				AuthSvc.createUser(newUserData).then(function () {
						console.log('test newUserData dataset for signup');
						console.log(newUserData);
						NotifierSvc.notify('User account created!');
						$location.path('/registrationComplete');
					}
					, function (reason) {
						NotifierSvc.error(reason);
					});
			};
});