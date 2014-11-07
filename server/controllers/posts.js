/*************************************************************************************
 5.24.2014, create creatPost object that grabs data from mongodb by zipcode
 ***************************************************************************************/

var Post=require('mongoose').model('Post'),
	Event=require('mongoose').model('Event'),
    commFunc=require('../utilities/commonFunctions');

//POST
exports.createPost=function(req,res, next){
    var postData=req.body;
    postData.user = req.user._id;

	if (postData.type==3){
		Event.create(postData.eventPost,function(err,returnedEvent){
			postData.event=returnedEvent._id;
			if(err){
				if(err.toString().indexOf('E11000')>-1){
					err=new Error("Duplicate createPost");}
				res.status(400);
				var err_message = err.toString();
				return res.send({reason:err_message});
			}
		});
	}

    Post.create(postData, function(err,returnedPost){
        if(err){
            if(err.toString().indexOf('E11000')>-1){
                err=new Error("Duplicate createPost");}
            res.status(400);
            var err_message = err.toString();
            return res.send({reason:err_message});
        }
        Post.findOne(returnedPost).populate("user").exec(function (err, returnedPost){
            //res.send({status:"success", post: returnedPost});
	        if(returnedPost==3){
		        Post.findOne(returnPost).populate("event").exec(function(err,returnedEventPost){
			        res.$_emitBody = {status:"success", post: returnedEventPost};
		        });
	        }else{
		        res.$_emitBody = {status:"success", post: returnedPost};
	        }
	        next();
        });
    });
};

//GET
exports.queryPost=function(req,res){
	console.log("post req*****");
	console.log(req);
    if(req.query.fellow_object_id){
        Post.find({visibility:req.query.fellow_object_id}).populate("user").exec(function (err, collection){
            if (!err) {
                //commFunc.cl("check collection",collection);
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


/*
exports.updatePost=function(req,res){
     Post.findById(req.params.id, function (err,Post) {
        if(!err){
            Post.comments.push({
                comment:req.body.comments,
                postDate:new Date(),
                user_object_id:req.user._id,
                firstName:req.user.firstName,
                lastName:req.user.lastName
            });
        }
        Post.save(function(err,Post){
            if(err){
                console.log("oh dear",err);
            }else {
                console.log("Comment saved:"+req.body.comments);
                res.send(Post);
            }
        });
    });
};
*/