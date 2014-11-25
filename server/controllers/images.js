var Image = require('mongoose').model('Image'),
	Album = require('mongoose').model('Album'),
	mongoose = require('mongoose'),
	deleteKey = require('key-del'),
	commFunc = require('../utilities/commonFunctions'),
	deleteKey = require('key-del'),
	_=require('lodash'),
	html_strip=require('htmlstrip-native');//Library for Array

var handleError= function(err){
	var modError = err;
	return modError;
};

var toLowerCase=function(obj){
	for (var i in obj) {
		if (i!=="imageIds" || i!=="createdOn"){
			console.log(obj[i]);
			obj[i] = obj[i].toLowerCase();
		}
	}
	return obj;
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
exports.getImage= function (req, res) {
	Image.find({_id:req.params.image_id}).exec(function(err,getImage){
		if (err) {
			err = commFunc.handleError(err);
			return res.json(err);
		}
		return res.json({status:"success",getImage:getImage});
	});
};

//Put
exports.updateImage= function (req, res) {
	var image=req.body;

	image = toLowerCase(image);
	image = deleteKey(image, ['createdOn']);

	var keys = _.keys(image);

	if(keys.length==1 && keys[0]=='_id'){
		return res.json({});
	}

	Image.update({ _id:req.params.image_id }, image, { multi: true }, function (err, numberAffected, raw) {
		if (err) {
			err = handleError(err);
			return res.json(err);
		}
		return res.json({status:"success",raw:raw});
	});
};
//Delete
exports.deleteImage= function (req, res) {
	Image.count({_id:req.params.image_id},function (err, count) {
		if (err) {
			err = commFunc.handleError(err);
			return res.json(err);
		}
		console.log('chk count');
		console.log(count);

		if (count>0){
			Image.remove({_id:req.params.image_id},function (err) {
				if (err) {
					err = commFunc.handleError(err);
					return res.json(err);
				}
				return res.json({status: "successfully removed from Image"});
			})
		}
	});
};

//Post
exports.addCommentToImage= function (req, res) {
	Image.findById(req.params.image_id).exec(function(err, image){
		if (err) {
			err = handleError(err);
			return res.json(err);
		}

		var comment = req.body;
		errors = checkRequiredFields(comment, ['comment']);
		if(errors>0) return res.json(errors);

		//TODO html_strip is cutting off very last letter in comment
		comment = {
			userId:	req.user._id,
			comment: html_strip.html_strip(comment.comment, htmlStripOptions),
			profileImg: req.user.profileImg,
			firstName: req.user.firstName,
			lastName: req.user.lastName
		};
		image.comments.push(comment);
		image.save(function(){
			if (err) {
				err = handleError(err);
				return res.json(err);
			}
			return res.json({status: "success",image:image});
		});
	});
};

//Put
exports.updateCommentFromImage= function (req, res) {
	var commentObj=req.body;

	commentObj = toLowerCase(commentObj);
	commentObj = deleteKey(commentObj, ['userId', 'profileImg','firstName','lastName']);

	var keys = _.keys(commentObj);

	if(keys.length==1 && keys[0]=='_id'){
		return res.json({});
	}

	Image.findOne({ _id:req.params.image_id }, function (err, image) {
		if (err) {
			err = handleError(err);
			return res.json(err);
		}
		var comment = image.comments.id(req.params.comment_id);
		comment.comment = commentObj.comment;

		console.log('chk comment');
		console.log(comment);

		image.save(function(err){
			if (err) {
				err = handleError(err);
				return res.json(err);
			}
			return res.json({status:"success",comment:comment});
		});
	});
};
//Delete
exports.deleteCommentFromImage= function (req, res) {
	Image.findOne({ _id:req.params.image_id }, function (err, image) {
		if (err) {
			err = handleError(err);
			return res.json(err);
		}
		var comment = image.comments.id(req.params.comment_id).remove();

		image.save(function(err){
			if (err) {
				err = handleError(err);
				return res.json(err);
			}
			return res.json({status:"success",comment:comment});
		});
	});
};