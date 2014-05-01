//This code stores all records into mvJoinFellowCtrl controller
//the controller checks zipcode input text of no more than 5 length chars
//once the condition is met, $http directive will retrieve the data from mongodb of fellowships collection
angular.module('app').controller('mvJoinFellowCtrl',function($scope,$http){
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