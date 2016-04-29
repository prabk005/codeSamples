
angular.module('myApp')
.controller('mainController', function($scope) {
    // take half of device screen height
    $scope.iframeHeight = screen.height / 2;
    // animate hamburger menu
    $(".navbar-toggle").on("click", function () {
				    $(this).toggleClass("active");
		});
});
