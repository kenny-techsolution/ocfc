/*************************************************************************************
 This file creates a new Controller called mvJoinFellowCtrl.  The code stores all
 records into mvJoinFellowCtrl controller.  The controller checks zipcode input text
 of no more than 5 length chars

 creates a objects called:

 updateFellowList: once the condition is met, $http directive will retrieve the data
                   from mongodb of fellowships collection

 associatedFellowships:  get or read all the associated fellowships for the current user.

 selectedFellowship:  set as null

 joinFellowship:  add userId and fellowId onto fellowMems collection

 fellowMemResource:   Takes rest /api/fellowMems/:id using GET method to grab records
 for specific user
 ***************************************************************************************/
angular.module('app').controller('mvJoinFellowCtrl',function($scope,$http, mvIdentity ,mvFellowMem){
    //function()() is a self triggered function
    //no calling required

    $scope.associatedFellowships;
    $scope.fellowships;

    $scope.getAssociatedFellowships = (function(){
        console.log("Test for authenication TRUE or FALSE by reading associated" +
            "fellowships for the current user in mvJoinFellowCtrl");
        console.log(mvIdentity.isAuthenticated());
        if(mvIdentity.isAuthenticated()===true){
            mvFellowMem.query({userId:mvIdentity.currentUser._id}).$promise.then(function(data){
                    console.log("Test userId:mvIdentity.currentUser._id");
                    console.log(typeof data);
                    console.log(data);
                    $scope.associatedFellowships = data;
            });
        }
    }());

    //updates the fellowship collection (on angular side)
    $scope.updateFellowList=function(){
        if($scope.zipcode.length ==5){
            console.log("Test");
            $http({
                    url: '/api/fellows',
                    method: 'GET',
                    params: {zip:$scope.zipcode}
            }).success(function(data){
                    console.log(data);

                    //add status key by checking Fellowship collection
                    // against associatedFellowships array
                    angular.forEach(data, function(fellowObj, key){
//                        console.log("fellowObj");
//                        console.log(fellowObj);
//                        console.log($scope.associatedFellowships);
                        var norun= false;
                        angular.forEach($scope.associatedFellowships,function(fellowMemObj,key){
                            if(norun == false){
                                if (fellowObj._id==fellowMemObj.fellowship){
//                                    console.log("yest");
                                    fellowObj.status=fellowMemObj.status;
                                    fellowObj.fellowMemId=fellowMemObj._id;
//                                    console.log(fellowObj.status);
                                    norun = true;
                                } else {
                                    fellowObj.status='None';
                                }
                            }

                        });
                    });
                    console.log(data);
                    //fellowship is set to the array of data
                    //which is being used in the Jade file
                    $scope.fellowships = data;
            });
        }
    };

    $scope.selectedFellowship = null;

    $scope.joinFellowship = function(id) {
        var fellowMemData = {
            "userId": mvIdentity.currentUser._id,
            "fellowId": id
        };
        var newFellowMem = new mvFellowMem(fellowMemData);
        newFellowMem.$save().then(function(response){
            console.log(response);
        });
    };

    //4.30.2014, added to approve fellowship
    //and update status in fellowmems collection
    $scope.approveFellowship = function(id,fellowMemId) {
        var fellowMemData = {
            "userId": mvIdentity.currentUser._id,
            "fellowId": id
        };
        //we need to get the fellowMem document that we want to update.
        var fellowMem = mvFellowMem.get({},{'_id':fellowMemId});
        console.log(fellowMem);
        fellowMem.status='Approved';
        //once we get it, we will call update the value, and then call save.
        fellowMem.$save();
    };


    //the name and zipcode are default records on the website.
    //we will grab these info from mongodb later on
    $scope.zipcode = '';
    $scope.loadFellows=function(){
        $http({
            url: '/api/fellows',
            method: 'GET'
        }).success(function(data){
                console.log(data);

                //add status key by checking Fellowship collection
                // against associatedFellowships array
                angular.forEach(data, function(fellowObj, key){
//                        console.log("fellowObj");
//                        console.log(fellowObj);
//                        console.log($scope.associatedFellowships);
                    var norun= false;
                    angular.forEach($scope.associatedFellowships,function(fellowMemObj,key){
                        if(norun == false){
                            if (fellowObj._id==fellowMemObj.fellowship){
//                                    console.log("yest");
                                fellowObj.status=fellowMemObj.status;
                                fellowObj.fellowMemId=fellowMemObj._id;
//                                    console.log(fellowObj.status);
                                norun = true;
                            } else {
                                fellowObj.status='None';
                            }
                        }

                    });
                });
                console.log(data);
                $scope.fellowships = data;
            });
    }();

});