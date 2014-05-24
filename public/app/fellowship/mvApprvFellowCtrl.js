/*******************************************************************************
 * 5.22.2014, this file creates a new Controller called mvApprvFellowCtrl for OCFC
 * admin approval.
 * GET, UPDATE, REMOVE, QUERY, ADD
 ******************************************************************************/
angular.module('app').controller('mvApprvFellowCtrl', function($scope, $http, mvIdentity,mvFellowship) {
    // function()() is a self triggered function
    // no calling required
    $scope.curr_idx;
    $scope.setModalFellowshipIndex=function(fellowIndex){
        $scope.curr_idx = fellowIndex;
    };
    //5.22.2014, Display list of data where status='Waiting for Approval'
    $scope.fellowships =mvFellowship.query({
        status: 'Waiting for Approval'  //where clause
    }, function() {
        console.log("the result is here");
    });


    // 5.22.2014
    // this function interacts with server to approve the user for the fellowship creation.
    // Update status field of fellowship data collection
    $scope.approveFellowship = function(fellowship) {
            //update server with fellowMem data on the front end
            fellowship.status='Approved';
            mvFellowship.update({
                _id: fellowship._id  //where clause
            }, fellowship,function(){

            });
    };

    // 5.22.2014
    // this function interacts with server to cancel the user for the
    // fellowship when under Pending status
    $scope.rejectFellowship = function() {
        var fellowship = $scope.fellowships[$scope.curr_idx];
        cl('test fellowship',fellowship);
        fellowship.status='Denied';
        fellowship.reason=$scope.reason;
        mvFellowship.update({
            _id: fellowship._id  //where clause
        }, fellowship,function(){
            $("#RejConfirmation").modal('hide');
        });

    };

});