/**
 * autocomplete.js
 * @author Vinit Kumar
 */

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
		template: '<div class="auto-complete">'+
					'<input type="text" class="auto-complete-input" ng-model="searchItem" placeholder="{{placeholder}}" />'+
					'<div class="auto-complete-results" ng-show="showResults">'+
						'<ul class="ac-results-list" ng-if="multiselect">'+
							'<li ng-repeat="resultItem in resultItems track by $index"> <input type="checkbox" name="selection[]" ng-model="selection.val" ng-change="changeSelection(resultItem)" /> {{resultItem}}</li>'+
						'</ul>'+
						'<ul class="ac-results-list" ng-if="!multiselect">'+
							'<li ng-repeat="resultItem in resultItems track by $index" ng-click="selectItem(resultItem);">{{resultItem}}</li>'+
						'</ul>'+
					'</div>'+
				   '</div>'
	}
});

