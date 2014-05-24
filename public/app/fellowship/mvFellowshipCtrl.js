/*******************************************************************************
 ******************************************************************************/
angular.module('app').controller('mvFellowshipCtrl', function($scope, mvFellowship,$routeParams,mvPost) {
    $scope.about;
    $scope.name;
    $scope.id;
    $scope.placeholder;
    $scope.post = {
        content:"",
        type:0,
        visibility:"",
        postDate:""
    };
    $scope.placeholder;
    $scope.currVisibility;

    $scope.visibilityOptions = [
        { id: 1, name: 'Public' },
        { id: 2, name: 'Church' },
        { id: 3, name: 'World' }
    ];

    var fellow = mvFellowship.get(
        {
            _id: $routeParams.id}
        //below parameter is a callback, 1st parameter must be met
        ,function() {
            $scope.about=fellow.about;
            $scope.name = fellow.name;
            $scope.id = fellow._id;
        }

    );

    $scope.onClickType=function(type){
        cl("test post",type);
        if(type==='post'){
            $scope.post.type=0;
            $scope.placeholder="What's on your mind?";
        }else if(type==='question'){
            $scope.post.type=1;
            $scope.placeholder="What is your question?";
        }else{

        }
    };

    $scope.createPost = function(e) {
        e.preventDefault();
        $scope.post.visibility=$scope.currVisibility.id;
        $scope.post.postDate=new Date();
        cl("post oboject", $scope.post);
        var newPost = new mvPost($scope.post);
        newPost.$save().then(function() {
            },function(reason){
            }
        );
    };

});