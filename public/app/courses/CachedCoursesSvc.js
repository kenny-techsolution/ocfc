/*************************************************************************************
 This file creates a new Resource called CachedCoursesSvc

 Resource is something that can be re-used across controller
 ***************************************************************************************/
angular.module('app').factory('CachedCoursesSvc',function(CourseSvc){
    var courseList;

    return{
        query:function(){
            if(!courseList){
                courseList=CourseSvc.query();
            }
            return courseList;
        }
    }
})