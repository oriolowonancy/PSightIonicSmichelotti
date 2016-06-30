(function () {

    GameCtrl.$inject = ["$stateParams", "eliteApi"];
    angular.module('eliteApp').controller('GameCtrl', GameCtrl);

    function GameCtrl($stateParams, eliteApi) {

        var vm = this;
        var data = eliteApi.getLeaguesData();

        vm.game = _.chain(data.games)
            .find({"id" : Number($stateParams.id)})
            .value();

        console.log('vm.game: ', vm.game, $stateParams.id, typeof $stateParams.id);
    }
}());