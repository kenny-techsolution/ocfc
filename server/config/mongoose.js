var mongoose = require('mongoose'),
    userModel=require('../models/User'),
    courseModel=require('../models/Course');

module.exports = function(config){
    //Create new db connection called multivision
    //old code
    //mongoose.connect('mongodb://localhost/multivision');
    //var db=mongoose.connection;
    //db.on('error',console.error.bind(console,'connection error....'));
    //db.once('open',function callback(){
    //    console.log('multivision db opened');
    //});

    mongoose.connect(config.db);
    var db=mongoose.connection;
    db.on('error',console.error.bind(console,'connection error....'));
    db.once('open',function callback(){
        console.log('multivision db opened');
    });
    userModel.createDefaultUsers();
    courseModel.createDefaultCourses();
};

