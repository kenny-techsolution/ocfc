//old cold
//var config={rootPath:__dirname}
//Print out to port 3030
//old code
//var port=process.env.PORT || 3030;
//app.listen(port);
//
//console.log('Listening on port' + port +'...');

var path=require('path');
//means to go twice up the root of directory name location
var rootPath=path.normalize(__dirname + '/../../');

module.exports={
    development:{
        db:  'mongodb://localhost/multivision',
        rootPath: rootPath,
        port: process.env.PORT || 3030,
        uploadPath: rootPath + '/uploads'
    },
    production:{
        db:  'mongodb://localhost/multivision',
        rootPath: rootPath,
        port: process.env.PORT || 80,
        uploadPath: rootPath + '/uploads'
    }
};