(function () {
  
  LocationsCtrl.$inject = ['eliteApi'];
  angular.module('eliteApp').controller('LocationsCtrl', LocationsCtrl);
  
  function LocationsCtrl(eliteApi) {
    
    var vm = this;
    eliteApi.getLeaguesData().then(function (data) {
      vm.locations = data.locations;
      console.log('vm.locations', vm.locations);
    })
    
  }
  
}());
