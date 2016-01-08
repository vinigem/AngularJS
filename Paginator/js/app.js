/**
 * app.js
 * @author Vinit Kumar
 */

var myApp = angular.module('myApp', []);

myApp.controller('paginationController', function($scope){
	var records = [];
	
	for(var i=0; i<98; i++){
		records[i] = i+1;
	}
	
	$scope.tableData = [];
		
	// To be called when 'First' link is clicked
	$scope.callFirst = function(start, max){
		$scope.tableData = records.slice(start, start + max);
	};
	
	// To be called when 'Last' link is clicked
	$scope.callLast = function(start, max){
		$scope.tableData = records.slice(start, start + max);
	};
	
	/// To be called when 'Next' link is clicked
	$scope.callNext = function(start, max){
		$scope.tableData = records.slice(start, start + max);
	};
	
	// To be called when 'Prev' link is clicked
	$scope.callPrev = function(start, max){
		$scope.tableData = records.slice(start, start + max);
	};
	
	// To be called when 'Page' link is clicked
	$scope.callPage = function(start, max){
		$scope.tableData = records.slice(start, start + max);
	};
});
