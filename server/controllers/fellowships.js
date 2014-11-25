var Fellowship = require('mongoose').model('Fellowship'),
	FellowshipUser = require('mongoose').model('FellowshipUser'),
	ChurchFellowship = require('mongoose').model('ChurchFellowship'),
	ChurchUser = require('mongoose').model('ChurchUser'),
	Membership = require('mongoose').model('Membership'),
	Album = require('mongoose').model('Album'),
	Calendar = require('mongoose').model('Calendar'),
	commFunc = require('../utilities/commonFunctions'),
	deleteKey = require('key-del'),
	async = require('async'),
	_ = require('lodash');//Library for Array

//Post - Round1
exports.createFellowship = function (req, res) {
	var fellowship = req.body;

	//TODO, prevent duplicate fellowship
	//compared by name, address, if there's associated church,
	//admin cannot create duplicate fellowships
	fellowship = deleteKey(fellowship, ['calendarIds', 'albumIds', 'status']);

	var fellowship = new Fellowship(fellowship);

	fellowship.save(function (err) {
		if (err) return res.json(err);

		var fellowshipUser = new FellowshipUser();
		console.log('chk req.user');
		console.log(req.user);
		fellowshipUser.userId = req.user._id;
		fellowshipUser.fellowshipId = fellowship._id;
		fellowshipUser.status = 'pending';
		fellowshipUser.role = 'admin';

		fellowshipUser.save(function (err) {
			if (err) return res.json(err);
			return res.json({status: "success", fellowship: fellowship});
		});
	})
};

var approveFellowship = function (fellowshipId,req,res) {
	Fellowship.findById(fellowshipId).exec(function (err, fellowship) {
		console.log('chk fellowship');
		console.log(fellowship);
		if (err) return res.json(err);
		var album = new Album({name: "Fellowship Photos", createdBy: req.user._id});
		var calendar = new Calendar({createdBy: req.user._id,ownerType: "fellowship", fellowshipId: fellowship._id, title: "Fellowship Calendar"});
		var albumId, calendarId;
		async.parallel([
			function (callback) {
				album.save(function (err) {
					if (err) return res.json(err);
					albumId = album._id;
					callback();
				});
			},
			function (callback) {
				calendar.save(function (err) {
					if (err) return res.json(err);
					calendarId = calendar._id;
					callback();
				});
			}
		], function (err) {
			if (err) return res.json(err);
			fellowship.approved = true;
			fellowship.defaultAlbumId = albumId;
			fellowship.calendarIds = calendarId;
			fellowship.save(function (err) {
				if (err) return res.json(err);
				//approve the fellowship admin as well.
				FellowshipUser.findOne({fellowshipId: fellowship._id, role: "admin"}, function (err, fellowshipUser) {
					if (err) return res.json(err);
					console.log(fellowshipUser);

					fellowshipUser.status = "approved";
					fellowshipUser.save(function (err) {
						if (err) return res.json(err);

						//add the fellowship to the membership of the fellowship Admin user.
						Membership.findOne({userId: fellowshipUser.userId}, function (err, membership) {
							if (err) return res.json(err);
							membership.fellowships.push({
								fellowshipId: fellowship._id,
								name: fellowship.name,
								role: "admin"
							});
							membership.save(function (err) {
								if (err) return res.json(err);
								return res.json({status: "fellowship is approved"});
							});
						})
					});
				});
			});
		});
	});
};

