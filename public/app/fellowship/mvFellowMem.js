
angular.module('app').factory('mvFellowMem',function($resource){
    //rest api standard, for GET, if id is specified, it will grab specific user by id
    var fellowMemResource=$resource('/api/fellowMems/:id',{_id: "@id"},{
        get :{method:'GET', isArray:true}
    });

    return fellowMemResource;
});

