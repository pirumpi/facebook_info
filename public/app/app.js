var app = angular.module('css410', ['ui.router'])
    .value('settings', {appId: '1509442325935853', xfbml: true, version: 'v2.1'})
    .value('permission', '')
    .run(function($rootScope, $window, settings){
        $window.fbAsyncInit = function() {
            FB.init(settings);
            $rootScope.$apply(function(){
                $rootScope.$broadcast('facebookReady', FB);
            });
        };

        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if(d.getElementById(id)){return;}
            js = d.createElement(s); js.id = id;
            js.src = '//connect.facebook.net/en_US/sdk.js';
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    })
    .config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

      $stateProvider
      .state('login', {
              url: '/login',
              templateUrl: 'views/login.tmpl.html',
              controller: 'LoginCtrl'
      })
      .state('info', {
              url:'/info',
              templateUrl: 'views/info.tmpl.html',
              controller: 'InfoCtrl'
      })
      .state('info.basic',{
          url: '/basic',
          templateUrl: 'views/basicInfo.tmpl.html'
      })
      .state('info.detail',{
          url: '/detail',
          templateUrl: 'views/detailInfo.tmpl.html'
      })
      .state('info.family',{
          url: '/family',
          templateUrl: 'views/familyInfo.tmpl.html'
      })
      .state('info.work',{
          url: '/work',
          templateUrl: 'views/workInfo.tmpl.html'
      })
      .state('info.education',{
          url: '/education',
          templateUrl: 'views/educationInfo.tmpl.html'
      })
      .state('info.photos',{
          url: '/photos',
          templateUrl: 'views/photosInfo.tmpl.html'
      });


      $urlRouterProvider.otherwise('/login');
  }]);

