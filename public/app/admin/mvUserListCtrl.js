/*************************************************************************************
 This file creates a new Controller called mvUserListCtrl
 which injects $scope, mvUser.js

 assign $scope.users with mvUser.query()

 mvUser.query():  Inserts data into mongoose database.

 ***************************************************************************************/

angular.module('app').controller('mvUserListCtrl',function($scope,mvUser){
    //return all fields from mvUser.query() in mongoose db
    $scope.users=mvUser.query();
});

