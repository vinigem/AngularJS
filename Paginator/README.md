## Paginator
This AngularJS directive creates pagination.

### Usage
`<paginator view-count="5" page-count="10" total-count="100" on-first="callFirst" on-last="callLast" on-prev="callPrev" on-next="callNext" on-page="callPage"/>`

view-count -> No of records to be displayed on the screen
page-count -> No of page links to be displayed at a time
total-count -> To tal no of records
on-first -> Method to be called on click of first link
on-last-> Method to be called on click of last link
on-prev-> Method to be called on click of prev link
on-next-> Method to be called on click of next link
on-page-> Method to be called on click of page no. link

### Methods signature
All methods have the same signature like
<br />
       ` $scope.callFirst = function(start, max){`
		`$scope.tableData = records.slice(start, start + max);`
	`};`
<br />
Here start is the start index of the record and max is the max no of records from the start index to be fetched.
These values will be provided by the directive itself.
