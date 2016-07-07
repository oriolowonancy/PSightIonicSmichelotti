(function () {
  'use strict';

  eliteApi.$inject = ['$http', '$q', '$ionicLoading', '$timeout'];
  angular.module('eliteApp').factory('eliteApi', eliteApi);
  
  function eliteApi($http, $q, $ionicLoading, $timeout) {

    var currentLeagueId;

    var getLeagues = function() {
      
      var deferred = $q.defer();

      $ionicLoading.show({template:'loading...'});

      $http.get('http://elite-schedule.net/api/leaguedata/')
          .success(function(data) {
            deferred.resolve(data);
          })
          .finally(function () {
            $ionicLoading.hide();
            
          });
      
      return deferred.promise;
    };

    var getLeaguesData = function () {
      
      var deferred = $q.defer();

      $ionicLoading.show({template: 'loading...'});

      $http.get('http://elite-schedule.net/api/leaguedata/' + currentLeagueId)
          .success(function (data, status) {
            console.log('Received schedue data via HTTP.', data, status);
            deferred.resolve(data);
          })
          .error(function(error) {
            console.error('Error while making HTTP call.', error);
            deferred.reject(error);
          })
          .finally(function() {
            $ionicLoading.hide();
          });
      
      return deferred.promise;
    };

    function setLeagueId(leagueId) {
      currentLeagueId = leagueId;
    }

    return {
      getLeagues: getLeagues,
      getLeaguesData: getLeaguesData,
      setLeagueId: setLeagueId
    }
  }
}());
