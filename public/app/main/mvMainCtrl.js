//This code stores all records into mvMainCtrl controller
angular.module('app').controller('mvMainCtrl',function($scope, mvCachedCourses){
    $scope.courses=mvCachedCourses.query();

//HARDCODED DATA
//        [
//            {name: 'C#a...', featured:true, published:new Date("1/1/2011")},
//            {name: 'C#b...', featured:false, published:new Date("2/1/2011")},
//            {name: 'C#c...', featured:true, published:new Date("3/1/2011")},
//            {name: 'C#d...', featured:false, published:new Date("4/1/2011")},
//            {name: 'C#e...', featured:true, published:new Date("5/1/2011")},
//            {name: 'C#f...', featured:false, published:new Date("6/1/2011")},
//            {name: 'C#g...', featured:true, published:new Date("7/1/2011")},
//            {name: 'C#h...', featured:true, published:new Date("8/1/2011")},
//            {name: 'C#i...', featured:true, published:new Date("9/1/2011")},
//            {name: 'C#j...', featured:true, published:new Date("10/1/2011")}
//        ]

});

//4.19.2014, added code below to include setup for sidebar
$('#sidebar').affix({
    offset: {
        top: 235
    }
});

var $body   = $(document.body);
var navHeight = $('.navbar').outerHeight(true) + 10;

$body.scrollspy({
    target: '#leftCol',
    offset: navHeight
});

/* smooth scrolling sections */
$('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
            $('html,body').animate({
                scrollTop: target.offset().top - 50
            }, 1000);
            return false;
        }
    }
});
//4.19.2014, added code below to include setup for sidebar, ends