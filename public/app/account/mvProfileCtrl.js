/*************************************************************************************
 This file creates a new Directive called mvProfileCtrl
 which injects $scope, mvAuth.js,mvIdentity.js,mvNotifier.js

 Includes 4 fields: email, fname, lname and password (optional)

 Script will update email, fname & lname, if password is entered then save the new info.

 Calls mvAuth.updateCurrentUser with the new data stored in object, newUserData.
 ***************************************************************************************/

angular.module('app').controller('mvProfileCtrl',function($scope, mvAuth,mvIdentity,mvNotifier){
    $scope.email=mvIdentity.currentUser.userName;
    $scope.fname=mvIdentity.currentUser.firstName;
    $scope.lname=mvIdentity.currentUser.lastName;

    $scope.update=function(){
        var newUserData={
            userName: $scope.email,
            firstName: $scope.fname,
            lastName: $scope.lname
        }
        if($scope.password && $scope.password.length>0){
            newUserData.password=$scope.password;
        }

        mvAuth.updateCurrentUser(newUserData).then(function(){
            mvNotifier.notify('Your user account has been updated');}
            ,function(reason){
                mvNotifier.error(reason);
        });
    };

});