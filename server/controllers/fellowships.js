var Fellowship = require('mongoose').model('Fellowship'),
	FellowshipUser = require('mongoose').model('FellowshipUser'),
	ChurchFellowship = require('mongoose').model('ChurchFellowship'),
	Membership = require('mongoose').model('Membership'),
	Album = require('mongoose').model('Album'),
	Calendar = require('mongoose').model('Calendar'),
	commFunc = require('../utilities/commonFunctions'),
	deleteKey = require('key-del'),
	async = require('async'),
	_=require('lodash');//Library for Array

var toLowerCase=function(obj){
	for (var i in obj) {
		if (i!=="albumIds" || i!=="fileIds" || i!=="calendarIds"){
			console.log(obj[i]);
			obj[i] = obj[i].toLowerCase();
		}
	}
	return obj;
};

//Post
exports.createFellowship=function (req, res) {
	var fellowship = req.body;

	//TODO, prevent duplicate fellowship
	//compared by name, address, if there's associated church,
	//admin cannot create duplicate fellowships
	fellowship = deleteKey(fellowship, ['calendarIds', 'albumIds', 'status']);

	var fellowship = new Fellowship(fellowship);
	fellowship.save(function (err) {
		if (err) {
			err = commFunc.handleError(err);
			return res.json(err);
		}
		var fellowshipUser = new FellowshipUser();
		fellowshipUser.userId = req.user._id;
		fellowshipUser.fellowshipId = fellowship._id;
		fellowshipUser.status = 'pending';
		fellowshipUser.role = 'admin';
		fellowshipUser.updateDate = new Date();
		fellowshipUser.save(function(err){
			if (err) {
				err = commFunc.handleError(err);
				return res.json(err);
			}
			//TODO create an album for this fellowship
			return res.json({status:"success",fellowship:fellowship});
		});
	})
};

var approveFellowship = function (fellowshipId) {
	fellowship.findById(fellowshipId).exec(function(err){
		if (err) {
			err = commFunc.handleError(err);
			return res.json(err);
		}
		var album = new Album({name:"Fellowship Photos", createdBy: req.user._id});
		var calendar = new Calendar({ownerType:"fellowship", fellowshipId: fellowship._id, title: "Fellowship Calendar"});
		var albumId, calendarId;
		async.parallel([
			function(callback) {
				album.save(function(err){
					if (err) return res.json(err);
					albumId = album._id;
					callback();
				});
			},
			function(callback) {
				calendar.save(function(err){
					if (err) return res.json(err);
					calendarId = calendar._id;
					callback();
				});
			}
		], function(err){
			if (err) return res.json(err);
			fellowship.approved = true;
			fellowship.defaultAlbumId = albumId;
			fellowship.calendarIds = calendarIds;
			fellowship.save(function(err){
				if (err) {
					err = commFunc.handleError(err);
					return res.json(err);
				}
				//approve the fellowship admin as well.
				fellowshipUser.find({fellowshipId: fellowshipId, role: "admin"}, function(err, fellowshipUser){
					if (err) {
						err = commFunc.handleError(err);
						return res.json(err);
					}
					fellowshipUser.status = "approved";
					fellowshipUser.save(function(){
						if (err) {
							err = commFunc.handleError(err);
							return res.json(err);
						}
						//add the fellowship to the membership of the fellowship Admin user.
						membership.findOne({userId: fellowshipUser.userId}, function(err, membership){
							if (err) return res.json(err);
							membership.fellowships.push({
								fellowshipId: fellowship._id,
								name: fellowship.name,
								role: "admin"
							});
							membership.save(function(err){
								if (err) return res.json(err);
								return res.json({status:"fellowship is approved"});
							});
						})
					});
				});
			});
		});
	});
};

