/*************************************************************************************
 11.18.2014 re-create User model as per latest requirement
 ***************************************************************************************/

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

//mongoose.Schema.Types.ObjectId
var fellowshipUserSchema = mongoose.Schema({
	userId:			{type: ObjectId, ref:'User', required:'(userId) is required!',index: true, unique: true},
	fellowshipId:	{type: ObjectId, ref:'Fellowship',required:'(fellowshipId) is required!', index: true, unique: true},
	signupDt:		{type: String,required:'(signupDt) is required!',index: true, unique: false},
	status:			{type: String, required:'(status) is required!', index: false, unique: false},
	role:			{type: String, required:'(role) is required!', index: true, unique: false},
	rejectReason:	{type: String,index: false, unique: false},
	updateDate:		{type: Date, required:'(updateDate) is required!', index: true, unique: false}
});

var FellowshipUser = mongoose.model('FellowshipUser', fellowshipUserSchema);

