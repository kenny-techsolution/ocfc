/*************************************************************************************
 11.18.2014 re-create Folder model as per latest requirement
 ***************************************************************************************/

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var folderSchema = mongoose.Schema({
	name:		{type: String, Required:'(name) is required!', index: true, unique: false},
	createdOn:	{type: Date, Required:'(createdOn) is required!', index: true, unique: false},
	fileIds:	[{type: ObjectId, ref:'File', Required:'(fileIds) is required!', index: true, unique: false}],
	description: {type: String, index: true, unique: false}
});

var Folder = mongoose.model('Folder', folderSchema);
