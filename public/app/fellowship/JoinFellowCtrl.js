/*******************************************************************************
 * This file creates a new Controller called JoinFellowCtrl. The code stores
 * all records into JoinFellowCtrl controller. The controller checks zipcode
 * input text of no more than 5 length chars creates a objects called:
 * updateFellowList: once the condition is met, $http directive will retrieve
 * the data from mongodb of fellowships collection associatedFellowships: get or
 * read all the associated fellowships for the current user. selectedFellowship:
 * set as null joinFellowship: add userId and fellowId onto fellowMems
 * collection fellowMemResource: Takes rest /api/fellowMems/:id using GET method
 * to grab records for specific user
 ******************************************************************************/
angular.module('app').controller('JoinFellowCtrl', function($scope, $http, IdentitySvc, FellowMemSvc) {

});