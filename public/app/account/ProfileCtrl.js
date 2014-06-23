/*************************************************************************************
 This file creates a new Directive called ProfileCtrl
 which injects $scope, AuthSvc.js,IdentitySvc.js,NotifierSvc.js

 Includes 4 fields: email, fname, lname and password (optional)

 Script will update email, fname & lname, if password is entered then save the new info.

 Calls AuthSvc.updateCurrentUser with the new data stored in object, newUserData.
 ***************************************************************************************/

angular.module('app').controller('ProfileCtrl',function($scope, AuthSvc,IdentitySvc,NotifierSvc){

});