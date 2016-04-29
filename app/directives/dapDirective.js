angular.module('myApp')
  .directive('templateItem',
    ['$compile', '$location','DapService', '$sce',
    function ($compile, $location, DapService, $sce){

      // HTML Template - loads content from html file
      var htmlTemplate = "<div ng-include=\"dapdata.htmlFile\"></div>";

      // Copy Template - allows for adding HTML or Styled Text on page
      var copyTemplate = '<div style={{dapdata.bodyStyle}} ng-bind-html="escapeHTML(dapdata.data)"></div>';

      // Switch to iOS or android HTML depending on device type
      var appTemplate = '<div ng-switch on="phoneVersion" ng-click="redirectApp()">'+
      '<img alt="{{dapdata.iosAltTxt}}" ng-switch-when="ios" class="ptTextLinksImage" style={{dapdata.imgStyle}} ng-src="{{dapdata.iosData}}">'+
      '<img alt="{{dapdata.androidAltTxt}}" ng-switch-when="android" class="ptTextLinksImage" style={{dapdata.imgStyle}} ng-src="{{dapdata.androidData}}">'+
      '</div>';

      // Image Template - Image with Link
      var imageTemplate = '<div id="ptImageWrap" ng-click="clickTrack(dapdata.altTxt)">' +
      '<a ng-click="goToLocation(dapdata.url)" use-location-service="{{dapdata.uls}}">' +
      '<img alt="{{dapdata.altTxt}}" ng-src="{{dapdata.data}}" class="ptTextLinksImage">' +
      '</a>' +
      '</div>';

      // Count down to a particular event date in the future
      var countdownTemplate = '<div countown-timer eventdate="{{dapdata.eventDate}}"></div>';

      // Get template according to its contentType
      var getTemplate = function (contentType)
      {
        var template = '';
        switch(contentType)
        {
          case 'html':
          template = htmlTemplate;
          break;
          case 'copy':
          template = copyTemplate;
          break;
          case 'appImage':
          template = appTemplate;
          break;
          case 'image':
          template = imageTemplate;
          break;
          case 'countdown':
          template = countdownTemplate;
          break;
        }
        return template;
      };

      // Link Templates to json
      var linker = function(scope, element, attrs){
        element.html(getTemplate(scope.dapdata.content_type));
        $compile(element.contents())(scope);
      };

      return{
        restrict: 'E',
        replace: true,
        link: linker,
        scope:{
          dapdata:'='
        },
        // Controller for the templates functions
        controller: function($scope,$rootScope,$element,$routeParams){

          // Mark as safe to bind HTML context
          $scope.escapeHTML = function (content) {
            return $sce.trustAsHtml(content);
          };

          // location path for the image click
          $scope.goToLocation = function(url) {
            window.location = url;
          }

          // Track Omniture onclick calls
          $scope.clickTrack = function(productName){
            var pageName = $routeParams.dapId;
            console.log("OMNITURE: " + pageName + " " + productName +" image clicked");
            //OmnitureServices.trackDAPClickActions(pageName,productName);
          };

          //Function for detecting iOS / Android operating system
          function getOSversion() {
            var userAgent = navigator.userAgent || navigator.vendor || window.opera;

            if (userAgent.match( /iPad/i ) || userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) ){
              $scope.phoneVersion = "ios";
              return 'IOS';
            } else if( userAgent.match( /Android/i ) ){
              $scope.phoneVersion = "android";
              return 'ANDROID';
            } else {
              return 'UNKNOWN';
            }
          };

          // function to redirect to an appropriate app link according to its device and appId
          $scope.redirectApp = function() {
            var pageName = $routeParams.dapId;
            var productName;
            if (sessionStorage.appId == "sears" ) {
              if (getOSversion()== "IOS") {
                productName = "IOS Sears App";
                window.location = "itms-apps://itunes.apple.com/app/id305449194";
              } else {
                productName = "Android Sears App";
                window.location = "market://details?id=com.sears.android";
              }
            } else {
              if (getOSversion() == "IOS") {
                productName = "IOS Kmart App";
                window.location = "itms-apps://itunes.apple.com/app/id335989871";
              } else {
                productName = "Android Kmart App";
                window.location = "market://details?id=com.kmart.android";
              }
            }
            //omniture tracking for click action - tracks the dap page name and image clicked
            //OmnitureServices.trackDAPClickActions(pageName,productName);
          };
        }
      };
    }])
    // Directive for the countdown timer
    .directive('countownTimer', ['$interval', '$timeout',
    function ($interval, $timeout) {
      return function (scope, element, attrs) {

        //function breaks down the time remaining into days, hours ,minutes, and seconds
        function updateTime() {
          var eventDay = new Date(attrs.eventdate);
          //console.log("Event Date ===", new Date(attrs.eventdate));
          scope.seconds = (eventDay - new Date()) / 1000;
          scope.timeTillEvent = {
            daysLeft: parseInt(scope.seconds / 86400),
            hoursLeft: parseInt(scope.seconds % 86400 / 3600),
            minutesLeft: parseInt(scope.seconds % 86400 % 3600 / 60),
            secondsLeft: parseInt(scope.seconds % 86400 % 3600 % 60)
          };

          //HTML template to display timer
          var container1 = '<div class="grid4 timerGrid"><div class="timerContainer"><div>';
          var container2 = '</div><div class="dhms">';
          var container3 = '</div></div></div>';
          var display =
          '<div class="timerOuterCont">'+
          container1 + scope.timeTillEvent.daysLeft + container2 + 'DAYS' + container3 +
          container1 + scope.timeTillEvent.hoursLeft + container2 + 'HOURS' + container3 +
          container1 + scope.timeTillEvent.minutesLeft + container2 + 'MINUTES' + container3 +
          container1 + scope.timeTillEvent.secondsLeft + container2 + 'SECONDS' + container3 +
          '</div>';
          element.html(display);
        }

        //set interval to update the time remaining every second
        $interval(function () {
          scope.$applyAsync(updateTime());
        }, 1000);
      };

}]);
