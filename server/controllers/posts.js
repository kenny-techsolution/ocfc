/*************************************************************************************
 5.24.2014, create creatPost object that grabs data from mongodb by zipcode
 ***************************************************************************************/

var Post=require('mongoose').model('Post'),
    commFunc=require('../utilities/commonFunctions');

exports.createPost=function(req,res){
    var postData=req.body;
    postData.user_object_id = req.user._id;

    Post.create(postData, function(err,postFellow){
        if(err){
            if(err.toString().indexOf('E11000')>-1){
                err=new Error("Duplicate createFellow");}
            res.status(400);
            var err_message = err.toString();
            return res.send({reason:err_message});
        }
        Post.findOne(postFellow).populate("user_object_id").exec(function (err, postFellow){
            res.send({status:"success", post: postFellow});
        });
    });
};

exports.queryPost=function(req,res){
    if(req.query.fellow_object_id){
        Post.find({fellow_object_id:req.query.fellow_object_id}).populate("user_object_id").exec(function (err, collection){
            if (!err) {
                commFunc.cl("check collection",collection);
                res.send(collection.reverse());
            }else{
                res.status(404);
            }
        });
    }else {
        Post.find({}, null, {}, function (err, collection){
            if (!err) {
                res.send(collection.reverse());
            }else{
                res.status(404);
            }
        });


    }

};