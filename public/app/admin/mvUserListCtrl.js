/*************************************************************************************
 This file creates a new Controller called mvUserListCtrl
 which injects $scope, mvUser.js

 assign $scope.users with mvUser.query()

 mvUser.query() service:  Inserts data into mongoose database.

 ***************************************************************************************/

angular.module('app').controller('mvUserListCtrl',function($scope,mvUser){
    //return all fields from mvUser.query() in mongoose db
    $scope.users=mvUser.query();
    console.log("Test user role by calling $scope.users");
    console.log($scope.users);
});

