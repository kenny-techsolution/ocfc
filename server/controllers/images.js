var Image = require('mongoose').model('Image'),
	Album = require('mongoose').model('Album'),
	mongoose = require('mongoose'),
	deleteKey = require('key-del'),
	commFunc = require('../utilities/commonFunctions'),
	deleteKey = require('key-del'),
	_=require('lodash');//Library for Array

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


//TODO
exports.addCommentToImage= function (req, res) {
	res.end();
};
//TODO
exports.getCommentForImage= function (req, res) {
	res.end();
};
//TODO
exports.updateCommentFromImage= function (req, res) {
	res.end();
};
//TODO
exports.deleteCommentFromImage= function (req, res) {
	res.end();
};