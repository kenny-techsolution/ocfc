angular.module('app').factory('mvSetup',function($http,mvIdentity){
    return{
        init: function(initObj){
            console.log("test mvIdentity.currentUser");
            if (mvIdentity.currentUser){
                var params = {
                    url: '/api/init',
                    method: 'GET',
                    params : {userId: mvIdentity.currentUser._id}
                };
                $http(params).success(function(data) {
                    console.log("Display data from mvSetup");
                    console.log(data);
                    initObj.myFellowships=data.myFellowships;
                });
            }
        }
    }
});



//
//$scope.getMyApprvFellows=function(){
//    var myApprvFellows= [];
//    angular.forEach($scope.associatedFellowships, function(myFellowObj, key) {
//        if (myFellowObj.status=='Approved'){
//            myApprvFellows.push(myFellowObj);
//        }
//    });
//    $scope.myApprvFellows=myApprvFellows;
//
//};