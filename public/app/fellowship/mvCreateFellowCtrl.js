/*******************************************************************************
 5.7.2014, This controller is used to create new fellowship(s) by Administrator
 ******************************************************************************/
angular.module('app').controller('mvCreateFellowCtrl', function($scope, $http, mvIdentity, mvFellowship, mvNotifier,$routeParams) {

    // this function will interact with the server to let user create a
    // new fellowship.
    $scope.cfForm={
        zipcode:'',
        fellowName:'',
        url:'',
        phone:'',
        address:'',
        proof:'',
        description:''
    }


    //5.15.2014 Add code to display fellowship list created by Admin user
    $scope.createFellowship = function() {
        var zip=$scope.cfForm.zipcode;
        var fellowship={};
        if(zip.length == 5 && $scope.validZip()==true){

            //need to find a way to validate zipcode for correctness too
            fellowship.zipcode=zip;
            fellowship.status="Waiting for Approval";
            fellowship.fellowName=$scope.cfForm.fellowName;

            var newFellow = new mvFellowship(fellowship);
            newFellow.$save().then(function() {
                mvNotifier.notify('New fellowship has been created, please wait for approval');
                    },function(reason){
                    mvNotifier.error(reason);
                }

            );
    };

    // 5.15.2014
    // this function will reset zipcode and fellowName to blank
    // fellowship when under Pending status
        $scope.cancelCreateFellowship = function() {
            $scope.cfForm.zipcode='';
            $scope.cfForm.fellowName='';

        }


});