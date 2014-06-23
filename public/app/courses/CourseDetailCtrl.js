/*************************************************************************************
 This file creates a new Directive called CourseSvcDetailCtrl

 Utilized the cached data
 ***************************************************************************************/

angular.module('app').controller('CourseSvcDetailCtrl',function($scope,CachedCoursesSvc,$routeParams){
    //.$promise represent AJAX connection
    //.then means perform subsequent function when AJAX is complete
    //collection is the data coming back from server
    CachedCoursesSvc.query().$promise.then(function(collection){
        collection.forEach(function(course){
        //For every item within collection is called course.  It performs below
        //if course._id matches to the current url link (../courses/id)
        if(course._id===$routeParams.id){
            $scope.course=course;
        }});
    });
});