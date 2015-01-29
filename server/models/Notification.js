/*************************************************************************************
11.18.2014 re-create Album model as per latest requirement
 ***************************************************************************************/

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var albumSchema = mongoose.Schema({
	message:	 {type: String, Required:'(message) is required!', index: false, unique: false},
	recipient:	 {type: ObjectId, ref:'User', Required:'(recipient) is required!',index: false, unique: false},
	createdOn:	 {type: Date, Required:'(createdOn) is required!', index: true, unique: false,default:Date.now}
});

var Notification = mongoose.model('Notification', albumSchema);