//Put - Round1
exports.updateFellowshipById = function (req, res) {
	//Scenario: site admin approves the fellowship.
	if (req.user.userName === 'yoyocicada@gmail.com' && req.body.status === "approved") {
		return approveFellowship(req.params.id, req,res);
	}

	//TODO test this scenario after creation of church
	//Scenario: church admin approves the fellowship.
	if (req.status === "approved") {
		//1. find out the churchId it associated with this fellowship.
		ChurchFellowship.findById(req.params.id).exec(function (err, churchFellowship) {
			if (err) {
				err = commFunc.handleError(err);
				return res.json(err);
			}
			//2. check current user is the church admin.
			var matchedResult = _.filter(req.user.membership.churches, function (church) {
				return (church.churchId === churchFellowship.churchId && church.role === 'admin');
			});
			if (matchedResult.length > 0) {
				//3. approve the fellowship and add approve fellowship admin user.
				return approveFellowship(req.params.id, req,res);
			} else {
				return res.json({status: "fail", message: 'your are not allowed to approve the fellowship'});
			}
		});
	}

	//regular fellowship content update by fellowship admin
	FellowshipUser.count({userId: req.user._id, fellowshipId: req.params.id, role: 'admin', status: 'approved'}, function (err, count) {
		if (err) return res.json(err);
		if (count > 0) {
			var fellowship = req.body;

			fellowship = deleteKey(fellowship, ['calendarIds', 'fileIds', 'albumIds']);
			fellowship.updateDate = new Date();

			var keys = _.keys(fellowship);
			if (keys.length == 1 && keys[0] == '_id') {
				return res.json({});
			}

			Fellowship.update({ _id: req.params.id}, fellowship, { multi: true }, function (err, numberAffected, raw) {
				if (err) return res.json(err);
				return res.json({status: "success", raw: raw});
			});
		}
		;
	});
};

//Get - Round1
exports.getFellowshipById = function (req, res) {
	//chk if entry exist match by fellowshipId & status of approved
	FellowshipUser.count({ fellowshipId: req.params.id, userId: req.user._id, status: 'approved'}, function (err, count) {
		console.log('count');
		console.log(count);

		if (count == 1) {
			Fellowship.findOne({_id: req.params.id}).exec(function (err, fellowship) {
				if (err) return res.json(err);
				return res.json({status: "success", fellowship: fellowship});
			});

		} else {
			Fellowship.findOne({_id: req.params.id}, '-albumIds -fileIds -calendarIds').exec(function (err, fellowship) {
				if (err) return res.json(err);
				return res.json({status: "success", fellowship: fellowship});
			});

		}
		;
	});

};

//Delete
exports.deleteFellowshipById = function (req, res) {
	// Session user must be an admin in order to delete
	// fellowship from Fellowship & FellowUser Models
	FellowshipUser.count({userId: req.user._id, fellowshipId: req.params.id, status: 'approved', role: 'admin'}, function (err, count) {
		if (err) {
			err = commFunc.handleError(err);
			return res.json(err);
		}
		if (count > 0) {
			FellowshipUser.remove({fellowshipId: req.params.id}, function (err) {
				if (err) {
					err = commFunc.handleError(err);
					return res.json(err);
				}
				Fellowship.remove({_id: req.params.id}, function (err) {
					if (err) {
						err = commFunc.handleError(err);
						return res.json(err);
					}
					//remove this fellowship from all membership.
					Membership.update({'fellowships.fellowshipId': req.params.id}, {$pull: {fellowships: {fellowshipId: req.params.id}}}, function (err) {
						if (err) return res.json(err);
						return res.json({status: "successfully removed from Fellowship & FellowshipUser"});
					});
				});
			});
		}
		;
	});
};

//Post - Round1
exports.addUserToFellowship = function (req, res) {
	//Populate data onto FellowshipUsers tbl
	Fellowship.count({ _id: req.params.fellowship_id}, function (err, count) {

		if (count == 1) {
			var fellowshipUser = req.body;
			fellowshipUser.userId = req.user._id;
			fellowshipUser.fellowshipId = req.params.fellowship_id;

			fellowshipUser.status = "Pending";
			fellowshipUser.role = 'member';
			fellowshipUser = new FellowshipUser(fellowshipUser);
			fellowshipUser.save(function (err) {
				if (err) return res.json(err);
				return res.json({status: "success", fellowshipUser: fellowshipUser});
			})
		}
	});
};

