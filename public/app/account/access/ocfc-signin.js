/*************************************************************************************
 This file creates a new directive
 which takes $scope, $http, $location, IdentitySvc.js, NotifierSvc.js and AuthSvc.js
 directives

 There are 3 objects created (identity, signin and signout)
 identity: points to IdentitySvc which will return values for currentUser and isAuthenticated.
 signin:  Checks username and password against object, authenticateUser of AuthSvc.js
 to authenticate user
 ***************************************************************************************/
//6.22.2014, create directive for signin
angular.module('app').directive('ocfcSignin',function(){
	return{
		restrict:'E',
		templateUrl:'/partials/account/access/ocfc-signin',
		controller:function($scope,$http,IdentitySvc,NotifierSvc,AuthSvc){
			$scope.signin=function(username,password){
				AuthSvc.authenticateUser(username,password).then(function(success){
					if(success){
						NotifierSvc.notify('You have successfully signed in!');
					} else{
						NotifierSvc.notify('Username/Password combination incorrect');
					}
				});
			}
		}
	};
});