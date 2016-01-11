## Paginator
This AngularJS directive creates pagination.
<br />
![Paginator](https://raw.githubusercontent.com/vinigem/AngularJS/master/Paginator/Paginator.jpg?_sm_au_=ijsz9M48KqZsQ75q)

### Usage
`<paginator view-count="5" page-count="10" total-count="100" fetch-records="fetchRecords" />`

view-count -> No of records to be displayed on the screen<br />
page-count -> No of page links to be displayed at a time<br />
total-count -> To tal no of records<br />
fetch-records -> Method to be called on to fetch records<br />

### Method signature
<br />
       ` $scope.fetchRecords = function(start, max){`<br />
		`$scope.tableData = records.slice(start, start + max);`<br />
	`};`
<br />
Here start is the start index of the record and max is the max no of records from the start index to be fetched.
These values will be provided by the directive itself.
