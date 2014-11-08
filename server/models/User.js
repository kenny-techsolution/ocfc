/*************************************************************************************
 This file creates a new mongoose model called users that contains firstname,
 lastname, username, salt, password and roles.

 The userSchema has 2 methods:
    authenticat:  injects passwordToMatch to validate against encrypted password.
    hasRole:  injects role to check if role value exist

 The user data collection is stored in createDefaultUsers object.

 4.29.2013, update code to include churchAdmin and worldAdmin records

 ***************************************************************************************/

var mongoose=require('mongoose'),
    encrypt=require('../utilities/encryption');

var userSchema = mongoose.Schema({
    firstName: {type:String, required:'(firstName) is required!',index:true},
    lastName: {type:String, required:'(lastName) is required!',index:true},
    userName: {type:String, required:'(userName aka email) is required!',unique:true},
	hashed_pwd: {type:String, required:'(hashed_pwd) is required!'},
    salt: {type:String, required:'(salt) is required!'},
    roles: [{type:String, default:'user'}],
	birthday:{type:Date,unique:false},
	gender:{type:String,unique:false}

});

userSchema.methods={
    authenticate: function(passwordToMatch){
	    //salt and passwordToMatch are used to create hashPwd
        return encrypt.hashPwd(this.salt, passwordToMatch)===this.hashed_pwd;
	    console.log(passwordToMatch);
	    console.log(encrypt.hashPwd(this.salt, passwordToMatch));
	    console.log(this.hashed_pwd);
    },
    hasRole: function(role){
        return this.roles.indexof(role)>-1;
    }

};

var User = mongoose.model('User',userSchema);

//Create pre-populated or default dummy data
function createDefaultUsers(){
    User.find({}).exec(function(err, collection){
        if(collection.length===0){
            var salt, hash;
	        //new salt is created each time thus every user will have it's own unique value
            salt=encrypt.createSalt();
            hash=encrypt.hashPwd(salt,'joe');
            User.create({firstName:'Joe',lastName:'Eames',userName:'joe',salt:salt, hashed_pwd:hash,roles:['admin']});
            salt=encrypt.createSalt();
            hash=encrypt.hashPwd(salt,'john');
            User.create({firstName:'John',lastName:'Papa',userName:'john',salt:salt, hashed_pwd:hash,roles:[]});
            salt=encrypt.createSalt();
            hash=encrypt.hashPwd(salt,'dan');
            User.create({firstName:'Dan',lastName:'Wahlin',userName:'dan',salt:salt, hashed_pwd:hash});
            salt=encrypt.createSalt();
            hash=encrypt.hashPwd(salt,'mei');
            User.create({firstName:'Mei',lastName:'Zhang',userName:'mei',salt:salt, hashed_pwd:hash,roles:['churchAdmin']});
            salt=encrypt.createSalt();
            hash=encrypt.hashPwd(salt,'kenny');
            User.create({firstName:'Kenny',lastName:'Chung',userName:'kenny',salt:salt, hashed_pwd:hash,roles:['worldAdmin']});
        }
    })
};

exports.createDefaultUsers=createDefaultUsers;
