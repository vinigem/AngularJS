/**
 * datatable.js
 * @author Vinit Kumar
 */

var myApp = angular.module('myApp', []);

myApp.service('datatableService', function($http){
	return {
		getData : function(size) {
			return $http({
				url: 'data/datatable.json', 
				method: 'GET'
			});
		}
	}
});

myApp.controller('datatableController', function($scope, datatableService){
	$scope.rowList = {};
	$scope.colDef = [{'fname':'First Name'}, {'lname':'Last Name'}, {'project':'Project'}, {'designation':'Designation'}];

	datatableService.getData().then(function(response){
		$scope.rowList = response.data;
	});
});



myApp.directive('dTable', function($document, $filter) {
	return {
		restrict: 'E',
		transclude: true,
		scope: {
			colDef: '=',
			rowList: "=",
			sortable: "@"
		},
		link: function (scope, element, attrs) {
			scope.sortKey = [];

			// To sort the list
			scope.sortByKey = function(key){

				if(scope.sortKey[key] !== undefined){
					// If key exist, Reverse the existing order
					scope.sortKey[key] = !scope.sortKey[key];
				}else{
					// Remove existing key and add new key
					scope.sortKey = [];
					scope.sortKey[key] = false;
				}
				scope.reverse = scope.sortKey[key];
				scope.rowList = $filter('orderBy')(scope.rowList, key, scope.reverse);
			}

		},
		templateUrl: 'templates/datatable.html'
	}
});



