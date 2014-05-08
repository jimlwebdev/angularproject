		'use strict';
		jiml.namespace("jiml.module");
		jiml.module.sampleApp = angular.module('sampleApp',['ngRoute']);
		
		jiml.module.routeProvider = function($routeProvider){
			$routeProvider.
			when('/', {
				templateUrl:'views/index.html'
			}).
			otherwise({
				redirectTo:'views/index.html'
			});
		  };
		
		jiml.module.sampleApp.config(['$routeProvider',jiml.module.routeProvider]);

		jiml.module.function1 = function($scope){
		//	 $scope.greeting = { text: 'Hello' };
		}	

		jiml.module.sampleApp.controller(
			"sampleController",
			function($scope, searchService){
				$scope.searchResults = {};
				searchService.getSearch()
					.then(
						function(results){
							$scope.searchResults = results;
						}
					)
			}
		)
		jiml.module.sampleApp.service("searchService",
			function( $http, $q ) {

				return({
					getSearch: getSearch
				});
				// I get all of the friends in the remote collection.
				function getSearch() {

					var request = $http({
						method: "get",
						url: "http://tmb_rpc.qa.pdone.com/search_processor.php?mode=SEARCH&page=1&phrase=e&page_length=100&type=news",
					});

					return( request.then( handleSuccess, handleError ) );

				}
				
				function handleError( response ) {
					if (
						! angular.isObject( response.data ) ||
						! response.data.message
						) {

						return( $q.reject( "An unknown error occurred." ) );

					}
					return( $q.reject( response.data.message ) );

				}
				function handleSuccess( response ) {

					return( response.data );

				}
			}
		);