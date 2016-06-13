/**
 * app.js
 * @author Vinit Kumar
 */


var myApp = angular.module('myApp', []);

myApp.service('bookService', function($http){
	return {
		getBookNames : function(searchString, size) {
			return $http({
			    url: 'getBookNames?searchString='+searchString+'&size='+size, 
			    method: 'GET'
			 });
		}
	}
});

myApp.controller('booksController', function($scope, bookService, $rootScope){
	$scope.selectedBooks = [];
	
	$scope.getBookNames = function(searchString){
		var bookNames = [];
		if(!searchString || searchString.length <= 0){
			return bookNames;
		}

		return bookService.getBookNames(searchString, 10);
	}

});

