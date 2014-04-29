/*************************************************************************************
 This file creates a new Resource called mvCachedCourses

 Resource is something that can be re-used across controller
 ***************************************************************************************/
angular.module('app').factory('mvCachedCourses',function(mvCourse){
    var courseList;

    return{
        query:function(){
            if(!courseList){
                courseList=mvCourse.query();
            }
            return courseList;
        }
    }
})