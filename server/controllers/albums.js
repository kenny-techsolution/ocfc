var Album = require('mongoose').model('Album'),
	deleteKey = require('key-del'),
	commFunc = require('../utilities/commonFunctions');

var handleError= function(err){
	var modError = err;
	return modError;
};

//Post
exports.createAlbum = function (req, res) {
	var album = req.body;
	album.name=album.name;
	album.createdOn=new Date();
	album.imageIds='546d0d4cd0b5cd7d27a5da57';
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
	Album.findOne({_id: req.params.id}).exec(function (err, album) {
		if (err) {
			err = handleError(err);
			return res.json(err);
		}
		return res.json({status:"success",album:album});
	});
};

//TODO
exports.queryAlbums= function (req, res) {
	res.end();
};
//TODO Put
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
//TODO
exports.deleteAlbum= function (req, res) {
	res.end();
};
//TODO
exports.createImage= function (req, res) {
	res.end();
};
//TODO
exports.queryImages= function (req, res) {
	res.end();
};
//TODO
exports.getImage= function (req, res) {
	res.end();
};
//TODO
exports.updateImage= function (req, res) {
	res.end();
};
//TODO
exports.deleteImage= function (req, res) {
	res.end();
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