//Put
exports.updateFellowshipById=function (req, res) {
	//Scenario: site admin approves the fellowship.
	if(user.userName === 'yoyocicada@gmail.com' && req.status === "approved") {
		return approveFellowship(req.params.id);
	}

	//Scenario: church admin approves the fellowship.
	if(req.status === "approved") {
		//1. find out the churchId it associated with this fellowship.
		ChurchFellowship.findById(req.params.id).exec(function(err, churchFellowship){
			if (err) {
				err = commFunc.handleError(err);
				return res.json(err);
			}
			//2. check current user is the church admin.
			var matchedResult = _.filter(user.membership.churches, function(church){
				return (church.churchId === churchFellowship.churchId && church.role === 'admin');
			});
			if(matchedResult.length > 0) {
				//3. approve the fellowship and add approve fellowship admin user.
				return approveFellowship(req.params.id);
			} else {
				return res.json({status: "fail", message: 'your are not allowed to approve the fellowship'});
			}
		});
	}

	//regular fellowship content update by fellowship admin
	FellowshipUser.count({userId: req.user._id, fellowshipId:req.params.id, role:'admin',status:'approved'}, function (err, count) {
		if (err) {
			err = commFunc.handleError(err);
			return res.json(err);
		}
		if (count>0){
			var fellowship=req.body;

//			fellowship = toLowerCase(fellowship);
			fellowship = deleteKey(fellowship, ['calendarIds', 'fileIds','albumIds']);
			fellowship.updateDate=new Date();

			var keys = _.keys(fellowship);
			if(keys.length==1 && keys[0]=='_id'){
				return res.json({});
			}

			Fellowship.update({ _id: req.params.id}, fellowship, { multi: true }, function (err, numberAffected, raw) {
				if (err) {
					err = commFunc.handleError(err);
					return res.json(err);
				}
				console.log('chk fellowship');
				console.log(fellowship);
				return res.json({status:"success",raw:raw});
			});
		};
	});
};

//Get
exports.getFellowshipById=function (req, res) {
	//chk if entry exist match by fellowshipId & status of approved
	FellowshipUser.count({ fellowshipId: req.params.id,userId: req.user._id,status: 'approved'}, function(err, count){
		console.log('count');
		console.log(count);

		if (count==1){
			Fellowship.findOne({_id: req.params.id}).exec(function (err, fellowship) {
				if (err) {
					err = commFunc.handleError(err);
					return res.json(err);
				}
				return res.json({status:"success",fellowship:fellowship});
			});

		}else{
			Fellowship.findOne({_id: req.params.id},'-albumIds -fileIds -calendarIds').exec(function (err, fellowship) {
				if (err) {
					err = commFunc.handleError(err);
					return res.json(err);
				}
				return res.json({status:"success",fellowship:fellowship});
			});

		};
	});

};

//Delete
exports.deleteFellowshipById=function (req, res) {
	// Session user must be an admin in order to delete
	// fellowship from Fellowship & FellowUser Models
	FellowshipUser.count({userId:req.user._id,fellowshipId: req.params.id,status:'approved',role:'admin'},function (err, count) {
		if (err) {
			err = commFunc.handleError(err);
			return res.json(err);
		}
		if (count>0){
			FellowshipUser.remove({fellowshipId:req.params.id}, function (err) {
				if (err) {
					err = commFunc.handleError(err);
					return res.json(err);
				}
				Fellowship.remove({_id:req.params.id}, function (err) {
					if (err) {
						err = commFunc.handleError(err);
						return res.json(err);
					}
					//remove this fellowship from all membership.
					Membership.update({'fellowships.fellowshipId': req.params.id}, {$pull: {fellowships: {fellowshipId: req.params.id}}},function(err){
						if (err) return res.json(err);
						return res.json({status:"successfully removed from Fellowship & FellowshipUser"});
					});
				});
			});
		};
	});
};

//Post
exports.addUserToFellowship=function (req, res) {
	//Populate data onto FellowshipUsers tbl
	console.log('chk req.user obj');
	console.log(req.user);

	Fellowship.count({ _id: req.params.fellowship_id}, function(err, count){
		console.log('count');
		console.log(count);

		if (count==1){
			var fellowshipUser = req.body;
			fellowshipUser.userId=req.user._id;
			fellowshipUser.fellowshipId=req.params.fellowship_id;

			fellowshipUser.status="Pending";
			fellowshipUser.role=fellowshipUser.role;

			console.log('chk fellowUser variable');
			console.log(fellowshipUser);

			fellowshipUser = new FellowshipUser(fellowshipUser);
			fellowshipUser.save(function (err) {
				if (err) {
					err = commFunc.handleError(err);
					return res.json(err);
				}
				return res.json({status:"success",fellowshipUser:fellowshipUser});
			})
		}
	});
};

