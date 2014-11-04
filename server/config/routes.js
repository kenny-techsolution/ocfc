/*************************************************************************************
 Routes are required to connect to the server

 Mapping:

 GET    -> $HTTP GET
 QUERY  -> $HTTP GET
 UPDATE -> $HTTP PUT (REQ BODY permitted)
 REMOVE -> $HTTP DELETE
 ADD    -> $HTTP POST (REQ BODY permitted)
 ***************************************************************************************/

var auth=require('./auth'),
    users=require('../controllers/users'),
    courses=require('../controllers/courses'),
    fellows=require('../controllers/fellowships'),
    fellowMems=require('../controllers/fellowMems'),
    posts=require('../controllers/posts'),
    init=require('../controllers/init'),
    mongoose=require('mongoose'),
    User=mongoose.model('User');
    fs = require('fs');

//app comes from whoever calls this function
module.exports=function(app,io){

	//global variable
	var ioSocket;
	io.on('connection', function (socket) {
		ioSocket=socket;
	});

    //Only allowing ADMIN access info from /api/users
    //app is an extension from server.js file, the object is from express

    //grab from user controller
    //API is referring to resource path
    app.get('/api/users',auth.requiresRole('admin'),users.getUsers);
    //create new user
    app.post('/api/users',users.createUser);
    //update existing user
    app.put('/api/users',users.updateUser);

    //retrieve data from courses controller
    app.get('/api/courses',courses.getCourses);
    app.get('/api/courses/:id',courses.getCourseById);

    //4.29.2014, retrieve data from fellows controller
    app.get('/api/fellows',fellows.getFellows);
    app.get('/api/fellows/:id',fellows.getFellow);
    //5.14.2015, create new fellowship by Admin
    app.post('/api/fellows',fellows.createFellow);
    app.put('/api/fellows/:id',fellows.updateFellow);

    //4.30.2014 equalvilant to add, create route for handling user joining fellowship
    app.post('/api/fellowMems',fellowMems.createFellowMem);

    app.get('/api/fellowMems',fellowMems.queryFellowMem);
    app.get('/api/fellowMems/:id',fellowMems.getFellowMem);
    app.delete('/api/fellowMems/:id',fellowMems.removeFellowMem);

    //equalvilant to update
    app.put('/api/fellowMems/:id',fellowMems.updateFellowMem);

    //5.24.2014 create post api
    app.post('/api/posts',posts.createPost);
    app.get('/api/posts',posts.queryPost);
    //app.put('/api/posts/:id',posts.updatePost);

    app.get('/api/init',init.getInit);

    //Define a new route for Jade
    app.get('/partials/*', function(req, res){
        res.render('../../public/app/'+req.params);
    });

    //middleware will authenticate user
    app.post('/login',auth.authenticate);

    app.post('/logout',function(req,res){
        req.logout();
        res.end();
    });

    app.all('/api/',function(req,res){
        res.send(404);
    });

    app.get('*',function(req,res){
        res.render('index',{
            bootstrappedUser: req.user
        });
    });

    app.post('/file-upload', function(req, res, next) {
        console.log("========================file upload========================");
        console.log(req.body);
        console.log(req.files);
        // get the temporary location of the file
        var tmp_path = req.files.file.path;
        
        // set where the file should actually exists - in this case it is in the "images" directory
        var target_path = './imageStore/' + req.files.file.name;
        // move the file from the temporary location to the intended location
        fs.rename(tmp_path, target_path, function(err) {
            if (err) throw err;
            // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
            fs.unlink(tmp_path, function() {
                if (err) throw err;
                res.send('File uploaded to: ' + target_path + ' - ' + req.files.file.size + ' bytes');
            });
        });
    });
};