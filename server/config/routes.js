var auth=require('./auth'),
    users=require('../controllers/users'),
    courses=require('../controllers/courses'),
    mongoose=require('mongoose'),
    User=mongoose.model('User');

//app comes from whoever calls this function
module.exports=function(app){

    //Only allowing ADMIN access info from /api/users
    //app is an extention from server.js file, the object is from express
    //grab user
    app.get('/api/users',auth.requiresRole('admin'),users.getUsers);
    //create new user
    app.post('/api/users',users.createUser);
    //update existing user
    app.put('/api/users',users.updateUser);

    app.get('/api/courses',courses.getCourses);
    app.get('/api/courses/:id',courses.getCourseById);

    //Define a new route for Jade
    //app.get('/partials/:partialPath', function(req, res){
    //    res.render('partials/'+req.params.partialPath);
    //});

        app.get('/partials/*', function(req, res){
            res.render('../../public/app/'+req.params);
        });

    //Add route that deliver index page
    //The '*' will match all routes or diff types of request is made
    //Make sure all route is known by server so it won't hang
    //View field is required for sever to render (ie: server/views/index.jade)
    //app.get('*',function(req,res){
    //    res.render('index',{
    //        mongoMessage:mongoMessage
    //    });
    //});
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

};