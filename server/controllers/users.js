var User = require('mongoose').model('User'),
	encrypt = require('../utilities/encryption'),
	deleteKey = require('key-del'),
	_=require('lodash'), //Library for Array
	html_strip=require('htmlstrip-native');


var handleError= function(err){
	var modError = err;
	return modError;
};

var toLowerCase=function(obj){
	for (var i in obj) {
		if (i!=="profileImg"){
			obj[i] = obj[i].toLowerCase();
		}
	}
	return obj;
};

//Post
exports.createUser=function (req, res) {
	var user = req.body;

	var salt = encrypt.createSalt();
	user.salt = salt;
	user.hashedPwd = encrypt.hashPwd(salt, user.password);
	user.signupDate=new Date();

	var user = new User(user);
	user.save(function (err) {
		if (err) {
			err = handleError(err);
			return res.json(err);
		}
		return res.json({status:"success",user:user});
	})
};

//Put
exports.updateUserById=function (req, res) {
	var user=req.body;

	user = toLowerCase(user);
	user = deleteKey(user, ['userName', 'hashedPwd','salt','signupDate','passReset','resetOn']);

	var keys = _.keys(user);

	if(keys.length==1 && keys[0]=='_id'){
		return res.json({});
	}

	User.update({ _id:req.params.id }, user, { multi: true }, function (err, numberAffected, raw) {
		if (err) {
			err = handleError(err);
			return res.json(err);
		}
		return res.json({status:"success",user:raw});
	});
};

//Get
exports.getUserById=function (req, res) {
	User.findOne({_id: req.params.id}).exec(function (err, user) {
		if (err) {
			err = handleError(err);
			return res.json(err);
		}
		return res.json({status:"success",user:user});
	});
};

//Delete
exports.deleteUserById=function (req, res) {
	User.remove({_id:req.params.id}, function (err) {
		if (err) {
			err = handleError(err);
			return res.json(err);
		}
		return res.json({status:"successfully removed"});
	});
};

//Put
exports.updateProfileImage=function (req, res) {
	var user={profileImg: req.body.profileImg};

	var options = {
		include_script : false,
		include_style : false,
		compact_whitespace : true
	};

	// Strip tags and decode HTML entities to prevent hacking
	user.profileImg = html_strip.html_strip(user.profileImg,options);


	if(user.profileImg!==null || user.profileImg!==""){
		User.update({ _id: req.params.id}, user, { multi: true }, function (err, numberAffected, raw) {
			if (err) {
				err = handleError(err);
				return res.json(err);
			}
			return res.json({status:"success",user:raw});
		})
	}else{
		return res.json({status:"not a good uri"});
	}
};


//TODO Get
exports.resetPassword=function (req, res) {

	res.end();
};

//TODO Put
exports.updateEventParticipation=function (req, res) {
	res.end();
};


//Function creates new user data set grabbed it from client
//exports.createUser_old = function (req, res, next) {
//	var userData = req.body;
//	userData.userName = userData.userName.toLowerCase();
//	userData.firstName = userData.firstName.toLowerCase();
//	userData.lastName = userData.lastName.toLowerCase();
//
//	//System generates a new salt
//	userData.salt = encrypt.createSalt();
//	//Create hashed_pwd using salt & password
//	userData.hashed_pwd = encrypt.hashPwd(userData.salt, userData.password);
//
//	User.create(userData, function (err, user) {
//		if (err) {
//			if (err.toString().indexOf('E11000') > -1) {
//				err = new Error("Duplicate Username");
//			}
//			res.status(400);
//			var err_message = err.toString();
//			//send error msg back to client
//			return res.send({reason: err_message});
//		}
//		//Creates logIn method
//		//Request user data set & sends back to client
//		req.logIn(user, function (err) {
//			if (err) {
//				return next(err);
//			}
//			res.send(user);
//		});
//	});
//};

//Function updates user data set
//exports.updateUser_old = function (req, res) {
//	//assign userUpdates with requested data set
//	var userUpdates = req.body;
//
//	//must have admin rights to make update
//	//req.user is a newly created object in the middleware
//	//possibly used to creating session
//	if (req.user._id != userUpdates._id && !req.user.hasRole('admin')) {
//		res.status(403);
//		return res.end();
//	}
//
//	req.user.firstname = userUpdates.firstName;
//	req.user.lastname = userUpdates.lastName;
//	req.user.username = userUpdates.userName;
//
//	//Ensure password field is not empty
//	if (userUpdates.password && userUpdates.password.length > 0) {
//		req.user.salt = encrypt.createSalt();
//		req.user.hashed_pwd = encrypt.hashPwd(req.user.salt, userUpdates.password)
//	}
//	req.user.save(function (err) {
//		if (err) {
//			res.status(400);
//			return res.send({reason: err.toString()});
//		}
//		;
//		res.send(req.user);
//	});
//};

