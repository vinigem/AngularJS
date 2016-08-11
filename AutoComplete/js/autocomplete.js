/**
 * autocomplete.js
 * @author Vinit Kumar
 */

var myApp = angular.module('myApp', []);

myApp.service('bookService', function($http){
	return {
		getBooks : function(size) {
			return $http({
			    url: 'getAllBooks?size='+size, 
			    method: 'GET'
			 });
		},
		getBookNames : function(searchString, size) {
			return $http({
			    url: 'getBookNames?searchString='+searchString+'&size='+size, 
			    method: 'GET'
			 });
		}
	}
});

myApp.controller('myController', function($scope){
	$scope.message = 'Welcome to the world of Spring Boot & AngularJS.';
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


myApp.directive('autoComplete', function($document) {
	return {
		restrict: 'E',
		transclude: true,
		scope: {
			getItems: '=',
			placeholder: '@',
			selectedItems: '=',
			multiselect: '='
		},
		link: function (scope, element, attrs) {
			// Method to toggle result display
			scope.toggleResultDisplay = function(show){
				scope.showResults = show;
			}

			var inputField = angular.element(element[0].querySelector('.auto-complete-input'));
			inputField.on('keyup keydown', function () {
				
				scope.$apply(function () {
					var itemPromise = scope.getItems(scope.searchItem);
					if(itemPromise && itemPromise.constructor !== Array){
						itemPromise.then(function(response){
							scope.resultItems = response.data;
						});
					}
				});
				
			});

			// To watch the results and toggle display
			scope.$watch("resultItems" , function(items){
				var show = false;
				if(items && items.length > 0){
					show = true;
				}
				scope.toggleResultDisplay(show);
			}, true);
			
			// Method to select suggestion on click
			scope.changeSelection = function(value){
				var idx = scope.selectedItems.indexOf(value);
				if(idx != -1){
					scope.selectedItems.splice(idx, 1);
				}else{
					scope.selectedItems.push(value);
				}
			}
			
			// Method to select suggestion on click
			scope.isSelected = function(value){
				var idx = scope.selectedItems.indexOf(value);
				if(idx != -1){
					return true;
				}else{
					return false;
				}
			}

			// To hide display if clicked elsewhere
			$document.on('click', function(event){
				if (element !== event.target && !element[0].contains(event.target)) {
					scope.$apply(function () {
						scope.toggleResultDisplay(false);
					});
				}
			});
			
			scope.selectItem = function(value){
				scope.searchItem = value;
				scope.toggleResultDisplay(false);
			}
		},
		templateUrl: 'templates/autocomplete.html'
	}
});

