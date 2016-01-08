/**
 * app.js
 * @author M1027533
 */

var myApp = angular.module('myApp', []);

myApp.controller('myController', function($scope){
	$scope.message = 'Welcome to the world of Spring Boot & AngularJS.';
});

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

/**
 * Directive to upload file via drop
 */
myApp.directive('fileDrop', function(){
	return {
		restrict: 'EA',
		scope: {
			file: '=',
			fileName: '='
		},
		link: function(scope, element, attrs) {
			var checkSize, isTypeValid, processDragOverOrEnter, validMimeTypes;
			
			processDragOverOrEnter = function(event) {
				if (event != null) {
					event.preventDefault();
				}
				event.dataTransfer.effectAllowed = 'copy';
				return false;
			};
			
			validMimeTypes = attrs.fileDrop;
			
			checkSize = function(size) {
				var _ref;
				if (((_ref = attrs.maxFileSize) === (void 0) || _ref === '') || (size / 1024) / 1024 < attrs.maxFileSize) {
					return true;
				} else {
					alert("File must be smaller than " + attrs.maxFileSize + " MB");
					return false;
				}
			};
			
			isTypeValid = function(type) {
				if ((validMimeTypes === (void 0) || validMimeTypes === '') || validMimeTypes.indexOf(type) > -1) {
					return true;
				} else {
					alert("Invalid file type.  File must be one of following types " + validMimeTypes);
					return false;
				}
			};
			
			element.bind('dragover', processDragOverOrEnter);
			element.bind('dragenter', processDragOverOrEnter);
			
			return element.bind('drop', function(event) {
				var file, name, reader, size, type;
				if (event != null) {
					event.preventDefault();
				}
				reader = new FileReader();
				reader.onload = function(evt) {
					if (checkSize(size) && isTypeValid(type)) {
						return scope.$apply(function() {
							scope.file = evt.target.result;
							if (angular.isString(scope.fileName)) {
								return scope.fileName = name;
							}
						});
					}
				};
				file = event.dataTransfer.files[0];
				name = file.name;
				type = file.type;
				size = file.size;
				reader.readAsDataURL(file);
				return false;
			});
		}
	};
});

/**
 * Directive to upload file via drop
 */
myApp.directive('paginator', function(){
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
							"<li><a href='#' id='pgFirst' ng-click='callFirst();'>«</a></li>" +
							"<li><a href='#' id='pgPrev' ng-click='callPrev();' ng-if='start != 0'>‹</a></li>" +
							"<li ng-repeat='pageNo in pages track by $index'><a href='#' ' id='pg{{pageNo}}' ng-click='callPage(pageNo)' ng-class=\"{'active':isActive(pageNo), '': false}\">{{pageNo}}</a></li>" +
							"<li><a href='#' id='pgNext' ng-click='callNext();' ng-if='start != (totalPages-1) * viewCount'>›</a></li>" +
							"<li><a href='#'' id='pgLast' ng-click='callLast();'>»</a></li>" +
						" </ul>"+
					"</div>"
	}
});