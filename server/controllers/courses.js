var Course=require('mongoose').model('Course');

exports.getCourses=function(req,res){
        Course.find({}).exec(function(err,collection){
            res.send(collection);

            console.log("test courses.js");
            console.log(res.send(collection));
        });
};

exports.getCourseById=function(req,res){
    Course.findOne({_id:req.params.id}).exec(function(err,course){
        res.send(course);
    });
};
