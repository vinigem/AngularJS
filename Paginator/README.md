## Paginator
This AngularJS directive creates pagination.
<br />
![Paginator](https://raw.githubusercontent.com/vinigem/AngularJS/master/Paginator/Paginator.jpg?_sm_au_=iQsHD83J8DV7s0VJ)

### Usage
`<paginator view-count="5" page-count="10" total-count="100" fetch-records="fetchRecords" />`

<b>view-count</b> -> No of records to be displayed on the screen<br />
<b>page-count</b> -> No of page links to be displayed at a time<br />
<b>total-count</b> -> To tal no of records<br />
<b>fetch-records</b> -> Method to be called on to fetch records<br />

### Method signature
<br />
       ` $scope.fetchRecords = function(start, max){`<br />
		`$scope.tableData = records.slice(start, start + max);`<br />
	`};`
<br />
Here <b>start</b> is the start index of the record and <b>max</b> is the max no of records from the start index to be fetched.<br />
These values will be provided by the directive itself.
