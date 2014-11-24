var Folder = require('mongoose').model('Folder');
var mongoose = require('mongoose'),
	deleteKey = require('key-del'),
	commFunc = require('../utilities/commonFunctions'),
	deleteKey = require('key-del'),
	_=require('lodash');//Library for Array

//Post
exports.createFolder=function (req, res) {
	var folder = req.body;
	folder.name=folder.name;
	folder.description=folder.description;

	var folder = new Folder(folder);
	folder.save(function (err) {
		if (err) {
			err = handleError(err);
			return res.json(err);
		}
		return res.json({status:"success",folder:folder});
	})
};
//Get
exports.getFolder=function (req, res) {
	Folder.findOne({_id:req.params.id}).exec(function(err,folder){
		if (err) {
			err = commFunc.handleError(err);
			return res.json(err);
		}
		return res.json({status:"success",folder:folder});
	});
};
//Get
exports.queryFolders=function (req, res) {
	var validKeys = ["name","description"];
	var actualKeys = _.keys(req.query);
	var filteredKeys = _.intersection(validKeys, actualKeys);
	var condition = {};
	_.forEach(filteredKeys, function(key){
		//Grab value for each key
		condition[key] = req.query[key];
	})
	Folder.find(condition).exec(function (err, queryFolders) {
		if (err) {
			err = commFunc.handleError(err);
			return res.json(err);
		}
		return res.json({status:"success",queryFolders:queryFolders});
	});
};
//TODO
exports.updateFolder=function (req, res) {
	var folder=req.body;

	folder = toLowerCase(folder);
	folder = deleteKey(folder, ['createdOn', 'createdOn','fileIds']);

	var keys = _.keys(album);

	if(keys.length==1 && keys[0]=='_id'){
		return res.json({});
	}

	Album.update({ _id:req.params.id }, album, { multi: true }, function (err, numberAffected, raw) {
		if (err) {
			err = handleError(err);
			return res.json(err);
		}
		return res.json({status:"success",raw:raw});
	});
};
//TODO
exports.deleteFolder=function (req, res) {
	res.end();
};
//TODO
exports.createFile=function (req, res) {
	res.end();
};
//TODO
exports.queryFiles=function (req, res) {
	res.end();
};