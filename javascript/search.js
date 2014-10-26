		var where = "http://mb3_rpc.themedicalbag.com/",
		    search = "elastica_search_processor.php",
		    pgnum = 0,
		    srchfor = "",
		    searchParams = {
		    	"template":{
					"mode":"search",
					"word":srchfor,
					"index":"articles",
					"type":"",
					"from":pgnum,
					"limit":"99",
					"channel_id":"",
					"callback":"JSON_CALLBACK"
				},
		    	"news":{},
				"people":{},
				"drblog":{}
			};

		angular.copy(searchParams.template,searchParams.news);
		searchParams.news.type = "article";

		angular.copy(searchParams.template,searchParams.people)
		searchParams.people.type = "specialty";

		angular.copy(searchParams.template,searchParams.drblog)
		searchParams.drblog.type = "dr_blog";
		
		var	resultsHttp = {
			"template":{
				"method":"jsonp",
				"responseType":"json",
				"params":"",
				"timeout":10000,
				"url":where+search
			},
			"news":{},
			"people":{},
			"drblog":{}
		};

		angular.copy(resultsHttp.template,resultsHttp.news);
		resultsHttp.news.params = searchParams.news;
		
		angular.copy(resultsHttp.template,resultsHttp.people)
		resultsHttp.people.params = searchParams.people;
		
		angular.copy(resultsHttp.template,resultsHttp.drblog)
		resultsHttp.drblog.params = searchParams.drblog;		

		var app = angular.module( "Search", ['ngRoute','angular.filter'] )
			.controller("searchButtonController",searchButtonController)
			.directive("myHeader",myHeader)
			.directive("myFooter",myFooter)
			.service("searchService",searchService)
			.factory("searchFactory",searchFactory)
			.service("searchFactoryService",searchFactoryService)
			.filter("newsFilter",["$filter", newsFilter])
			.filter("newsFilters",["$filter", newsFilters])
			.config(configRoutes);

		function configRoutes($routeProvider){
			$routeProvider.when("/",{
				templateUrl: "views/search.html",
				controller: "searchButtonController"
			});
		}

		function configRoutesX($routeProvider){
			$routeProvider.when("/",{
				templateUrl: "views/search.html",
				controller: "searchButtonController",
				resolve: {
					searchResults: ['$route', 'searchService', function ($route, searchService) {
						return searchService.getsearch($route.current.params);
					}]
				}
			});
		}
		
		
		function myHeader(){
			return {
				  restrict: 'E',
				  templateUrl: 'views/header.html'
				};
		}
		function myFooter(){
			return {
				  restrict: 'E',
				  templateUrl: 'views/footer.html'
				};
		}
		function newsFilter($filter){
		  return function (array, key, value) {
			var obj = {};
			obj[key] = value;
			return $filter('filter')(array, obj);
		  }
		}
		function newsFilters($filter){
		  return function (array, keyValuePairs) {
			var obj={}, i=0;
			for (var i=0;i<keyValuePairs.length;i+=2) {
				if (keyValuePairs[i] && keyValuePairs[i+1]) {
					obj[keyValuePairs[i]] = keyValuePairs[i+1];
				}
			}
			return $filter('filter')(array, obj);
		  }
		}
//angularjs filter dynamic expression			
		function searchButtonController($scope, searchFactory){
			$scope.doSearch = function(){
				doSearchX($scope, searchFactory, "news");
				doSearchX($scope, searchFactory, "people");
				doSearchX($scope, searchFactory, "drblog");
			}
			$scope.doReset = function(){
				$scope.filterfld = "";
			}
			$scope.phrase = "love";
			$scope.filterfld = "";
			$scope.filtertype = "title";
		}
		
		function doSearchX(scope, searchFactory, what){
			searchParams[what].word = scope.phrase;
			
			scope[what] = [];
			searchFactory.getsearch(what)
				.then(
					function(results) {
						scope[what] = results;
					}
				);
		}

//http://viralpatel.net/blogs/angularjs-service-factory-tutorial/
		function searchFactory( $http ) {
			var factory = {
				getsearch : function(what) {
				 return( $http(resultsHttp[what]).then( handleSuccess, handleError ) );
				}
			}; 
			return factory;
		}

		function searchService( $http ) {
			this.getsearch = function(what) {
				return( $http(resultsHttp[what]).then( handleSuccess, handleError ) );
			}
		}
		
		function searchFactoryService( $http ) {
			return({
				getsearch: function(what) {
					return( $http(resultsHttp[what]).then( handleSuccess, handleError ) );
				}
			});
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
				
		angular.module('Search').directive('ngEnter', function() {
			return function(scope, element, attrs) {
				element.bind("keydown keypress", function(event) {
					if(event.which === 13) {
						scope.$apply(function(){
							scope.$eval(attrs.ngEnter, {'event': event});
						});
	
						event.preventDefault();
					}
				});
			};
	    });