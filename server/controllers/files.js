var File = require('mongoose').model('File'),
	Folder = require('mongoose').model('Folder'),
	mongoose = require('mongoose'),
	deleteKey = require('key-del'),
	_=require('lodash'),
	html_strip=require('htmlstrip-native');//Library for Array;

var handleError= function(err){
	var modError = err;
	return modError;
};


var checkRequiredFields = function (obj, fields) {
	var errors = []
	_.forEach(fields, function(key){
		if(!_.has(obj, key)){
			errors.push(key + " is required field.");
		}
		return errors;
	});
};

var htmlStripOptions = {
	include_script : false,
	include_style : false,
	compact_whitespace : true
};


//Get
exports.getFile=function (req, res) {
	File.find({_id:req.params.file_id}).exec(function(err,getFile){
		if (err) {
			err = commFunc.handleError(err);
			return res.json(err);
		}
		return res.json({status:"success",getFile:getFile});
	});
};

//Put
exports.updateFile=function (req, res) {
	var file=req.body;
	file.name=file.name;
	file.path=file.path;
	file = deleteKey(file, ['createdOn','updatedOn']);
	var keys = _.keys(file);
	if(keys.length==1 && keys[0]=='_id'){
		return res.json({});
	}

	File.update({ _id:req.params.file_id}, file, { multi: true }, function (err, numberAffected, raw) {
		if (err) {
			err = handleError(err);
			return res.json(err);
		}
		console.log('test file');
		console.log(file);
		return res.json({status:"success",raw:raw});
	});
};
//Delete
exports.deleteFile=function (req, res) {
	File.count({_id:req.params.file_id},function (err, count) {
		if (err) {
			err = commFunc.handleError(err);
			return res.json(err);
		}
		console.log('chk count');
		console.log(count);

		if (count>0){
			File.remove({_id:req.params.file_id},function (err) {
				if (err) {
					err = commFunc.handleError(err);
					return res.json(err);
				}
				return res.json({status: "successfully removed from File"});
			})
		}
	});
};
//Post
exports.addCommentToFile=function (req, res) {
	File.findById(req.params.file_id).exec(function(err, file){
		if (err) {
			err = handleError(err);
			return res.json(err);
		}

		var comment = req.body;
		var errors = checkRequiredFields(comment, ['comment']);

		if(errors>0) return res.json(errors);

		//TODO html_strip is cutting off very last letter in comment
		comment = {
			userId:	req.user._id,
			comment: html_strip.html_strip(comment.comment, htmlStripOptions),
			profileImg: req.user.profileImg,
			firstName: req.user.firstName,
			lastName: req.user.lastName
		};
		file.comments.push(comment);
		file.save(function(){
			if (err) {
				err = handleError(err);
				return res.json(err);
			}
			return res.json({status: "success",file:file});
		});
	});
};
//Put
exports.updateCommentFromFile=function (req, res) {
	var commentObj=req.body;
	console.log('chk commentObj');
	console.log(commentObj);

	commentObj = deleteKey(commentObj, ['userId', 'profileImg','firstName','lastName']);
	var keys = _.keys(commentObj);

	if(keys.length==1 && keys[0]=='_id'){
		return res.json({});
	}

	File.findOne({ _id:req.params.file_id }, function (err, file) {
		if (err) {
			err = handleError(err);
			return res.json(err);
		}
		var comment = file.comments.id(req.params.comment_id);
		comment['comment'] = commentObj.comment;

		console.log('chk commentObj.comment');
		console.log(commentObj.comment);

		file.save(function(err){
			if (err) {
				err = handleError(err);
				return res.json(err);
			}
			return res.json({status:"success",comment:comment});
		});
	});
};
//Delete
exports.deleteCommentFromFile=function (req, res) {
	File.findOne({ _id:req.params.file_id }, function (err, file) {
		if (err) {
			err = handleError(err);
			return res.json(err);
		}
		var comment = file.comments.id(req.params.comment_id).remove();

		file.save(function(err){
			if (err) {
				err = handleError(err);
				return res.json(err);
			}
			return res.json({status:"success",comment:comment});
		});
	});
};
