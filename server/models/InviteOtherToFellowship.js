/*************************************************************************************
 11.18.2014 Re-create InviteUserToFellowship model as per latest requirement
 ***************************************************************************************/

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var inviteOtherToFellowshipSchema = mongoose.Schema({
	fellowshipId: {type: ObjectId, ref:'Fellowship', Required:'(fellowshipId) is required!', index: false, unique: false},
	inviter: {type: ObjectId, ref:'User', Required:'(userId) is required!',index: true, unique: false},
	invitee: {type:String,index: false, unique: false},
	welcomeMessage: {type:String,index: false, unique: false},
	invitedOn:	{type: Date, Required:'(date) is required!', index: true, unique: false}
});

var InviteOtherToFellowship = mongoose.model('InviteOtherToFellowship', inviteOtherToFellowshipSchema);
