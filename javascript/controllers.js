'use strict';

		jiml.namespace("jiml.controller");
		jiml.controller.function1 = function($scope){
		//	 $scope.greeting = { text: 'Hello' };
		}
		// declare top-level module which depends on filters,and services
		var sampleApp = angular.module('sampleApp',['ngRoute']);
		sampleApp.config(['$routeProvider',
		  function($routeProvider){
			$routeProvider.
			when('/', {
				templateUrl:'views/index.html'
			}).
			otherwise({
				redirectTo:'views/index.html'
			});
		  }
		]);
