// Controller for DAPs
angular.module('myApp')
  .controller('dapController',
    [ '$scope', '$route', '$routeParams', '$http', '$window', 'DapService',
    function dapController ($scope, $route, $routeParams, $http, $window, DapService){

      console.log("-^-^-^-^-^- DAP Controller Has Been Accessed -^-^-^-^-^-" );
      $scope.minheight = window.innerHeight - 50;

      var dapRoute = ('dap/' + $routeParams.pName + '/' + $routeParams.dapId + '.json');
      console.log(dapRoute);

      // Get data from json file
      DapService.getDapData(dapRoute).then( function(data){
        console.log("DAP CONTROLLER RETURN DATA: ", data);
        document.title = $routeParams.dapId;
        $scope.dapdata = data;
        // Body styles for dap page
        if (data[0].dapStyle) {
          $scope.dapStyle = data[0].dapStyle;
        }
      });
}]);
