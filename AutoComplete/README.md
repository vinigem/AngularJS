## Auto-Complete
This AngularJS directive creates Auto-Complete.
<br />
![AutoComplete](https://raw.githubusercontent.com/vinigem/AngularJS/master/AutoComplete/AutoComplete.jpg)
![AutoComplete](https://raw.githubusercontent.com/vinigem/AngularJS/master/AutoComplete/AutoComplete2.jpg)

### Usage
`<auto-complete get-items="getBookNames" selected-items="selectedBooks" placeholder="Search Name" multiselect="false" />`

<b>get-items</b> -> Method to get Items to show as suggestions<br />
<b>selected-items</b> -> Array to store multiselected items<br />
<b>placeholder</b> -> Placeholder value to display<br />
<b>multiselect</b> -> To enable/disable multiselect option<br />

### Method signature
<br />
       ` $scope.getBookNames = function(searchString){`<br />
		`var bookNames = [];`<br />
		`if(!searchString || searchString.length <= 0){`<br />
		`return bookNames;`<br />
		`}`<br />
	`return bookService.getBookNames(searchString, 10);`<br />
	`}`<br />
Here <b>searchString</b> is the string typed by the user for which suggestions will be fetched.