//Get - Round1
exports.getUsersFromFellowship = function (req, res) {
	//Populate users associated to a fellowship
	//Search FellowUser model by fellowshipId against param id,
	//then populate user table
	console.log(req.user);
	FellowshipUser.find({fellowshipId: req.params.fellowship_id, status: 'approved'}).populate("userId").exec(function (err, fellowshipUser) {
		if (err) return res.json(err);
		return res.json({status: "success", fellowshipUsers: _.pluck(fellowshipUser, 'userId')});
	});
};

var isFellowshipAdmin = function(sessionUser, fellowshipId) {
	var permissions = _.where(sessionUser["fellowships"], { 'fellowshipId': fellowshipId, role: "admin"});
	var resultBoolean = (permissions.length == 0)? false: true;
	return resultBoolean;
};
//Put - Round 1
exports.updateUserToFellowship = function (req, res) {
	//Only admin privilege allowed to update from fellowshipUser tbl
	if(isFellowshipAdmin(req.user ,req.params.fellowship_id)) {
		return res.json({status:'fail', message:'you are not an admin for this fellowship.'});
	}
	var fellowshipUserObj = commFunc.removeInvalidKeys(req.body,['status','role','rejectReason','updateDate']);
	async.series([
		function(callback){
			FellowshipUser.findOne({userId: req.params.user_id, fellowshipId: req.params.fellowship_id}).populate('fellowshipId').exec(function(err, fellowshipUser){
				if (err) return res.json(err);
				var preStatus = fellowshipUser.status;
				console.log("fsadfasdf   fellowshipUserObj");
				console.log(fellowshipUserObj);
				console.log(fellowshipUserObj.status);
				console.log(fellowshipUserObj.rejectReason);
				if(preStatus === 'pending') {
					if(fellowshipUserObj.status ==="rejected" && !fellowshipUserObj.rejectReason) {
						return res.json({status:"fail", message: "to reject, you must provide a reason"});
					}
				}
				_.forIn(fellowshipUserObj, function(value, key){
					fellowshipUser[key] = value;
				});
				fellowshipUser.save(function(err){
					callback();
				});
			});
		}
	],function(err){
		if (err) return res.json(err);
		async.parallel([
			function(callback){
				if (preStatus === 'pending' && fellowshipUser.status === 'approved') {
					Membership.findOne({userId: req.params.user_id, 'fellowships.fellowshipId':{$ne: fellowshipUser.fellowshipId._id}}).exec(function(err, membership){
						console.log("membership lolo");
						console.log(fellowshipUser.fellowshipId);

						membership.fellowships.push({
							fellowshipId: fellowshipUser.fellowshipId._id,
							name: fellowshipUser.fellowshipId.name,
							role: fellowshipUser.role
						});
						membership.save(function (err) {
							callback();
						});
					});
				}
			},
			function(callback){
				ChurchFellowship.findOne({fellowshipId: fellowshipUser.fellowshipId._id}).select('churchId').exec(function (err, churchFellowship) {
					console.log("churchFellowship");
					console.log(churchFellowship);
					if(!churchFellowship){
						return res.json({status: "success", message: "update user to fellowship successfull"});
					}
					if (err) return res.json(err);
					churchUser = new ChurchUser({
						churchId: churchFellowship.churchId,
						userId: fellowshipUser.userId,
						status: "approved",
						role: "member"
					});
					churchUser.save(function (err) {
						if (err) return res.json(err);
						//and updated membership tbl. need to find the church name first.
						church.find({_id: req.params.church_id}, 'name').exec(function (err, church) {
							if (err) return res.json(err);
							Membership.update({'userId': fellowshipUser.userId, 'churches.churchId': {$ne: churchFellowship.churchId}}, {$push: {churches: {churchId: churchFellowship.churchId, name: church.name, role: "member"}}}, function (err) {
								if (err) return res.json(err);
								return res.json({status: "success", message: "update user to fellowship successfull"});
							});
						});
					});
				});
			}
		],function(err){

		});
	});
	//update fellowshipUser
	FellowshipUser.findOne({userId: req.params.user_id, fellowshipId: req.params.fellowship_id}).populate('fellowshipId').exec(function(err, fellowshipUser){
		var preStatus = fellowshipUser.status;
		console.log("fsadfasdf   fellowshipUserObj");
		console.log(fellowshipUserObj);
		console.log(fellowshipUserObj.status);
		console.log(fellowshipUserObj.rejectReason);
		if(preStatus === 'pending') {
			if(fellowshipUserObj.status ==="rejected" && !fellowshipUserObj.rejectReason) {
				return res.json({status:"fail", message: "to reject, you must provide a reason"});
			}
		}
		_.forIn(fellowshipUserObj, function(value, key){
			fellowshipUser[key] = value;
		});
		fellowshipUser.save(function(err){
			if (err) return res.json(err);
			//if user is approved. add fellowshipId to membership.
			if (preStatus === 'pending' && fellowshipUser.status === 'approved') {
				Membership.findOne({userId: req.params.user_id, 'fellowships.fellowshipId':{$ne: fellowshipUser.fellowshipId._id}}).exec(function(err, membership){
					console.log("membership lolo");
					console.log(fellowshipUser.fellowshipId);

					membership.fellowships.push({
						fellowshipId: fellowshipUser.fellowshipId._id,
						name: fellowshipUser.fellowshipId.name,
						role: fellowshipUser.role
					});
					membership.save(function (err) {
						if (err) return res.json(err);
						//add user to the church this fellowship belonged
						ChurchFellowship.findOne({fellowshipId: fellowshipUser.fellowshipId._id}).select('churchId').exec(function (err, churchFellowship) {
							console.log("churchFellowship");
							console.log(churchFellowship);
							if(!churchFellowship){
								return res.json({status: "success", message: "update user to fellowship successfull"});
							}
							if (err) return res.json(err);
							churchUser = new ChurchUser({
								churchId: churchFellowship.churchId,
								userId: fellowshipUser.userId,
								status: "approved",
								role: "member"
							});
							churchUser.save(function (err) {
								if (err) return res.json(err);
								//and updated membership tbl. need to find the church name first.
								church.find({_id: req.params.church_id}, 'name').exec(function (err, church) {
									if (err) return res.json(err);
									Membership.update({'userId': fellowshipUser.userId, 'churches.churchId': {$ne: churchFellowship.churchId}}, {$push: {churches: {churchId: churchFellowship.churchId, name: church.name, role: "member"}}}, function (err) {
										if (err) return res.json(err);
										return res.json({status: "success", message: "update user to fellowship successfull"});
									});
								});
							});
						});
					});
				});
			} else {
				return res.json({status: "success", message: "update user to fellowship successfully"});
			}
		});
	});
};

