/*************************************************************************************
 This file creates a new directive
 which takes $scope, $http, $location, IdentitySvc.js, NotifierSvc.js and AuthSvc.js
 directives

 There are 3 objects created (identity, signin and signout)
 identity: points to IdentitySvc which will return values for currentUser and isAuthenticated.
 signout:  Checks username and password against object, logoutUser of AuthSvc.js to
 log user out and set username and password as blank/null
 ***************************************************************************************/

//6.22.2014, create directive for signout
angular.module('app').directive('ocfcSignout',function(){
    return{
        restrict:'E',
        templateUrl:'/partials/account/access/ocfc-signout',
        controller:function($scope,NotifierSvc,AuthSvc,$location){
            //login box did not disappear
            //$scope.identity=IdentitySvc;

            $scope.signout=function(){
	            AuthSvc.logoutUser().then(function(){
                    $scope.username="";
                    $scope.password="";
		            NotifierSvc.notify('You have successfully signed out!');
                    $location.path('/');
                });
            }
        }
    };
});