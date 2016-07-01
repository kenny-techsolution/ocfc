var path = require('path');
//means to go twice up the root of directory name location
var rootPath = path.normalize(__dirname + '/../../');

//6.17.2014 updated port 3030 to 80
module.exports={
	development:{
		db:  'mongodb://54.249.38.89/ocfc',//104.8.6.58
		//db: 'mongodb://localhost/ocfc',
		rootPath: rootPath,
		port: process.env.PORT || 8080,
		uploadPath: rootPath + '/uploads'
	},
	production:{
		db:  'mongodb://54.249.38.89/ocfc',
		rootPath: rootPath,
		port: process.env.PORT || 8000,
		uploadPath: rootPath + '/uploads'
	}
};
