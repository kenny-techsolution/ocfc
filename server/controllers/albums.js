var Album = require('mongoose').model('Album'),
	Image = require('mongoose').model('Image'),
	Fellowship = require('mongoose').model('Fellowship'),
	FellowshipUser = require('mongoose').model('FellowshipUser'),
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

//Post
exports.createAlbum = function (req, res) {
	var album = req.body;
	album.name=album.name;
	album.createdOn=new Date();
	album.createdBy=req.user.id;

	var album = new Album(album);
	album.save(function (err) {
		if (err) {
			err = handleError(err);
			return res.json(err);
		}
		return res.json({status:"success",album:album});
	})
};
//Get
exports.getAlbum= function (req, res) {
	//Album id must associate to your fellowship
	//match by album id against fellowship
	//grab fellowship_id, chk against fellowshipUser and chk if it matches session user's fellowship_id
	Album.findOne({_id:req.params.id}).exec(function(err,album){
		if (err) {
			err = commFunc.handleError(err);
			return res.json(err);
		}
		Fellowship.find({}).where('albumIds',{$elemMatch:{$in: [album._id]}}).exec(function(err,fellowship) {
			console.log(err);
			if (err) {
				err = commFunc.handleError(err);
				return res.json(err);
			}
			FellowshipUser.findOne({fellowshipId:fellowship._id,userId:req.user.id}).exec(function(err,fellowshipUser){
				if (err) {
					err = commFunc.handleError(err);
					return res.json(err);
				}
				return res.json({status:"success",album:album});
			})
		});
	})
};

//Put
exports.updateAlbum= function (req, res) {
	var album=req.body;

	album = toLowerCase(album);
	album = deleteKey(album, ['createdOn', 'imageIds']);

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

//Delete
exports.deleteAlbum= function (req, res) {
	Album.count({createdBy:req.user._id,_id:req.params.id},function (err, count) {
		if (err) {
			err = commFunc.handleError(err);
			return res.json(err);
		}
		console.log('chk count');
		console.log(count);

		if (count>0){
			Album.remove({_id:req.params.id},function (err) {
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
exports.createImage= function (req, res) {
	//grab album path from Cloudinary
	var path=req.body.path;

	var image=new Image();
	image.path=path;

	//TODO make sure user can post to this album
	image.save(function(err){
		if(err){
			err=handError(err);
			return res.json(err);
		}
		Album.findById(req.params.album_id).exec(function(err, album){
			album.imageIds.push(image._id);
			album.save(function(err){
				if(err) {
					err = handError(err);
					return res.json(err);
				}
				return res.json({status:'success',album:album})
			});
		});
	});
};
//Get
exports.queryImages= function (req, res) {
	var validKeys = ["name","description"];
	var actualKeys = _.keys(req.query);
	var filteredKeys = _.intersection(validKeys, actualKeys);
	var condition = {};
	_.forEach(filteredKeys, function(key){
		//Grab value for each key
		condition[key] = req.query[key];
	})
	Album.find(condition).exec(function (err, queryAlbumImgs) {
		if (err) {
			err = commFunc.handleError(err);
			return res.json(err);
		}
		return res.json({status:"success",queryAlbumImgs: _.pluck(queryAlbumImgs,'imageIds')});
	});
};
