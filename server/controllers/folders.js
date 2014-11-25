var Folder = require('mongoose').model('Folder'),
	File = require('mongoose').model('File'),
	mongoose = require('mongoose'),
	deleteKey = require('key-del'),
	commFunc = require('../utilities/commonFunctions'),
	deleteKey = require('key-del'),
	_=require('lodash');//Library for Array

var handleError= function(err){
	var modError = err;
	return modError;
};

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
//Put
exports.updateFolder=function (req, res) {
	var folder=req.body;
	folder = deleteKey(folder, ['createdOn', 'createdOn','fileIds']);

	var keys = _.keys(folder);

	if(keys.length==1 && keys[0]=='_id'){
		return res.json({});
	}
	Folder.update({_id:req.params.id }, folder, { multi: true }, function (err, numberAffected, raw) {
		if (err) {
			err = handleError(err);
			return res.json(err);
		}
		return res.json({status:"success",raw:raw});
	});
};
//Delete
exports.deleteFolder=function (req, res) {
	console.log('chk session');
	console.log(req.user);
	Folder.count({createdBy:req.user._id,_id:req.params.id},function (err, count) {
		if (err) {
			err = commFunc.handleError(err);
			return res.json(err);
		}
		console.log('chk count');
		console.log(count);

		if (count>0){
			Folder.remove({_id:req.params.id},function (err) {
				if (err) {
					err = commFunc.handleError(err);
					return res.json(err);
				}
				return res.json({status: "successfully removed from Album"});
			})
		}
	});
};
//Post
exports.createFile=function (req, res) {
	var path=req.body.path;

	var file=new File();
	file.path=path;
	file.name=req.body.name;

	//TODO make sure user can post to this album
	file.save(function(err){
		console.log("got here");
		console.log(err);
		if(err){
			err=handleError(err);
			return res.json(err);
		}
		Folder.findById(req.params.folder_id).exec(function(err, folder){
			console.log('chk folder');
			console.log(folder);
			if(err){
				err=handleError(err);
				return res.json(err);
			}
			folder.fileIds.push(file._id);
			folder.save(function(err){
				if(err) {
					err = handError(err);
					return res.json(err);
				}
				return res.json({status:'success',file:file})
			});
		});
	});
};


//Get
exports.queryFiles=function (req, res) {
	var validKeys = ["path"];
	var actualKeys = _.keys(req.query);
	var filteredKeys = _.intersection(validKeys, actualKeys);
	var condition = {};
	_.forEach(filteredKeys, function(key){
		//Grab value for each key
		condition[key] = req.query[key];
	})
	Folder.find(condition).exec(function (err, queryFolderFiles) {
		if (err) {
			err = commFunc.handleError(err);
			return res.json(err);
		}
		return res.json({status:"success",queryFolderFiles: _.pluck(queryFolderFiles,'fileIds')});
	});
};