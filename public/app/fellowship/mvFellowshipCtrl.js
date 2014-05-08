/*******************************************************************************
 ******************************************************************************/
angular.module('app').controller('mvFellowshipCtrl', function($scope, mvFellowship,$routeParams) {
    $scope.about;
    $scope.name;
    $scope.id;
    var fellow = mvFellowship.get(
        {
            _id: $routeParams.id}
        //below parameter is a callback, 1st parameter must be met
        ,function() {
            $scope.about=fellow.about;
            $scope.name = fellow.name;
            $scope.id = fellow._id;
        }

    );
});