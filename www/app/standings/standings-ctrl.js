(function () {
    
    StandingsCtrl.$inject = ["eliteApi"];
    angular.module('eliteApp').controller('StandingsCtrl', StandingsCtrl);
    
    function StandingsCtrl(eliteApi) {

        var vm = this;

        eliteApi.getLeaguesData().then(function (data) {
            vm.standings = data.standings;
        })
    }
    
}());