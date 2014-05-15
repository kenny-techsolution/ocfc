/*************************************************************************************
 This file creates a new utility called commonFunction.js which will store commonly
 used functions
 ***************************************************************************************/

//Common functions are defined below
exports.cl = function (title, value) {
    console.log(title);
    console.log(value);
};

exports.toProperCase =function (str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};
