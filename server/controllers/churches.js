var Church = require('mongoose').model('Church'),
	ChurchUser = require('mongoose').model('ChurchUser'),
	ChurchFellowship = require('mongoose').model('ChurchFellowship'),
	commFunc = require('../utilities/commonFunctions'),
	deleteKey = require('key-del'),
	_=require('lodash');//Library for Array

//var toLowerCase=function(obj){
//	for (var i in obj) {
//		if (i!=="name" || i!=="url" || i!=="faithStatement"||i!=="mission"||i!=="vision"||i!=="about"||i!=="churchId"||i!=="fellowshipId"){
//			console.log(obj[i]);
//			obj[i] = obj[i].toLowerCase();
//		}
//	}
//	return obj;
//};

//Post
exports.createChurch= function (req, res) {
	var church = req.body;

	//TODO, prevent duplicate church
	//compared by name, address
	//admin cannot create duplicate church

	var church = new Church(church);

	church.save(function (err) {
		if (err) {
			err = commFunc.handleError(err);
			return res.json(err);
		}

		console.log('chk church object model');
		console.log(church);
		return res.json({status:"success",church:church});
	})
};

//Put
exports.updateChurchById= function (req, res) {
	ChurchUser.count({userId: req.user._id, churchId:req.params.id, role:'admin',status:'approved'},function (err, count) {
		if (err) {
			err = commFunc.handleError(err);
			return res.json(err);
		}
		if (count>0){
			var church=req.body;
			church = deleteKey(church, ['startDate', 'updateDate']);
			church.updateDate=new Date();

			var keys = _.keys(church);
			if(keys.length==1 && keys[0]=='_id'){
				return res.json({});
			}
			Church.update({ _id: req.params.id}, church, { multi: true }, function (err, numberAffected, raw) {
				if (err) {
					err = commFunc.handleError(err);
					return res.json(err);
				}
				return res.json({status:"success",raw:raw});
			});
		};
	});
};
//Get
exports.getChurchById= function (req, res) {
	//chk if entry exist match by churchId & status of approved
	ChurchUser.count({ churchId: req.params.id,userId: req.user._id,status: 'approved'}, function(err, count){
		if (count==1){
			Church.findOne({_id: req.params.id}).exec(function (err, church) {
				if (err) {
					err = commFunc.handleError(err);
					return res.json(err);
				}
				return res.json({status:"success",church:church});
			});
		}else{
			Church.findOne({_id: req.params.id},'-updateDate').exec(function (err, church) {
				if (err) {
					err = commFunc.handleError(err);
					return res.json(err);
				}
				return res.json({status:"success",church:church});
			});

		};
	});
};
//Get
exports.queryChurches= function (req, res) {
	//query from a particular fellowship
	//user parameter passes as search criteria
	//filter out any non-qualified parameter keys using lo-dash
	var validKeys = ["name","address","city","country"];
	var actualKeys = _.keys(req.query);
	var filteredKeys = _.intersection(validKeys, actualKeys);
	var condition = {};
	_.forEach(filteredKeys, function(key){
		//Grab value for each key
		condition[key] = req.query[key];
	})
	Church.find(condition).exec(function (err, queryChurches) {
		if (err) {
			err = commFunc.handleError(err);
			return res.json(err);
		}
		return res.json({status:"success",queryChurches:queryChurches});
	});

};
//Delete
exports.deleteChurchById= function (req, res) {
	// Session user must be an admin in order to delete
	// church from Church & ChurchUser Models
	ChurchUser.count({userId:req.user._id,churchId: req.params.id,status:'approved',role:'admin'},function (err, count) {
		if (err) {
			err = commFunc.handleError(err);
			return res.json(err);
		}

		if (count>0){
			ChurchUser.remove({churchId:req.params.id}, function (err) {
				if (err) {
					err = commFunc.handleError(err);
					return res.json(err);
				}
				Church.remove({_id:req.params.id}, function (err) {
					if (err) {
						err = commFunc.handleError(err);
						return res.json(err);
					}
					return res.json({status:"successfully removed from Church & ChurchUser"});
				});
			});
		};
	});
};
//Post
exports.addFellowshipToChurch= function (req, res) {
	//Populate data onto ChurchFellowship tbl
	console.log('chk req.user obj');
	console.log(req.user);

	Church.count({ _id: req.params.church_id}, function(err, count){
		console.log('count');
		console.log(count);

		if (count==1){
			var churchFellowship = req.body;
			churchFellowship.churchId=req.params.church_id;
			churchFellowship.fellowshipId=req.params.fellowship_id;
			churchFellowship.updateDate=new Date();
			churchFellowship.status="Pending";

			console.log('chk churchFellowship variable');
			console.log(churchFellowship);

			churchFellowship = new ChurchFellowship(churchFellowship);
			churchFellowship.save(function (err) {
				if (err) {
					err = commFunc.handleError(err);
					return res.json(err);
				}
				return res.json({status:"success",churchFellowship:churchFellowship});
			})
		}
	});
};
//Put
exports.updateFellowshipToChurch= function (req, res) {
	//Only admin privilege allowed to update from ChurchFellowship tbl
	ChurchUser.count({userId: req.user._id, churchId:req.params.church_id, role:'admin',status:'approved'},function (err, count) {
		if (err) {
			err = commFunc.handleError(err);
			return res.json(err);
		}
		if (count>0){
			var churchFellowship=req.body;
			churchFellowship.churchId=req.params.church_id;
			churchFellowship.fellowshipId=req.params.fellowship_id;
			churchFellowship.rejReason=churchFellowship.rejReason;
			churchFellowship.status='Pending';
//			churchFellowship = toLowerCase(churchFellowship);
			churchFellowship.updateDate=new Date();
			churchFellowship = deleteKey(churchFellowship, ['userId', 'churchId']);

			var keys = _.keys(churchFellowship);
			if(keys.length==1 && keys[0]=='_id'){
				return res.json({});
			}
			ChurchFellowship.update({ churchId: req.params.church_id}, churchFellowship, { multi: true }, function (err, numberAffected, raw) {
				if (err) {
					err = commFunc.handleError(err);
					return res.json(err);
				}
				return res.json({status:"success",raw:raw});
			});
		};
	});
};
//Get
exports.getFellowships= function (req, res) {
	//chk if entry exist match by churchId & status of approved

	ChurchFellowship.find({churchId: req.params.church_id},'fellowshipId').populate('fellowshipId').exec(function (err, churchFellowships) {
		if (err) {
			err = commFunc.handleError(err);
			return res.json(err);
		}
		return res.json({status:"success",churchFellowships:_.pluck(churchFellowships, 'fellowshipId')});
	});

};
//Delete
exports.removeFellowshipFromChurch= function (req, res) {
	// Session user must be an admin in order to delete
	// church from ChurchFellowship Models
	console.log('removeFellowshipFromChurch executed');
	ChurchUser.count({userId:req.user._id,churchId: req.params.church_id,status:'approved',role:'admin'},function (err, count) {
		if (err) {
			err = commFunc.handleError(err);
			return res.json(err);
		}
		console.log('chk count');
		console.log(count);

		if (count>0){
			ChurchFellowship.remove({churchId:req.params.church_id, fellowshipId:req.params.fellowship_id},function (err) {
				if (err) {
					err = commFunc.handleError(err);
					return res.json(err);
				}
				return res.json({status: "successfully removed from ChurchFellowship"});
				})
		};
	});
};
//Post
exports.addUserToChurch= function (req, res) {
	//Populate data onto ChurchUser tbl
	Church.count({ _id: req.params.church_id}, function(err, count){
		if (count==1){
			var churchUser = req.body;
			churchUser.userId=req.user._id;
			churchUser.churchId=req.params.church_id;
			churchUser.status="Pending";
			churchUser.role=churchUser.role;

			churchUser = new ChurchUser(churchUser);
			churchUser.save(function (err) {
				if (err) {
					err = commFunc.handleError(err);
					return res.json(err);
				}
				return res.json({status:"success",churchUser:churchUser});
			})
		}
	});
};
//Put
exports.updateUserToChurch= function (req, res) {
	//Only admin privilege allowed to update from ChurchUser tbl
	ChurchUser.count({userId: req.user._id, churchId:req.params.church_id, role:'admin',status:'approved'},function (err, count) {
		if (err) {
			err = commFunc.handleError(err);
			return res.json(err);
		}
		if (count>0){
			var churchUser=req.body;
//			churchUser = toLowerCase(churchUser);
			churchUser = deleteKey(churchUser, ['userId', 'churchId','updateDate']);
			churchUser.updateDate=new Date();

			var keys = _.keys(churchUser);
			if(keys.length==1 && keys[0]=='_id'){
				return res.json({});
			}
			ChurchUser.update({ userId: req.params.user_id,churchId:req.params.church_id}, churchUser, { multi: true }, function (err, numberAffected, raw) {
				if (err) {
					err = commFunc.handleError(err);
					return res.json(err);
				}
				console.log('chk churchUser');
				console.log(churchUser);
				return res.json({status:"success",raw:raw});
			});
		};
	});
};
//Get
exports.getUsers= function (req, res) {
	//chk if entry exist match by churchId & status of approved
	ChurchUser.find({churchId: req.params.church_id},'userId').populate('userId').exec(function (err, churchUsers) {
		if (err) {
			err = commFunc.handleError(err);
			return res.json(err);
		}
		return res.json({status:"success",churchUsers:_.pluck(churchUsers, 'userId')});
	});
};

//Delete
exports.removeUserFromChurch= function (req, res) {
	// Session user must be an admin in order to delete
	// church from ChurchFellowship Models
	ChurchUser.count({userId:req.user._id,churchId: req.params.church_id,status:'approved',role:'admin'},function (err, count) {
		if (err) {
			err = commFunc.handleError(err);
			return res.json(err);
		}

		if (count>0){
			ChurchUser.remove({churchId:req.params.church_id, userId:req.params.user_id},function (err) {
				if (err) {
					err = commFunc.handleError(err);
					return res.json(err);
				}
				return res.json({status: "successfully removed from ChurchUser"});
			})
		};
	});
};
