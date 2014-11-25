var mongoose = require('mongoose'),
	InviteOtherToFellowship = require('mongoose').model('InviteOtherToFellowship'),
	FellowshipUser = require('mongoose').model('FellowshipUser'),
	User = require('mongoose').model('User'),
	commFunc = require('../utilities/commonFunctions'),
	deleteKey = require('key-del'),
	_ = require('lodash');//Library for Array


/* ------ Invite Other To Fellowships related API -------- */
//Post
exports.createInvite = function (req, res) {
	//user must be logged in & must belong to that specific fellowship in order to invite
	FellowshipUser.count({userId: req.user._id, fellowshipId: req.params.fellowship_id, status: 'approved'}, function (err, count) {
		if (err) {
			err = commFunc.handleError(err);
			return res.json(err);
		}
		if (count > 0) {
			//check if invitee's email already exist
			var inviteOtherToFellowship = new InviteOtherToFellowship();

			inviteOtherToFellowship.fellowshipId = req.params.fellowship_id;
			inviteOtherToFellowship.inviter = req.user._id;
			inviteOtherToFellowship.invitee = req.body.invitee;
			inviteOtherToFellowship.email = req.body.email;
			inviteOtherToFellowship.welcomeMessage = req.body.welcomeMessage;

			User.count({userName: req.body.email}, function (err, count) {
				if (err) {
					err = commFunc.handleError(err);
					return res.json(err);
				}
				console.log('test email count condition');
				console.log(count);

				if (count == 0) {
					inviteOtherToFellowship.save(function (err) {
						if (err) {
							err = commFunc.handleError(err);
							return res.json(err);
						}
						console.log('test inviteOtherToFellowship');
						console.log(inviteOtherToFellowship);
						return res.json({status: "success", inviteOtherToFellowship: inviteOtherToFellowship});
					});
				}
			});
		}
		;
	});
};
//Get
exports.queryInvites = function (req, res) {
	//query from a particular fellowship
	//user parameter passes as search criteria
	//filter out any non-qualified parameter keys using lo-dash
	var validKeys = ["fellowshipId","inviter","invitee","email","welcomeMessage","invitedOn"];
	var actualKeys = _.keys(req.query);
	var filteredKeys = _.intersection(validKeys, actualKeys);
	var condition = {};
	_.forEach(filteredKeys, function(key){
		//Grab value for each key
		condition[key] = req.query[key];
	})
	InviteOtherToFellowship.find(condition).exec(function (err, invitedUsers) {
		if (err) {
			err = commFunc.handleError(err);
			return res.json(err);
		}
		return res.json({status:"success",invitedUsers:invitedUsers});
	});

};

//Get
exports.getInvite = function (req, res) {
	InviteOtherToFellowship.find({_id:req.params.id}).exec(function (err, invitedUser) {
		if (err) {
			err = commFunc.handleError(err);
			return res.json(err);
		}
		return res.json({status:"success",invitedUser:invitedUser});
	});
};


//Delete
exports.deleteInvite = function (req, res) {
	//Delete if session user is the inviter
	if (req.user._id==req.body.inviter){
		InviteOtherToFellowship.remove({_id:req.params.id},function (err) {
			if (err) {
				err = commFunc.handleError(err);
				return res.json(err);
			}
			return res.json({status:"successfully removed from InviteOtherToFellowship"});
		});

	};

};
