/*************************************************************************************
 This file creates a new Resource called CourseSvc

 takes $resource directive and stores data into mongoose

 Update data in the server
 ***************************************************************************************/
angular.module('app').factory('CourseSvc',function($resource){
    var CourseResource=$resource('/api/courses/:_id',{_id:"@id"},{
        update:{method:'PUT', isArray:false}
    });
    return CourseResource;
});

