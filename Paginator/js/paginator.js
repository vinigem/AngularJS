/**
 * paginator.js
 * @author Vinit Kumar
 * 
 * This directive creates pagination as per the paramters provided.
 * It is fully customizable.
 */
angular.module('paginator', []).directive('paginator', function(){
	return {
		restrict: 'EA',
		scope: {
			viewCount: '=',
			pageCount: '=',
			totalCount: '=',
			onFirst: '=',
			onLast: '=',
			onNext: '=',
			onPrev: '=',
			onPage: '='
		},
		link: function(scope, element, attrs){
			// to store start index
			scope.start = 0;
			scope.viewCount = parseInt(scope.viewCount);
			scope.pageCount = parseInt(scope.pageCount);
			scope.totalCount = parseInt(scope.totalCount);
			
			// to store current page number
			scope.currentPage = 0;
						
			// Get total no. of pages
			if(scope.totalCount % scope.viewCount == 0){
				scope.totalPages = scope.totalCount / scope.viewCount;
			}else{
				scope.totalPages = parseInt(scope.totalCount / scope.viewCount) + 1;
			}
			
			// To be called when 'First' link is clicked
			scope.callFirst = function(){
				scope.start = 0;
				scope.onFirst(scope.start, scope.viewCount);
			};
			
			// To be called when 'Last' link is clicked
			scope.callLast = function(){
				scope.start = (scope.totalPages - 1) * scope.viewCount;
				scope.onLast(scope.start, scope.viewCount);
			};
			
			/// To be called when 'Next' link is clicked
			scope.callNext = function(){
				scope.start += scope.viewCount;
				scope.onNext(scope.start, scope.viewCount);
			};
			
			// To be called when 'Prev' link is clicked
			scope.callPrev = function(){
				scope.start -= scope.viewCount;
				scope.onPrev(scope.start, scope.viewCount);
			};
			
			// To be called when 'Page' link is clicked
			scope.callPage = function(pageNo){
				scope.start = (pageNo - 1) * scope.viewCount;
				scope.onPage(scope.start, scope.viewCount);
			};
						
			// to add page no links
			scope.$watch('start', function(newValue, oldValue) {
				// to store page no. array
				scope.pages = [];
				scope.currentPage = (newValue / scope.viewCount) + 1;
				
				if(scope.totalPages < scope.pageCount){
					for(var i =1; i<= scope.totalPages; i++){
						scope.pages.push(i);
					}
				}else{
					var centerPage, startPage;
					if(scope.pageCount % 2 == 0){
						centerPage = parseInt(scope.pageCount / 2);
					}else{
						centerPage = parseInt(scope.pageCount / 2) + 1;
					}

					var startPage = scope.currentPage - centerPage + 1;

					while((startPage + scope.pageCount) - 1 > scope.totalPages){
						startPage--;
					}

					while (scope.pages.length < scope.pageCount && startPage <= scope.totalPages) {
						if(startPage < 1){
							startPage++;
							continue;
						}
						scope.pages.push(startPage++);
					}
				}
			});
			
			// to make the current page link active
			scope.isActive = function(pageNo){
				return pageNo === scope.currentPage;
			}
			
			// call the first page data
			scope.callFirst();
		},
		template :	"<div class='center'>" +
						"<ul class='paginator'>" +
							"<li><a href='#' id='pgFirst' ng-click='callFirst();' title='First'>&#171;</a></li>" +
							"<li><a href='#' id='pgPrev' ng-click='callPrev();' ng-if='start != 0'  title='Previous'>&#8249;</a></li>" +
							"<li ng-repeat='pageNo in pages track by $index'><a href='#' ' id='pg{{pageNo}}' ng-click='callPage(pageNo)' ng-class=\"{'active':isActive(pageNo), '': false}\"  title='Page {{pageNo}}'>{{pageNo}}</a></li>" +
							"<li><a href='#' id='pgNext' ng-click='callNext();' ng-if='start != (totalPages-1) * viewCount' title='Next'>&#8250;</a></li>" +
							"<li><a href='#'' id='pgLast' ng-click='callLast();' title='Last'>&#187;</a></li>" +
						" </ul>"+
					"</div>"
	}
});