//Get
exports.getUsersFromFellowship=function (req, res) {
	//Populate users associated to a fellowship
	//Search FellowUser model by fellowshipId against param id,
	//then populate user table
	FellowshipUser.find({fellowshipId:req.params.fellowship_id}).populate("userId").exec(function (err, fellowshipUser) {
		if (err) {
			err = commFunc.handleError(err);
			return res.json(err);
		}
		return res.json({status:"success",fellowshipUsers:_.pluck(fellowshipUser, 'userId')});
	});
};

//Put
exports.updateUserToFellowship=function (req, res) {
	//Only admin privilege allowed to update from fellowshipUser tbl
	FellowshipUser.count({userId: req.user._id, fellowshipId:req.params.fellowship_id, role:'admin',status:'approved'},function (err, count) {
		if (err) {
			err = commFunc.handleError(err);
			return res.json(err);
		}
		if (count>0){
			var fellowshipUser=req.body;
			fellowshipUser = toLowerCase(fellowshipUser);
			fellowshipUser = deleteKey(fellowshipUser, ['userId', 'fellowshipId','signupDate']);

			var keys = _.keys(fellowshipUser);
			if(keys.length==1 && keys[0]=='_id'){
				return res.json({});
			}
			var preStatus = fellowshipUser.status;
			FellowshipUser.findOneAndUpdate({ userId: req.params.user_id, fellowshipId:req.params.fellowship_id}, fellowshipUser).populate('fellowshipId').exec(function(err, fellowshipUser){
				if (err) return res.json(err);
				//if user is approved. add fellowshipId to membership.
				if(preStatus === 'pending' && fellowshipUser.status ==='approved') {
					membership.fellowships.push({
						fellowshipId: fellowshipUser.fellowshipId._id,
						fellowshipName: fellowshipUser.fellowshipId.name,
						role: fellowshipUser.role
					});
					membership.save(function(err){
						if (err) return res.json(err);
						//add user to the church this fellowship belonged
						churchFellowship.findById(fellowshipUser.fellowshipId._id).select('churchId').exec(function(err, churchFellowship){
							if (err) return res.json(err);
							churchUser = new ChurchUser({
								churchId: churchFellowship.churchId,
								userId:	fellowshipUser.userId,
								status:	"approved",
								role: "member"
							});
							churchUser.save(function(err){
								if (err) return res.json(err);
								//and updated membership tbl. need to find the church name first.
								church.find({_id: req.params.church_id}, 'name').exec(function(err, church){
									if (err) return res.json(err);
									Membership.update({'userId': fellowshipUser.userId, 'churches.churchId': {$ne: churchFellowship.churchId}}, {$push: {churches: {churchId: churchFellowship.churchId, name: church.name, role: "member"}}},function(err){
										if (err) return res.json(err);
										return res.json({status: "success", message: "update user to fellowship successfull"});
									});
								});
							});
						});
					});
				} else {
					return res.json({status: "success", message: "update user to fellowship successfull"});
				}
			});
		};
	});
};

//Delete
exports.removeUserFromFellowship=function (req, res) {
	// Session user must be an admin in order to delete
	// fellowship from Fellowship & FellowUser Models
	FellowshipUser.count({userId:req.user._id,fellowshipId: req.params.fellowship_id,status:'approved',role:'admin'},function (err, count) {
		if (err) {
			err = commFunc.handleError(err);
			return res.json(err);
		}
		if (count>0){
			FellowshipUser.remove({fellowshipId:req.params.fellowship_id, userId:req.params.user_id},function (err) {
				if (err) {
					err = commFunc.handleError(err);
					return res.json(err);
				}
				//remove this fellowship from all membership.
				Membership.update({userId: req.params.user_id ,'fellowships.fellowshipId': req.params.id}, {$pull: {fellowships: {fellowshipId: req.params.id}}},function(err){
					if (err) return res.json(err);
					return res.json({status:"successfully removed from FellowshipUser"});
				});
			});
		};
	});
};
