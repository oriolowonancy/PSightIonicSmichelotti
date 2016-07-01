angular.module('eliteApp', ['ionic'])

  .run(["$ionicPlatform", function ($ionicPlatform) {

    $ionicPlatform.ready(function () {

      console.log('isReady');

      if (window.cordova && window.cordova.plugins.Keyboard) {

        cordova.plugins.Keyboard.hideKeyboardAccessoryBar();
        cordova.plugins.Keyboard.disableScroll(true);
      }

      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
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
            templateUrl: 'app/teams/teams.html',
            controller: 'TeamsCtrl',
            controllerAs: 'vm'
          }
        }
      })
      .state('app.team-detail', {
        url: '/teams/:id',
        views: {
          'mainContent': {
            templateUrl: 'app/teams/team-detail.html',
            controller: 'MainDetailCtrl',
            controllerAs: 'vm'
          }
        }
      })
      .state('app.game', {
        url: '/game/:id',
        views: {
          'mainContent': {
            templateUrl: 'app/game/game.html',
            controller: 'GameCtrl',
            controllerAs: 'vm'
          }
        }
      })
      .state('app.standings', {
        url: '/standings',
        views: {
          'mainContent': {
            templateUrl: 'app/standings/standings.html',
            controller: 'StandingsCtrl',
            controllerAs: 'vm'
          }
        }
      })
      .state('app.locations', {
        url: '/locations',
        views: {
          'mainContent': {
            templateUrl: 'app/locations/locations.html',
            controller: 'LocationsCtrl',
            controllerAs: 'vm'
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
      })

    $urlRouterProvider.otherwise('/home/leagues');
  }])
