/*************************************************************************************
  11.18.2014 Create Fellow model as per latest requirement
 ***************************************************************************************/

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
//11.6.2014 Testimony Model
exports.commentSchema = mongoose.Schema({
	userId:		{type: ObjectId, ref:'User', Required:'(userId) is required!', index: true, unique: true},
	comment:	{type: String, Required:'(comment) is required!',index: false, unique: false},
	profileImg: {type: String, index: true, unique: false},
	createdOn:	{type: Date, Required:'(createdOn) is required!',index: true, unique: false},
	firstName:	{type: String, Required:'(firstName) is required!',index: false, unique: false},
	lastName:	{type: String, Required:'(lastName) is required!',index: false, unique: false}
});
