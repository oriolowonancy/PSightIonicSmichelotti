(function () {
    
    StandingsCtrl.$inject = ["eliteApi"];
    angular.module('eliteApp').controller('StandingsCtrl', StandingsCtrl);
    
    function StandingsCtrl(eliteApi) {
        var vm = this;
        
        vm.standings = eliteApi.getLeaguesData().standings;
    }
    
}());