var Album = require('mongoose').model('Album'),
	Image = require('mongoose').model('Image'),
	Fellowship = require('mongoose').model('Fellowship'),
	FellowshipUser = require('mongoose').model('FellowshipUser'),
	deleteKey = require('key-del'),
	commFunc = require('../utilities/commonFunctions'),
	_ = require('lodash');//Library for Array

//Post - Round1
exports.createAlbum = function (req, res) {
	console.log('server createAlbum has been called');
	console.log('chk req.body');
	console.log(req.body);

	console.log('chk req.user');
	console.log(req.user);

	var albumObj = req.body;
	albumObj = {
		name: albumObj.name,
		description: albumObj.description,
		location: albumObj.location,
		createdOn: new Date(),
		createdBy: req.user._id
	}
	var album = new Album(albumObj);
	album.save(function (err, album) {
		if (err) return res.json(err);
		console.log('chk album obj');
		console.log(album);

		console.log('chk req.body.fellowshipId');
		console.log(req.body.fellowshipId);

		//Added 02.04.2015 Need to update album ID onto Fellowship
		Fellowship.findById(req.body.fellowshipId).exec(function (err, fellowship) {
			console.log('chk fellowship obj');
			console.log(fellowship);
			console.log('server Fellowship.findById has been called');
			fellowship.albumIds.push(album._id);
			fellowship.save(function (err) {
				console.log('fellowship.save has been called');
				if (err) return res.json(err);
				return res.json(album);
			});
		});
	})
};

//Get - Round1
exports.getAlbum = function (req, res) {
	//Album id must associate to your fellowship
	//match by album id against fellowship
	//grab fellowship_id, chk against fellowshipUser and chk if it matches session user's fellowship_id
	Album.findOne({_id: req.params.id}).exec(function (err, album) {
		if (err) return res.json(err);
		Fellowship.find({}).where('albumIds', {$elemMatch: {$in: [album._id]}}).exec(function (err, fellowship) {
			if (err) return res.json(err);
			FellowshipUser.findOne({fellowshipId: req.params.fellowship_id, userId: commFunc.reqSessionUserId(req)}).exec(function (err, fellowshipUser) {
				if (err) return res.json(err);
				return res.json({status: "success", album: album});
			})
		});
	})
};

//Added queryAlbum on 02.04.2015
exports.queryAlbum=function(req, res){
	//Lookup albumIds for a Fellowship
	Fellowship.findOne({fellowshipId:req.body.fellowshipId}).exec(function(err,fellowship){
		if (err) return res.json(err);
		console.log('chk fellowship');
		console.log(fellowship);
		for(var i=0;i<fellowship.albumIds.length;i++){

			Album.find({_id:fellowship.albumIds[i]._id}).populate('imageIds').exec(function (err, queryAlbum) {
				if (err) return res.json(err);
				return res.json(queryAlbum);
			});
		}

	});


};


//Put - Round1
exports.updateAlbum = function (req, res) {
	var album = commFunc.removeInvalidKeys(req.body, ['name', 'description']);
	Album.update({ _id: req.params.id }, album, { multi: true }, function (err, numberAffected, raw) {
		if (err) return res.json(err);
		return res.json({status: "success", raw: raw});
	});
};

//Delete - Round1
exports.deleteAlbum = function (req, res) {
	Album.findOneAndRemove({createdBy: commFunc.reqSessionUserId(req), _id: req.params.id}, function (err) {
		if (err) return res.json(err);
		return res.json({status: "successfully removed from Album"});
	});
};

//Post - Round1
exports.createImage = function (req, res) {
	console.log('server createImage has been called');
	//grab album path from Cloudinary
	console.log('chk req.body');
	console.log(req.body);

	var path = req.body.path;
	var image = new Image();
	image.path = path;
	image.caption = req.body.caption;

	console.log('chk image before save');
	console.log(image);

	//TODO make sure user can post to this album
	image.save(function (err) {
		console.log('server image.save has been called');
		if (err) return res.json(err);

		console.log('chk req.params.album_id');
		console.log(req.params.album_id);

		Album.findById(req.params.album_id).exec(function (err, album) {
			console.log('server Album.findById has been called');
			album.imageIds.push(image._id);
			album.save(function (err) {
				console.log('album.save has been called');
				if (err) return res.json(err);
				return res.json(image);
			});
		});

	});
};
//Get - Round1
exports.queryImages = function (req, res) {
	console.log('server queryImages has been called');
	console.log('chk req.query');
	console.log(req.query);

	var validKeys = commFunc.removeInvalidKeys(req.query, ['name', 'description']);
	Album.find(validKeys).exec(function (err, queryAlbumImgs) {
		if (err) return res.json(err);
		return res.json(_.pluck(queryAlbumImgs, 'imageIds'));
	});
};
