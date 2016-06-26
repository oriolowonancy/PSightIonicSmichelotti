(function () {
  
  LocationsCtrl.$inject = ["eliteApi"];
  angular.module('eliteApp').controller('LocationsCtrl', LocationsCtrl);
  
  function LocationsCtrl(eliteApi) {
    
    var vm = this;
    vm.locations = eliteApi.getLeaguesData().locations;
    
  }
  
}());