//Delete
exports.removeUserFromFellowship = function (req, res) {
	// Session user must be an admin in order to delete
	// fellowship from Fellowship & FellowUser Models
	//TODO. can't find membership object on session user.
	console.log("removeUserFromFellowship");
	console.log(req.user);
	var matchedResult = _.filter(req.user.membership.fellowships, {fellowshipId : req.params.fellowship_id});
	console.log(matchedResult);
	if(matchedResult.length === 0) {
		return res.json({status:"fail", message:"You can't remove user from this fellowship."});
	}
	FellowshipUser.findOne({userId: req.params.user_id, fellowshipId: req.params.fellowship_id, status: 'approved'}, function (err, fellowshipUser) {
		if (err) return res.json(err);
		if(fellowshipUser.role ==='admin') {
			//TODO: send email to notify user about his fellowship removal.
		}
		FellowshipUser.remove({fellowshipId: req.params.fellowship_id, userId: req.params.user_id}, function (err) {
			if (err) return res.json(err);
			//remove this fellowship from all membership.
			Membership.update({userId: req.params.user_id, 'fellowships.fellowshipId': req.params.fellowship_id}, {$pull: {fellowships: {fellowshipId: req.params.fellowship_id}}}, function (err) {
				if (err) return res.json(err);
				return res.json({status: "successfully removed from FellowshipUser"});
			});
		});
	});
};
