/*************************************************************************************
 4.30.2014 fellowUsers server controller

 Creates the following objects:

 fellowUsersData: stores FellowUsers records

 create:

 getFellowsByUser: Grab all fellowship records associated to an user

 ***************************************************************************************/

var FellowUsers = require('mongoose').model('FellowshipUser');
var mongoose = require('mongoose');


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



exports.createFellowUsers = function (req, res) {
	var fellowUsersData = req.body;
	console.log("createFellowUsers");
	console.log(fellowUsersData);

	var fellowUsersDoc = {
		"member": fellowUsersData.userId,
		"fellowship": fellowUsersData.fellowId,
		"status": "Pending",
		"signupDate": new Date()
	};

	FellowUsers.create(fellowUsersDoc, function (err, fellowUsers) {
		if (err) {
			if (err.toString().indexOf('E11000') > -1) {
				console.log("test duplicate fellowUsers error in fellowUsers.js");
				console.log(err);
				err = new Error("Duplicate fellowUsers");
			}
			res.status(400);
			var err_message = err.toString();
			return res.send({reason: err_message});
		}
		console.log("FellowUsers.create successfully created in fellowUsers.js");
		res.send({status: "success", fellowUsersId: fellowUsers._id});
	});

};

exports.getFellowUsers = function (req, res) {
	console.log("getFellowUsers");
	console.log(req.params);
	FellowUsers.findOne({_id: req.params.id}).exec(function (err, collection) {
		console.log("try this");
		console.log(collection);
		res.json(collection);
	})
};

exports.queryFellowUsers = function (req, res) {
	if (req.query.userId) {
		var userId = req.query.userId;
		FellowUsers.find({member: userId}).exec(function (err, collection) {
			console.log(collection);
			res.json(collection);
		});
	} else if (req.query.fellowshipId) {
		FellowUsers.find({fellowship: req.query.fellowshipId}).populate("member").exec(function (err, collection) {
			console.log(collection);
			res.send(collection);
		});
	}
};
//fellowMan is doc returned by the database
//actual update against the db
exports.updateFellowUsers = function (req, res) {
	return FellowUsers.findById(req.params.id, function (err, fellowUsers) {
		fellowUsers.status = req.body.status;
		return fellowUsers.save(function (err) {
			if (!err) {
				console.log("updated");
			} else {
				console.log(err);
			}
			return res.send(fellowUsers);
		});
	});
};

//5.7.2014 remove member
exports.removeFellowUsers = function (req, res) {
	console.log("removeFellowUsers");
	console.log(req.params);
	FellowUsers.findOne({_id: req.params.id}).remove().exec(function (err, collection) {
		console.log("try this");
		console.log(collection);
		if (!err) {
			res.send({status: "success"});
		} else {
			res.send({status: "failure"});
		}
	})
};