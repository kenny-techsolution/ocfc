/*************************************************************************************
 5.24.2014, create creatPost object that grabs data from mongodb by zipcode
 ***************************************************************************************/

var Post=require('mongoose').model('Post');


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
        res.send({status:"success", post: postFellow});
    });

};
