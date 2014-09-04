app.controller('InfoCtrl', function($scope, $location, User){
    $scope.user = User.info;

    if($scope.user === null){
        $location.path('login');
    }else{
        $location.path('/info/basic');
    }
});