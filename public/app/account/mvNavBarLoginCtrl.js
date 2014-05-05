/*************************************************************************************
 This file creates a new Controller called mvNavBarLoginCtrl
 which takes $scope, $http, $location, mvIdentity.js, mvNotifier.js and mvAuth.js
 directives

 There are 3 objects created (identity, signin and signout)
    identity: points to mvIdentity which will return values for currentUser and isAuthenticated.
    signin:  Checks username and password against object, authenticateUser of mvAuth.js
                to authenticate user
    signout:  Checks username and password against object, logoutUser of mvAuth.js to
                log user out and set username and password as blank/null
 ***************************************************************************************/

angular.module('app').controller('mvNavBarLoginCtrl',function($scope,$http,mvIdentity,mvNotifier,mvAuth,$location){
    //login box did not disappear
    $scope.identity=mvIdentity;

    console.log("Test $scope.identity=mvIdentity;");
    console.log($scope.identity);

    $scope.signin=function(username,password){
        mvAuth.authenticateUser(username,password).then(function(success){
            console.log("login succesfull!!!!!");
        if(success){
                mvNotifier.notify('You have successfully signed in!');
            } else{
                mvNotifier.notify('Username/Password combination incorrect');
            }
        });
    }
    $scope.signout=function(){
        mvAuth.logoutUser().then(function(){
            $scope.username="";
            $scope.password="";
            mvNotifier.notify('You have successfully signed out!');
            $location.path('/');
        });
    }

});