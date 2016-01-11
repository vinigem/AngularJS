/**
 * app.js
 * @author Vinit Kumar
 */

var myApp = angular.module('myApp', ['paginator']);

myApp.controller('paginationController', function($scope){
	var records = [];
	
	for(var i=0; i<98; i++){
		records[i] = i+1;
	}
	
	$scope.tableData = [];
		
	// To be called from Paginator to fetch records
	$scope.fetchRecords = function(start, max){
		$scope.tableData = records.slice(start, start + max);
	};
		
});
