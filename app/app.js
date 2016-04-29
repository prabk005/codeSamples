'use strict';

// create the module
// include ngRoute for all our routing needs
var myApp = angular.module('myApp', ['ngRoute']);

// configure our routes
myApp.config(function($routeProvider, $locationProvider) {
    $routeProvider
        // route for the home page
        .when('/', {
            templateUrl : 'view/home.html',
            controller  : 'mainController'
        })
        // route for the dap page
        .when('/dap/:pName/:dapId', {
            templateUrl : 'view/dap.html',
            controller  : 'dapController'
        })
        // route for the gallery page
        .when('/gallery', {
            templateUrl : 'view/gallery.html',
            controller  : 'galleryController'
        });
    // use the HTML5 History API
    $locationProvider.html5Mode(true).hashPrefix('!');
});
