(function() {
    'use strict';
    myTeamsService.$inject = ['CacheFactory'];
    angular.module('eliteApp').factory('myTeamsService', myTeamsService);
    
    function myTeamsService(CacheFactory) {
        
        var self = this;
        self.myTeamsCache = CacheFactory.get('myTeamsCache');
        
        function followTeam(team) {
            self.myTeamsCache.put(team.teamId, team);
        }
        
        function unfollowTeam(teamId) {
            self.myTeamsCache.remove(teamId.toString());
        }
        
        function getFollowedTeams() {
            var teams = [],
                keys = self.myTeamsCache.keys();
            
            for (var i = 0; i < keys.length; i++) {
                
                var team = self.myTeamsCache.get(keys[i]);
                teams.push(team);
            }
        }
        
        function isFollowingTeam(teamId) {
            var team = self.myTeamsCache.get(teamId);
            return team;
        }
        
        return {
            followTeam: followTeam,
            unfollowTeam: unfollowTeam,
            getFollowedTeams: getFollowedTeams,
            isFollowingTeam: isFollowingTeam
        }
    }
}());
