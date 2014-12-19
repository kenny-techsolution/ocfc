/*************************************************************************************
This file creates a new mongoose model called User

The userSchema has 2 methods:
authenticate:  injects passwordToMatch to validate against encrypted password.
hasRole:  injects role to check if role value exist

11.18.2014, re-create User model as per latest requirement
 ***************************************************************************************/

var mongoose = require('mongoose'),
	encrypt = require('../utilities/encryption');

var ObjectId = mongoose.Schema.Types.ObjectId;

var activationSchema=mongoose.Schema({
	userId:	        {type: ObjectId, ref: 'User', index: true,unique: true},
	activateDate:	{type: Date, required: '(activateDate) is required!',index: true, unique: true, default:Date.now},
	activationCode:	{type: String, required: '(activationCode) is required!',index: true, unique: true}
});


var Activation=mongoose.model('Activation',activationSchema);
