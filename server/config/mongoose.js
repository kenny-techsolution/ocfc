var mongoose = require('mongoose'),
	userModel = require('../models/User'),
	courseModel = require('../models/Course'),
//4.30.2014, added new model for members who joined a fellowship
	fellowModel = require('../models/Fellowship'),
	fellowMemModel = require('../models/FellowMem'),
	postModel = require('../models/Post'),
	eventModel = require('../models/Event'),
	testimonyModel = require('../models/Testimony');

module.exports = function (config) {

	mongoose.connect(config.db);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error....'));
	db.once('open', function callback() {
		console.log('multivision db opened');
	});
	//used for creating dummy data
	userModel.createDefaultUsers();
	courseModel.createDefaultCourses();
	fellowModel.createDefaultFellows();
};

