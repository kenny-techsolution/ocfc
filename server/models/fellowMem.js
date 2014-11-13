/*************************************************************************************
 4.29.2014 added to include joined fellowship collection
 ***************************************************************************************/

var mongoose = require('mongoose');

console.log("check objectId");
console.log(mongoose.Schema.Types.ObjectId);

var ObjectId = mongoose.Schema.Types.ObjectId;

//mongoose.Schema.Types.ObjectId
var fellowMemSchema = mongoose.Schema({
	member: {type: ObjectId, ref: 'User', unique: false, required: '(MEMBER) is required!'},
	fellowship: {type: ObjectId, ref: 'Fellow', unique: false, required: '(FELLOWSHIP) is required!'},
	status: {type: String, required: '(STATUS) is required!', unique: false},
	signupDate: {type: Date, required: '(SIGNUPDATE) is required!', 'default': Date.now, unique: false}
});

var FellowMem = mongoose.model('FellowMem', fellowMemSchema);

