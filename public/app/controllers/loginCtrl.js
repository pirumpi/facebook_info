app.controller('LoginCtrl', function($scope, $location, $q, User){

    $scope.userLogged = false;
    $scope.$on('facebookReady', function(){
        console.log(FB)
    });

    $scope.loginFB = function(){
        FB.login(function(res){
            if (res.authResponse) {
                $q.all([$scope.getUserInfo(), $scope.getUserPhotos(), $scope.getUserFamily(), $scope.getUserFriends() ])
                .then(function(data){
                    User.info = data[0];
                    User.info.photos = data[1].data;
                    User.info.familyList = data[2].data;
                    User.info.friendsCount = data[3].summary.total_count;
                    $scope.userLogged = true;
                    $location.path('/info');
                });
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }, {scope: 'public_profile,email,user_friends,user_about_me,user_birthday,user_education_history,user_location,user_photos,user_relationships,user_work_history,read_friendlists'});
    };

    $scope.getUserInfo = function(){
        var deferred = $q.defer();
        FB.api('/me', function(response){
            $scope.$apply(function(){
                deferred.resolve(response);
            });
        });
        return deferred.promise;
    };

    $scope.getUserPhotos = function(){
        var deferred = $q.defer();
        FB.api('/me/photos', function(response){
            $scope.$apply(function(){
                deferred.resolve(response);
            });
        });
        return deferred.promise;
    };
    $scope.getUserFamily = function(){
        var deferred = $q.defer();
        FB.api('/me/family', function(response){
            $scope.$apply(function(){
                deferred.resolve(response);
            });
        });
        return deferred.promise;
    };
    $scope.getUserFriends = function(){
        var deferred = $q.defer();
        FB.api('/me/friends', function(response){
            $scope.$apply(function(){
                deferred.resolve(response);
            });
        });
        return deferred.promise;
    };
    $scope.getUserInterest = function(){
        var deferred = $q.defer();
        FB.api('/me/interests', function(response){
            $scope.$apply(function(){
                deferred.resolve(response);
            });
        });
        return deferred.promise;
    };

    $scope.logoutFB = function(){
        FB.logout(function(response) {
            $scope.userLogged = false;
            $scope.$apply();
        });
    };
});