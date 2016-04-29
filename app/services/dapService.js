// Service call to retrieve data from json file
angular.module('myApp')
	.service('DapService',
		['$http', '$q', '$rootScope', '$location',
		function($http, $q, $rootScope, $location) {

			this.getDapData = function (dapRoute) {
				console.log('DAP SERVICE CALL', dapRoute);
				var deferred = $q.defer();

				var dap = $http ({
					method: 'GET',
					url: dapRoute
				}).success(function (results,status) {
						deferred.resolve(results);
					// Route to 404 page if status is 404
					if (status == 404) {
						$location.path("/404");
					}
				}).error(function (){
					deferred.reject("No DAP found");
				});
				return deferred.promise;
			};
		}
]);
