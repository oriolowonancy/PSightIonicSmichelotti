(function () {
    'use strict';

    eliteApi.$inject = ['$http', '$q', '$ionicLoading', '$timeout', 'CacheFactory'];
    angular.module('eliteApp').factory('eliteApi', eliteApi);


    function eliteApi($http, $q, $ionicLoading, $timeout, CacheFactory) {

        self.leaguesCache = CacheFactory.get("leaguesCache");
        self.leagueDataCache = CacheFactory.get("leagueDataCache");

        self.leaguesCache.setOptions({
            onExpire: function (key, value) {

                console.log('--->onExpire leaguesCache');

                getLeagues()
                    .then(function () {
                        console.log('Leagues Cache was automatically refreshed. ' + new Date());
                    }, function () {
                        console.log('Error getting data. Putting expired item back to cache ' + new Date());
                        self.leaguesCache.put(key, value);
                    });
            }
        });

        self.leagueDataCache.setOptions({
            onExpire: function (key, value) {

                console.log('--->onExpire leagueDataCache');

                getLeaguesData().then(
                    function() {
                        console.log("League Data Cache was automatically refreshed. " + new Date());
                    },
                    function() {
                        console.log('Error getting data. Putting expired item back to cache.' + new Date());
                        self.leagueDataCache.put(key, value);
                    }
                );
            }
        });

        self.staticCache = CacheFactory.get('staticCache');

        function setLeagueId(leagueId) {
            self.staticCache.put('currentLeagueId', leagueId);
        }

        function getLeagueId() {
            var id = self.staticCache.get('currentLeagueId');
            console.log('get leagueid from cache ' + id);
            return id;
        }


        var getLeagues = function () {

            var deferred = $q.defer(),
                cacheKey = 'leagues',
                leagues = self.leaguesCache.get(cacheKey);

            if (leagues) {

                console.log("Found data inside cache", leagues);
                deferred.resolve(leagues);

            } else {
                $ionicLoading.show({template: 'loading...'});

                $http.get('http://elite-schedule.net/api/leaguedata/')
                    .success(function (data) {
                        self.leaguesCache.put(cacheKey, data);
                        deferred.resolve(data);
                    })
                    .finally(function () {
                        $ionicLoading.hide();
                    });
            }
            return deferred.promise;
        };

        var getLeaguesData = function () {

            var deferred = $q.defer(),
                cacheKey = 'leagueData-' + getLeagueId(),
                leagueData = self.leagueDataCache.get(cacheKey);

            if (leagueData) {
                console.log('Found data inside cache', leagueData);
                deferred.resolve(leagueData);
            } else {
                $ionicLoading.show({template: 'loading...'});

                $http.get('http://elite-schedule.net/api/leaguedata/' + getLeagueId())
                    .success(function (data, status) {
                        console.log('Received schedue data via HTTP.', data, status);
                        self.leagueDataCache.put(cacheKey, data);
                        deferred.resolve(data);
                    })
                    .error(function (error) {
                        console.error('Error while making HTTP call.', error);
                        deferred.reject(error);
                    })
                    .finally(function () {
                        $ionicLoading.hide();
                    });
            }
            return deferred.promise;
        };

        return {
            getLeagues: getLeagues,
            getLeaguesData: getLeaguesData,
            setLeagueId: setLeagueId
        }
    }
}());
