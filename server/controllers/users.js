var User=require('mongoose').model('User'),
    encrypt=require('../utilities/encryption');

exports.getUsers=function(req,res){
    User.find({}).exec(function(err,collection){
        res.send(collection);
    })
};

exports.createUser=function(req,res,next){
    var userData=req.body;
    userData.userName=userData.userName.toLowerCase();
    userData.salt=encrypt.createSalt();
    userData.hashed_pwd=encrypt.hashPwd(userData.salt,userData.password);
    console.log("test userData");
    console.log(userData);
    User.create(userData, function(err,user){
        if(err){
            console.log("this is error log");
            console.log(err);
            if(err.toString().indexOf('E11000')>-1){
                err=new Error("Duplicate Username");
                console.log("haah");
            }
            console.log("duplicate /////");
            console.log(err);
            res.status(400);
            var err_message = err.toString();
            return res.send({reason:err_message});
        }
        req.logIn(user, function(err){
            if(err) {return next(err);}
            res.send(user);
        });
    });
};

exports.updateUser=function(req,res){
    var userUpdates=req.body;

    if(req.user._id !=userUpdates._id && !req.user.hasRole('admin')){
        res.status(403);
        return res.end();
    }

    req.user.firstname=userUpdates.firstName;
    req.user.lastname=userUpdates.lastName;
    req.user.username=userUpdates.userName;
    if(userUpdates.password && userUpdates.password.length>0){
        req.user.sale=encrypt.createSalt();
        req.user.hashed_pwd=encrypt.hashPwd(req.user.sale, userUpdates.password)
    }
    req.user.save(function(err){
        if(err) {
            res.status(400);
            return res.send({reason:err.toString()});
        };
        res.send(req.user);
    });
};