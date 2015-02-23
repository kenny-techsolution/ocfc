var Album = require('mongoose').model('Album'),
	Image = require('mongoose').model('Image'),
	User = require('mongoose').model('User'),
	Fellowship = require('mongoose').model('Fellowship'),
	FellowshipUser = require('mongoose').model('FellowshipUser'),
	deleteKey = require('key-del'),
	commFunc = require('../utilities/commonFunctions'),
	async = require('async'),
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
	Album.findOne({_id: req.params.id}).populate('imageIds').exec(function (err, album) {
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
	console.log('server queryAlbum has been called');
	console.log('chk req.query.fellowshipId');
	console.log(req.query.fellowshipId);

	Fellowship.findOne({_id:req.query.fellowshipId}).exec(function(err,fellowship){
		if (err) return res.json(err);
		console.log('chk fellowship');
		console.log(fellowship);
		console.log('chk fellowship.albumIds.length');
		console.log(fellowship.albumIds.length);
		var albums=[];
		if (fellowship.albumIds.length > 0) {
			console.log('length condition pass');
			async.forEachLimit(fellowship.albumIds, 3, function (albumId, callback) {
				console.log('chk albumId');
				console.log(albumId);
				Album.findOne({_id:albumId}).populate('imageIds createdBy').exec(function (err,album) {
					console.log('chk albums before being pushed');
					console.log(album);
					if (err) return callback(err)
					albums.push(album);
					console.log('chk albums being pushed');
					console.log(album);
					callback();
				});
			}, function (err) {
				if (err) return res.json(err);
				console.log('chk albums array');
				console.log(albums);
				return res.json(albums);
			});
		} else {
			return res.json ({message: 'no albumIds found', album: albums});
		}
	});


};


//Put - Round1
exports.updateAlbum = function (req, res) {
	console.log('server updateAlbum has been called');
	console.log('chk req.params.id');
	console.log(req.params.id);
	console.log('chk req.body');
	console.log(req.body);
	var album = commFunc.removeInvalidKeys(req.body, ['name', 'description','location']);
	Album.update({ _id: req.params.id }, album, { multi: true }, function (err, numberAffected, raw) {
		if (err) return res.json(err);
		console.log('updateAlbum has completed');
		console.log('chk album');
		console.log(album);
		return res.json({status: "success", raw: raw});
	});
};

//Delete - Round1
exports.deleteAlbum = function (req, res) {
	console.log('server deleteAlbum has been called');
	Album.findOneAndRemove({createdBy: commFunc.reqSessionUserId(req), _id: req.params.id}, function (err) {
		if (err) return res.json(err);
		console.log('chk req.params.id or album_id');
		console.log(req.params.id);

		//also delete album from Fellowship table
		Fellowship.findOne({albumIds:req.params.id}).exec(function (err, fellowship) {
			console.log('look to remove album id from Fellowship tbl');
			console.log(fellowship);

			for(var i=0;i<fellowship.albumIds.length;i++){
				console.log('chk fellowship.albumIds[i]');
				console.log(fellowship.albumIds[i]);
				console.log('chk req.params.id');
				console.log(req.params.id);

				if (String(fellowship.albumIds[i])==req.params.id){
					console.log('getting ready to splice');
					fellowship.albumIds.splice(i,1);
				}
			}
			fellowship.save(function (err) {
				console.log('fellowship.save has been called');
				if (err) return res.json(err);
				console.log('chk fellowship after remove of albumId '+req.params.id);
				console.log(fellowship);
				return res.json(fellowship);
			});
		});

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
	console.log('chk req.params');
	console.log(req.params);

	//var validKeys = commFunc.removeInvalidKeys(req.params, ['album_id','name', 'description']);
	Album.findOne({_id:req.params.album_id}).populate('imageIds').exec(function (err, queryAlbumImgs) {
		if (err) return res.json(err);
		//console.log('chk queryAlbumImgs');
		//console.log(queryAlbumImgs);

		return res.json(queryAlbumImgs.imageIds);
	});
};
