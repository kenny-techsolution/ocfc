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

//Equates to, fellowshipId: req.params.fellowship_id
exports.reqParamFellowshipId=function(req){
	return req.params.fellowship_id
};

//Equates to, fellowshipId: req.params.fellowship_id
exports.reqParamId=function(req,idName){
	if(idName=='user_id'){
		return req.params.user_id
	}else if (idName=='album_id'){
		return req.params.album_id
	}else if (idName=='calendar_id'){
		return req.params.calendar_id
	}else{
		return req.params.id
	}
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
};


exports.htmlStripOptions = {
	include_script : false,
	include_style : false
};