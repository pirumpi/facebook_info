app.controller('LoginCtrl', function($scope, $location, User){

    $scope.userLogged = false;
    $scope.$on('facebookReady', function(){
        console.log(FB)
    });

    $scope.loginFB = function(){
        FB.login(function(res){
            if (res.authResponse) {
                FB.api('/me', function(response) {
                    User.info = response;

                    FB.api('/me/photos', function(response) {
                        User.photos = response;
                        $scope.userLogged = true;
                        $location.path('/info');
                        console.log(User);
                        $scope.$apply();
                    });
                });

            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }, {scope: 'public_profile,email,user_friends,user_about_me,user_birthday,user_education_history,user_location,user_photos,user_relationships,user_work_history,read_friendlists'});
    };

    $scope.logoutFB = function(){
        FB.logout(function(response) {
            $scope.userLogged = false;
            $scope.$apply();
        });
    };
});