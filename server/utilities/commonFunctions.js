/*************************************************************************************
This file creates a new utility called commonFunction.js which will store commonly
used functions
 ***************************************************************************************/
var _=require('lodash'); //Library for Array;

//Common functions are defined below
exports.cl = function (title, value) {
	console.log(title);
	console.log(value);
};

exports.toProperCase = function (str) {
	return str.replace(/\w\S*/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
};

exports.toLowerCase=function(obj){
	for (var i in obj) {
		if (i!=="imageIds" || i!=="createdOn"||i!=="profileImg"||i!=="albumIds"
			|| i!=="fileIds" || i!=="calendarIds"){
			console.log(obj[i]);
			obj[i] = obj[i].toLowerCase();
		}
	}
	return obj;
};

//Equates to, userId: req.user._id
exports.reqSessionUserId=function(req){
	return req.user._id
};

exports.removeInvalidKeys = function(obj, validKeyArray){
	var actualKeys = _.keys(obj);
	var filteredKeys = _.intersection(validKeyArray, actualKeys);
	var newObj = {};
	_.forEach(filteredKeys, function(key){
		//Grab value for each key
		//created newObj and insert valid key values onto it
		newObj[key] = obj[key];
	})
	return newObj;

};

exports.updateInstanceWithObject=function(obj,instanceObj){
	_.forEach(obj, function(key){
		instanceObj[key] = obj[key];
	});
	return instanceObj;
};

exports.htmlStripOptions = {
	include_script : false,
	include_style : false
};
exports.isChurchAdmin = function(sessionUser, churchId) {
	var user = sessionUser.toObject();
	var permissions = [];
	_.forEach(user["churches"], function(church){
		if(church.churchId.toString() === churchId && church.role.toString() === "admin"){
			permissions.push(church);
		}
	});
	var resultBoolean = (permissions.length == 0)? false: true;
	return resultBoolean;
};

exports.isChurchMember = function(sessionUser, churchId) {
	var user = sessionUser.toObject();
	var permissions = [];
	_.forEach(user["churches"], function(church){
		if(church.churchId.toString() === churchId && (church.role.toString() === "member"||church.role.toString() === "admin")){
			permissions.push(church);
		}
	});
	var resultBoolean = (permissions.length == 0)? false: true;
	return resultBoolean;
};

exports.checkRequiredFields = function (obj, fields) {
	var errors = []
	_.forEach(fields, function(key){
		if(!_.has(obj, key)){
			errors.push(key + " is required field.");
		}
		return errors;
	});
};
