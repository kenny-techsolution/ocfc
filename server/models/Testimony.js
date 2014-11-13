/*************************************************************************************
 5.24.2014 added to post text
 ***************************************************************************************/

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
//11.6.2014 Testimony Model
var testimonySchema = mongoose.Schema({
	title: {type: String, unique: false}

});

var Testimony = mongoose.model('Testimony', testimonySchema);
