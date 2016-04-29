angular.module('myApp').controller('galleryController', function($scope, $http) {
    // Get destinations data
    $http({
      method:'GET',
      url:'../data/destinations.json'
    }).success(function (data,status){
      $scope.destinations = data.destinations;
      console.log("Data " + data);
      console.log("Status " + status);
    }).error(function(error){
      console.log("Error " + error);
    });

  // Show enlaged image in a modal, on click of the image
  $scope.showImg = function(src){
    var img = '<img src="' + src + '" class="img-responsive"/>';
    $('#myModal').modal();
    $('#myModal').on('shown.bs.modal', function(){
      $('#myModal .modal-body').html(img);
    });
    $('#myModal').on('hidden.bs.modal', function(){
      $('#myModal .modal-body').html('');
    });
  };
});
