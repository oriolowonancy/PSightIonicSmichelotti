(function () {

    GameCtrl.$inject = ["$stateParams", "eliteApi"];
    angular.module('eliteApp').controller('GameCtrl', GameCtrl);

    function GameCtrl($stateParams, eliteApi) {

        var vm = this;

        eliteApi.getLeaguesData().then(function (data) {
            vm.games = data.games;
            vm.game = _.chain(vm.games)
                .find({"id" : Number($stateParams.id)})
                .value();

            console.log('vm.game: ', vm.game, $stateParams.id, typeof $stateParams.id);
        });
    }
}());
