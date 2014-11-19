/*************************************************************************************
 4.29.2014, create getFellowByZip object that grabs data from mongodb by zipcode
 ***************************************************************************************/

var Fellow = require('mongoose').model('Fellowship'),
	commFunc = require('../utilities/commonFunctions');

//TODO
exports.createFellowship=function (req, res) {
	res.end();
};
//TODO
exports.updateFellowshipById=function (req, res) {
	res.end();
};
//TODO
exports.getFellowshipById=function (req, res) {
	res.end();
};
//TODO
exports.deleteFellowshipById=function (req, res) {
	res.end();
};
//TODO
exports.getFellowshipsByUserId=function (req, res) {
	res.end();
};
//TODO
exports.addUserToFellowship=function (req, res) {
	res.end();
};
//TODO
exports.getUsers=function (req, res) {
	res.end();
};
//TODO
exports.updateUserToFellowship=function (req, res) {
	res.end();
};
//TODO
exports.removeUserFromFellowship=function (req, res) {
	res.end();
};


/* ------ Invite Other To Fellowships related API -------- */
//TODO
exports.createInvite=function (req, res) {
	res.end();
};
//TODO
exports.queryInvites=function (req, res) {
	res.end();
};
//TODO
exports.getInvite=function (req, res) {
	res.end();
};
//TODO
exports.deleteInvite=function (req, res) {
	res.end();
};

//find doc by zipcode from URL within Fellow collection
exports.getFellows = function (req, res) {
	if (req.query.zip) {
		//by zipcode
		Fellow.find({zipcode: req.query.zip}, null, {}, function (err, fellows) {
			if (!err) {
//                console.log(fellows);
				res.send(fellows);
			} else {
				res.status(404);
			}
		});
	} else if (req.query.status) {
		//by all fellowships
		Fellow.find({status: req.query.status}, null, {}, function (err, fellows) {
			if (!err) {
//                console.log(fellows);
				res.send(fellows);
			} else {
				res.status(404);
			}
		});

	} else {
		//by all fellowships
		Fellow.find({}, null, {}, function (err, fellows) {
			if (!err) {
//                console.log(fellows);
				res.send(fellows);
			} else {
				res.status(404);
			}
		});

	}

};

//grab 1 fellowship
exports.getFellow = function (req, res) {
	console.log("getFellow");
	console.log(req.params);
	Fellow.findOne({_id: req.params.id}).exec(function (err, item) {
		console.log("try this");
		console.log(item);
		res.json(item);
	});
};

exports.createFellow = function (req, res) {
	var fellowData = req.body;
	var fellowDoc = {
		"name": commFunc.toProperCase(fellowData.fellowName),
		"zipcode": fellowData.zipcode,
		"status": fellowData.status,
		"url": fellowData.url,
		"address": commFunc.toProperCase(fellowData.address),
		"description": fellowData.description
	};

	Fellow.create(fellowDoc, function (err, fellow) {
		if (err) {
			if (err.toString().indexOf('E11000') > -1) {
				err = new Error("Duplicate createFellow");
			}
			res.status(400);
			var err_message = err.toString();
			return res.send({reason: err_message});
		}
		res.send({status: "success", fellow: fellow});
	});

};

exports.updateFellow = function (req, res) {
	return Fellow.findById(req.params.id, function (err, Fellow) {
		Fellow.status = req.body.status; //pass client status into Fellow database in the server
		Fellow.reason = req.body.reason;  //pass client status into Fellow database in the server
		return Fellow.save(function (err) {
			if (!err) {
				console.log("updated");
			} else {
				console.log(err);
			}
			return res.send(Fellow);
		});
	});
};

