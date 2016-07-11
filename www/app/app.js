angular.module('eliteApp', ['ionic', 'angular-cache'])
    
  .run(['$ionicPlatform', 'CacheFactory', function ($ionicPlatform, CacheFactory) {

    console.log('run');

    $ionicPlatform.ready(function () {

      console.log('isReady');

      if (window.cordova && window.cordova.plugins.Keyboard) {

        cordova.plugins.Keyboard.hideKeyboardAccessoryBar();
        cordova.plugins.Keyboard.disableScroll(true);
      }

      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
      
      CacheFactory("leagueDataCache", {storageMode: "localStorage", maxAge: 6000000, deleteOnExpire: "aggressive"});
      CacheFactory("leaguesCache", {storageMode: "localStorage", maxAge: 6000000, deleteOnExpire: "aggressive"});
      CacheFactory("myTeamsCache", {storageMode: "localStorage"});
      CacheFactory("staticCache", {storageMode: "localStorage"});
    });
  }])

  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    console.log('config');

    $stateProvider

      .state('home', {
        abstract: true,
        url: '/home',
        templateUrl: 'app/home/home.html'

      })
      .state('home.leagues', {
        url:'/leagues',
        views: {
          'tab-leagues': {
            templateUrl: 'app/home/leagues.html'
          }
        }
      })
      .state('home.myteams', {
        url: '/myteams',
        views: {
          'tab-myteams': {
            templateUrl: 'app/home/myteams.html'
          }
        }
      })

      .state('app', {
        abstract: true,
        url: '/app',
        templateUrl: 'app/layout/menu-layout.html'
      })
      .state('app.teams', {
        url: '/teams', // will be /app/teams
        views: {
          'mainContent': {
            templateUrl: 'app/teams/teams.html'
          }
        }
      })
      .state('app.team-detail', {
        url: '/teams/:id',
        views: {
          'mainContent': {
            templateUrl: 'app/teams/team-detail.html'
          }
        }
      })
      .state('app.game', {
        url: '/game/:id',
        views: {
          'mainContent': {
            templateUrl: 'app/game/game.html'
          }
        }
      })
      .state('app.standings', {
        url: '/standings',
        views: {
          'mainContent': {
            templateUrl: 'app/standings/standings.html'
          }
        }
      })
      .state('app.locations', {
        url: '/locations',
        views: {
          'mainContent': {
            templateUrl: 'app/locations/locations.html'
          }
        }
      })
      .state('app.rules', {
        url: '/rules',
        views: {
          'mainContent': {
            templateUrl: 'app/rules/rules.html'
          }
        }
      });

    $urlRouterProvider.otherwise('/home/leagues');
  }]);
