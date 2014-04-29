/*************************************************************************************
This file creates a new Directive called mvAuth
which will authenticate username & password info.

Its takes in 4 injections ($http,mvIdentity, $q and mvUser)

Creates 2 objects (authenticateUser & logoutUser)
    authenticateUser:  A function that injects username & password.
                       It uses $http directive to check if users exist.
                       If true then code will extend to mvUser.js

    createUser:         A function that injects newUserData object which contains
                       password, username, firstName and Lastname into mvUser.js
                       called user.
                       user object is then set as mvIdentity.currentUser

    update currentUser: Clones data from mvIdentity.currentUser and extending from newUserData

    logoutUser:        Uses $http directive to check if user has logged out

    authorizedCurrentUserForRoute:  Checks if isAuthorized(role) is true in
                                     mvIdentity.js

    authorizedAuthenticatedUserForRoute: Check if isAuthenticated is true in mvIdentity.js
***************************************************************************************/

angular.module('app').factory('mvAuth',function($http,mvIdentity,$q,mvUser){
    return{
        authenticateUser: function(username,password){
                            var dfd=$q.defer();
                            $http.post('/login',{username:username, password:password}).then(function(response){
                                        if(response.data.success){
                                            var user=new mvUser();
                                            angular.extend(user,response.data.user);
                                            mvIdentity.currentUser=user;
                                            dfd.resolve(true);
                                        } else{
                                            dfd.resolve(false);

                                        }
                                    });
                                    return dfd.promise;
        },
        createUser: function(newUserData){
                            var newUser= new mvUser(newUserData);
                            var dfd=$q.defer();

                            newUser.$save().then(function(){
                                mvIdentity.currentUser=newUser;
                                dfd.resolve();
                            }, function(response){
                                dfd.reject(response.data.reason);
                            });
                            return dfd.promise;
        },
        updateCurrentUser: function(newUserData){
            var dfd=$q.defer();

            var clone=angular.copy(mvIdentity.currentUser);
            angular.extend(clone,newUserData);
            clone.$update().then(function(){
                mvIdentity.currentUser=clone;
                dfd.resolve();
                }, function(response){
                    dfd.reject(response.data.reason);
            });
            return dfd.promise;
        },
        logoutUser: function(){
                            var dfd=$q.defer();
                            $http.post('/logout',{logout:true}).then(function(){
                                mvIdentity.currentUser=undefined;
                                dfd.resolve();
                                });
                              return dfd.promise;
        },
        authorizedCurrentUserForRoute: function(role){
                                console.log("test mvIdentity.isAuthorized(role)");
                                console.log(role);
                            if(mvIdentity.isAuthorized(role)){
                                                return true;
                                                    }else{
                                                    return $q.reject('not authorized');
                                                }
        },
        authorizedAuthenticatedUserForRoute: function(){
                                    console.log("test mvIdentity.isAuthorized()");
                                    console.log(mvIdentity.isAuthenticated());
                                    if(mvIdentity.isAuthenticated()){
                                                        return true;
                                                            }else{
                                                            return $q.reject('not authenticated');
                                                        }
                }
    }
});