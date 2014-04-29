/*************************************************************************************
 This file creates a new Controller called mvCourseListCtrl

 takes $scope, mvCourse.js directives.

 Stores mvCourse.query() into object, courses

 mvCourse:   Takes $resource directive and stores data into mongoose
 ***************************************************************************************/

angular.module('app').controller('mvCourseListCtrl',function($scope, mvCachedCourses){
    $scope.courses=mvCachedCourses.query();

    $scope.sortOptions=[{value:"title", text:"Sort by Title"},
                        {value:"published",text:"Sort by Publish Date"}]

    //auto sort by title
    $scope.sortOrder=$scope.sortOptions[0].value;
});
