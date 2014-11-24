/*************************************************************************************
This file creates a new mongoose model called User

The userSchema has 2 methods:
authenticate:  injects passwordToMatch to validate against encrypted password.
hasRole:  injects role to check if role value exist

11.18.2014, re-create User model as per latest requirement
 ***************************************************************************************/

var mongoose = require('mongoose'),
	encrypt = require('../utilities/encryption'),
	ObjectId = mongoose.Schema.Types.ObjectId;

var membershipSchema = mongoose.Schema({
	userId:			{type: ObjectId, ref:'User', required:'(userId) is required!',index: true, unique: false},
	fellowshipIds:	[{type: ObjectId, ref:'Fellowship', index: false, unique: false}],
	churchIds:	[{type: ObjectId, ref:'Church', index: false, unique: false}],
	albumIds: [{type: ObjectId, ref:'Album', index: false, unique: false}]
});

membershipSchema.methods = {

};

var Membership = mongoose.model('Membership', membershipSchema);
//Create pre-populated or default dummy data
