var User=require('mongoose').model('User'),
    encrypt=require('../utilities/encryption');


// Retrieve all users data and sends back to client
// (ie: Angular Svc or Controller)
exports.getUsers=function(req,res){
    User.find({}).exec(function(err,collection){
        res.send(collection);
    })
};

//Function creates new user data set grabbed it from client
exports.createUser=function(req,res,next){
    var userData=req.body;
    userData.userName=userData.userName.toLowerCase();
	userData.firstName=userData.firstName.toLowerCase();
	userData.lastName=userData.lastName.toLowerCase();

	//System generates a new salt
    userData.salt=encrypt.createSalt();
	//Create hashed_pwd using salt & password
    userData.hashed_pwd=encrypt.hashPwd(userData.salt,userData.password);

    User.create(userData, function(err,user){
        if(err){
            if(err.toString().indexOf('E11000')>-1){
                err=new Error("Duplicate Username");
            }
            res.status(400);
            var err_message = err.toString();
	        //send error msg back to client
            return res.send({reason:err_message});
        }
	    //Creates logIn method
	    //Request user data set & sends back to client
        req.logIn(user, function(err){
            if(err) {
	            return next(err);}
            res.send(user);
        });
    });
};

//Function updates user data set
exports.updateUser=function(req,res){
	//assign userUpdates with requested data set
    var userUpdates=req.body;

	//must have admin rights to make update
	//req.user is a newly created object in the middleware
	//possibly used to creating session
    if(req.user._id !=userUpdates._id && !req.user.hasRole('admin')){
        res.status(403);
        return res.end();
    }

    req.user.firstname=userUpdates.firstName;
    req.user.lastname=userUpdates.lastName;
    req.user.username=userUpdates.userName;

	//Ensure password field is not empty
    if(userUpdates.password && userUpdates.password.length>0){
        req.user.salt=encrypt.createSalt();
        req.user.hashed_pwd=encrypt.hashPwd(req.user.salt, userUpdates.password)
    }
    req.user.save(function(err){
        if(err) {
            res.status(400);
            return res.send({reason:err.toString()});
        };
        res.send(req.user);
    });
};