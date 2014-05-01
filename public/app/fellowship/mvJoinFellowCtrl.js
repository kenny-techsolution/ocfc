//This code stores all records into mvJoinFellowCtrl controller
//the controller checks zipcode input text of no more than 5 length chars
//once the condition is met, $http directive will retrieve the data from mongodb of fellowships collection
angular.module('app').controller('mvJoinFellowCtrl',function($scope,$http, mvIdentity ,mvFellowMem){
    $scope.updateFellowList=function(){
        if($scope.zipcode.length ==5){
            console.log("Test");
            $http({
                url: '/api/fellows',
                method: 'GET',
                params: {zip:$scope.zipcode}
            }).success(function(data){
                    console.log(data);
                    $scope.fellowships = data;
            });
        }
    };
    //get/read all the associated fellowships for the current user.
    $scope.associatedFellowships = (function(){
        console.log("authenicated");
        console.log(mvIdentity.isAuthenticated());
        if(mvIdentity.isAuthenticated()===true){
            mvFellowMem.get({userId:mvIdentity.currentUser._id}).$promise.then(function(data){
                console.log("testset");
                console.log(data);
            });
        }
    }());

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
    //the name and zipcode are default records on the website.
    //we will grab these info from mongodb later on
    $scope.zipcode = '';
    $scope.fellowships = [
        {
            name: "timothy fellowhsip",
            zipcode: 43229
        },
        {
            name: "supermen fellowhsip",
            zipcode: 43229
        },
        {
            name: "grace fellowhsip",
            zipcode: 43229
        }
    ];
});