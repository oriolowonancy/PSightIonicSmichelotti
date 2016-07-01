(function () {
  'use strict';

  angular.module('eliteApp').controller('MainDetailCtrl', TeamDetailCtrl);

  function TeamDetailCtrl($stateParams, $log, $ionicPopup, eliteApi) {
    var vm = this;

    $log.debug('invoked teamDetailCtrl', $stateParams);

    vm.teamId = Number($stateParams.id);

    eliteApi.getLeaguesData().then(function (data) {

      var team = _.chain(data.teams)
          .flatten("divisionTeams")
          .find({ "id": vm.teamId })
          .value();

      vm.teamName = team.name;

      vm.games = _.chain(data.games)
          .filter(isTeamInGame)
          .map(function (item) {

            var isTeam1 = item.team1Id === vm.teamId ? true : false;
            var opponentName = isTeam1 ? item.team2 : item.team1;
            var scoreDisplay = getScoreDisplay(isTeam1, item.team1Score, item.team2Score);

            return {
              opponent: opponentName,
              scoreDisplay: getScoreDisplay(isTeam1, item.team1Score, item.team2Score),
              homeAway: isTeam1 ? 'vs.' : 'at',
              gameId: item.id,
              time: item.time,
              location: item.location,
              locationUrl: item.locationUrl
            }
          })
          .value();

      vm.divisionStanding = _.chain(data.standings)
          .flatten('divisionStandings')
          .find({"teamId": vm.teamId})
          .value();
      
    });
    
    vm.following = false;
    
    vm.follow = function() {
      if (vm.following) {

        var confirmPopup = $ionicPopup.confirm({
          title: 'Unfollow?',
          template: 'Are you sure you want to unfollow?'
        });

        confirmPopup.then(function (res) {
          if (res) {
            vm.following = !vm.following;
          }
        });
      } else {
        vm.following = !vm.following;
      }
    };

    function isTeamInGame(item) {
      return item.team1Id === vm.teamId || item.team2Id === vm.teamId;
    }

    function getScoreDisplay(isTeam1, team1Score, team2Score) {

      if (team1Score && team2Score) {

        var teamScore = isTeam1 ? team1Score : team2Score;
        var opponentScore = !isTeam1 ? team1Score : team2Score;
        var winIndicator = teamScore > opponentScore ? 'W: ' : 'L: ';

        return winIndicator + team1Score + '-' + team2Score;

      } else {

        return "";
      }
    }
  }
}());
