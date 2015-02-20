var mongoose = require('mongoose'),
    InviteOtherToFellowship = require('mongoose').model('InviteOtherToFellowship'),
    FellowshipUser = require('mongoose').model('FellowshipUser'),
    User = require('mongoose').model('User'),
    commFunc = require('../utilities/commonFunctions'),
    sendgrid = require('sendgrid')('yoyocicada', 'SendGrid1006'),
    deleteKey = require('key-del'),
    async = require('async'),
    _ = require('lodash');
//Library for Array

/* ------ Invite Other To Fellowships related API -------- */
//Post - Round1
exports.createInvites = function(req, res) {
	//user must be the admin for that fellowship to invite.
	//loop through the array
	//1.if email already exist , put that in the email array with already exist key.
	//2.if email doesn't exist, then send the email invite to user.
	//create the invite user entry.
	var fellowshipId = req.body.fellowshipId;
	var message = req.body.message;
	var sessionUser = req.user;
	var existEmails = [];
	var savedEmails = [];
	if (commFunc.isFellowshipAdmin(sessionUser, fellowshipId)) {
		async.forEachLimit(req.body.nameEmails, 3, function(nameEmail, callback) {
			var forEachCallback = callback;
			async.waterfall([
			function(callback) {
				InviteOtherToFellowship.count({
					email : nameEmail.email
				}, function(err, count) {
					if (err)
						return callback(err);
					callback(null, count);
				});
			},
			function(existCount, callback) {
				if (existCount == 0) {
					User.count({
						userName : nameEmail.email
					}, function(err, count) {
						if (err)
							return callback(err);
						callback(null, count);
					});
				} else {
					callback(null, existCount);
				}
			},
			function(existCount, callback) {
				if (existCount == 0) {
					var activateEmail = new sendgrid.Email({
						to : nameEmail.email
					});
					activateEmail.subject = 'Invitation to use OCFC';
					activateEmail.setFrom('support@onechurchforchrist.org');
					activateEmail.setHtml(message);
					sendgrid.send(activateEmail, function(err, json) {
						if (err)
							callback(err);
						callback(null, existCount);
					});
				} else {
					callback(null, existCount);
				}
			},
			function(existCount, callback) {
				if (existCount == 0) {
					var inviteOtherToFellowship = new InviteOtherToFellowship({
						fellowshipId : fellowshipId,
						inviter : sessionUser._id,
						invitee : nameEmail.name,
						email : nameEmail.email,
						status : 'pending',
						welcomeMessage : message
					});
					inviteOtherToFellowship.save(function(err) {
						if (err)
							callback(err);
						savedEmails.push(nameEmail.email);
						callback(null);
					});
				} else {
					existEmails.push(nameEmail.email);
					callback(null);
				}

			}], function(err) {
				if (err)
					forEachCallback(err);
				forEachCallback(null);
			});
		}, function(err) {
			if (err)
				return res.json(err);
			return res.json({
				savedEmails : savedEmails,
				existEmails : existEmails
			});
		});
	}
};
//Get - Round1
exports.queryInvites = function(req, res) {
	//query from a particular fellowship
	//user parameter passes as search criteria
	//filter out any non-qualified parameter keys using lo-dash
	InviteOtherToFellowship.find({fellowshipId:req.query.fellowshipId}).exec(function(err, invitedUsers) {
		if (err)
			return res.json(err);
		return res.json(invitedUsers);
	});
};

//Get - Round1
exports.getInvite = function(req, res) {
	InviteOtherToFellowship.find({
		_id : req.params.id
	}).exec(function(err, invitedUser) {
		if (err)
			return res.json(err);
		return res.json({
			status : "success",
			invitedUser : invitedUser
		});
	});
};

//Delete - Round1
exports.deleteInvite = function(req, res) {
	//Delete if session user is the inviter
	if (req.user._id == req.body.inviter) {
		InviteOtherToFellowship.remove({
			_id : req.params.id
		}, function(err) {
			if (err)
				return res.json(err);
			return res.json({
				status : "successfully removed from InviteOtherToFellowship"
			});
		});

	}
	;

};
