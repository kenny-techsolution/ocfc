/*************************************************************************************
 This file creates a new Directive called mvUser
 which takes in $resource directive

 Object UserResource is created which check Mongo db records for 'admin'
 ***************************************************************************************/

angular.module('app').factory('mvUser',function($resource){
    //rest api standard, for GET, if id is specified, it will grab specific user by id
    var UserResource=$resource('/api/users/:id',{_id: "@id"},{
        update: {method:'PUT',isArray:false}
    });

    UserResource.prototype.isAdmin=function(){
        //check role column to check if 'admin' value exist
        return this.roles && this.roles.indexOf('admin')>-1;
    }
    return UserResource;
});

