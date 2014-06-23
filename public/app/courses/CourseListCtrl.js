/*************************************************************************************
 This file creates a new Controller called CourseSvcListCtrl

 takes $scope, CourseSvc.js directives.

 Stores CourseSvc.query() into object, courses

 CourseSvc:   Takes $resource directive and stores data into mongoose
 ***************************************************************************************/

angular.module('app').controller('CourseSvcListCtrl',function($scope, CachedCoursesSvc){
    $scope.courses=CachedCoursesSvc.query();

    $scope.sortOptions=[{value:"title", text:"Sort by Title"},
                        {value:"published",text:"Sort by Publish Date"}]

    //auto sort by title
    $scope.sortOrder=$scope.sortOptions[0].value;
});
