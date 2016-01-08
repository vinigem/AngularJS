## Paginator
This AngularJS directive creates pagination.
<br />
![Paginator](https://raw.githubusercontent.com/vinigem/AngularJS/master/Paginator/Paginator.jpg?_sm_au_=ijsz9M48KqZsQ75q)

### Usage
`<paginator view-count="5" page-count="10" total-count="100" on-first="callFirst" on-last="callLast" on-prev="callPrev" on-next="callNext" on-page="callPage"/>`

view-count -> No of records to be displayed on the screen<br />
page-count -> No of page links to be displayed at a time<br />
total-count -> To tal no of records<br />
on-first -> Method to be called on click of first link<br />
on-last-> Method to be called on click of last link<br />
on-prev-> Method to be called on click of prev link<br />
on-next-> Method to be called on click of next link<br />
on-page-> Method to be called on click of page no. link<br />

### Methods signature
All methods have the same signature like
<br />
       ` $scope.callFirst = function(start, max){`<br />
		`$scope.tableData = records.slice(start, start + max);`<br />
	`};`
<br />
Here start is the start index of the record and max is the max no of records from the start index to be fetched.
These values will be provided by the directive itself.
