/*************************************************************************************
 Common controller, always required
 ***************************************************************************************/

angular.module('app').controller('mvCommonCtrl',function($scope, mvSetup){
    $scope.initObj={};
    $scope.initObj.myFellowships;
    mvSetup.init($scope.initObj);

});