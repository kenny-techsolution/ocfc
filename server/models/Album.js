/*************************************************************************************
 11.18.2014 re-create Album model as per latest requirement
 ***************************************************************************************/

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var albumSchema = mongoose.Schema({
	name:		 {type: String, Required:'(name) is required!', index: true, unique: false},
	createdOn:	 {type: Date, Required:'(createdOn) is required!', index: true, unique: false},
	imageIds:	 [{type: ObjectId, ref:'Image',Required:'(imageId) is required!', index: true, unique: false}],
	description: {type: String, index: true, unique: false}
});

var Album = mongoose.model('Album', albumSchema);