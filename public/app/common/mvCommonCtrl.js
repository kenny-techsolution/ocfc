/*************************************************************************************
 Common controller, always required
 ***************************************************************************************/

angular.module('app').controller('mvCommonCtrl',function($scope, mvSetup,mvIdentity){
    $scope.initObj={};
    $scope.initObj.myFellowships;
    mvSetup.init($scope.initObj);
    $scope.identity=mvIdentity;
});