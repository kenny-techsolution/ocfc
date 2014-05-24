var mongoose = require('mongoose'),
    userModel=require('../models/User'),
    courseModel=require('../models/Course'),
    //4.30.2014, added new model for members who joined a fellowship
    FellowModel=require('../models/Fellowship');
    FellowMemModel=require('../models/FellowMem');
    PostModel=require('../models/Post');
module.exports = function(config){

    mongoose.connect(config.db);
    var db=mongoose.connection;
    db.on('error',console.error.bind(console,'connection error....'));
    db.once('open',function callback(){
        console.log('multivision db opened');
    });
    userModel.createDefaultUsers();
    courseModel.createDefaultCourses();
    FellowModel.createDefaultFellows();
};

