/*******************************************************************************
 5.7.2014, This controller is used to create new fellowship(s) by Administrator
 ******************************************************************************/
angular.module('app').controller('mvCreateFellowCtrl', function($scope, $http, mvIdentity, mvFellowship, mvNotifier) {

    // this function will interact with the server to let user create a
    // new fellowship.
    $scope.zipcode;
    $scope.fellowName;

    //Ensure zipcode entered is a valid zicode
    $scope.validZip=function(){
        var zip=$scope.zipcode;

        if (zip.match(/^[0-9]{5}$/)){
            return true;
            mvNotifier("Great job, you've entered a valid zip code.");
        }
        else if (zip.match(/^[A-Z][0-9][A-Z][0-9][A-Z][0-9]$/)){
            return true;
            mvNotifier("Great job, you've entered a valid zip code.");
        }
        else if (zip.match(/^[A-Z][0-9][A-Z].[0-9][A-Z][0-9]$/)){
            return true;
            mvNotifier("Great job, you've entered a valid zip code.");
        }
        else return false;
        mvNotifier("Please enter a valid zip code.");
    };


    $scope.createFellowship = function() {
        var zip=$scope.zipcode;
        var fellowship={};

        console.log("test $scope.validZip()");
        console.log($scope.validZip());
        console.log("test zip.length");
        console.log(zip.length);


        if(zip.length == 5 && $scope.validZip()==true){
            //need to find a way to validate zipcode for correctness too
            fellowship.zipcode=zip;
            fellowship.status="Waiting for Approval";
            fellowship.fellowName=$scope.fellowName;
            cl("Waiting for Approval NEW NEW", $scope.fellowName);

            var newFellow = new mvFellowship(fellowship);
            newFellow.$save().then(function() {
                mvNotifier.notify('New fellowship has been created, please wait for approval');},function(reason){
                    mvNotifier.error(reason);
                }
            );
        }
    };


    //Update User to set role as Admin upon approval of the
    //create fellowship request

    // 5.3.2014
    // this function interacts with server to cancel the user for the
    // fellowship when under Pending status
    $scope.cancelCreateFellowship = function(fellowship) {
        var fellowship=$scope.fellowship;

        var fellow = mvFellowship.get(
            {
                _id: fellowship._id}
            //below parameter is a callback, 1st parameter must be met
            ,function() {
                fellow.role = '';

                //update server with fellowMem data on the front end
                mvFellowship.update({
                    _id: fellow._id
                }, fellow,function(){
                    fellowship.status='';
                });
            }

        );

    };
});