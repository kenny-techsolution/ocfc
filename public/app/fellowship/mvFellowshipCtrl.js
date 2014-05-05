/*******************************************************************************
 ******************************************************************************/
angular.module('app').controller('mvFellowshipCtrl', function($scope, $resource, mvFellowship,$routeParams) {
    $scope.about;
    $scope.name;
    var fellow = mvFellowship.get(
        {
            _id: $routeParams.id}
        //below parameter is a callback, 1st parameter must be met
        ,function() {
            $scope.about=fellow.about;
            $scope.name = fellow.name;
        }

    );
});