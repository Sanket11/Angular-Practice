﻿var employees = [
    { name: "Ben", dateOfBirth: new Date("November 23, 1980"), gender: "Male", salary: 55000.788 },
    { name: "Sara", dateOfBirth: new Date("May 5, 1970"), gender: "Female", salary: 68001.13 },
    { name: "Mark", dateOfBirth: new Date("August 15, 1974"), gender: "Male", salary: 57060.73 },
    { name: "Pam", dateOfBirth: new Date("October 27, 1979"), gender: "Female", salary: 91000.75 },
    { name: "Todd", dateOfBirth: new Date("December 30, 1983"), gender: "Male", salary: 60500.15 },
    { name: "Huang", dateOfBirth: new Date("July 15, 1991"), gender: "Male", salary: 52000.90 },
    { name: "Shan", dateOfBirth: new Date("September 11, 1992"), gender: "Male", salary: 80000 },
    { name: "Henry", dateOfBirth: new Date("May 15, 1976"), gender: "Male", salary: 54060.85 },
    { name: "Jay", dateOfBirth: new Date("June 11, 1981"), gender: "Male", salary: 89120.53 },
    { name: "Hank", dateOfBirth: new Date("January 7, 1995"), gender: "Male", salary: 71000.54 },
    { name: "Lucifer", dateOfBirth: new Date("March 5, 1987"), gender: "Male", salary: 41000.25 },
    { name: "Tom", dateOfBirth: new Date("February 19, 1977"), gender: "Male", salary: 33050.47 },
    { name: "John", dateOfBirth: new Date("October 17, 1969"), gender: "Male", salary: 57080.25 },
    { name: "Mike", dateOfBirth: new Date("July 30, 1979"), gender: "Male", salary: 59000 },
    { name: "Sally", dateOfBirth: new Date("September 15, 1988"), gender: "Female", salary: 75000 },
    { name: "Roy", dateOfBirth: new Date("August 21, 1990"), gender: "Male", salary: 90000 }
];

var myApp = angular.module("employeeModule", ['ui.bootstrap']);

myApp.filter('startFrom', function () {
	return function (input, start) {
		if (input) {
			start = +start;
			return input.slice(start);
		}
		return [];
	};
});


myApp.controller("employeeController", ['$scope', 'filterFilter', function($scope, filterFilter) {

    //Data
    $scope.employees = employees;
    $scope.filteredRecords = $scope.employees.length;


    //Sorting
    $scope.sortColumn = "name";
    $scope.reverseSort = false;

    $scope.employees = $scope.employees.sort(SortByName);

    $scope.sortData = function(column) {
        $scope.reverseSort = $scope.sortColumn == column ? !$scope.reverseSort : false;
        $scope.sortColumn = column;

        $scope.employees = $scope.employees.sort(SortByName);

        $scope.filteredEmployees = [];
        var begin = (($scope.currentPage - 1) * $scope.numPerPage), end = begin + $scope.numPerPage;
        $scope.filteredEmployees = $scope.employees.slice(begin, end);
    }

    $scope.getSortClass = function(column) {
        if ($scope.sortColumn == column) {
            return $scope.reverseSort ? "arrow-up" : "arrow-down";
        }
        return "";
    }


    //Paging
    $scope.filteredEmployees = [];
    $scope.currentPage = 1;
    $scope.entryLimit = 5;
    
    
    //Filtering
    
    // create empty search model (object) to trigger $watch on update
	$scope.search = {};

	// pagination controls
	$scope.currentPage = 1;
	$scope.totalItems = $scope.employees.length;
	$scope.entryLimit = 5; // items per page
	$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

	// $watch search to update pagination
	$scope.$watch('search', function (newVal, oldVal) {
		$scope.filteredEmployees = filterFilter($scope.employees, newVal);
		$scope.totalItems = $scope.filteredEmployees.length;
		$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
		$scope.currentPage = 1;
	}, true);
}]);


//This will sort the array
function SortByName(a, b) {
    var controllerElement = document.querySelector('body');
    var controllerScope = angular.element(controllerElement).scope();

    var sortColumn = controllerScope.sortColumn;
    var reverseSort = controllerScope.reverseSort;

    var aName, bName;
    if (typeof a[sortColumn] == "string") {
        aName = a[sortColumn].toLowerCase();
        bName = b[sortColumn].toLowerCase();
    }
    else if (typeof a[sortColumn] == "number") {
        aName = a[sortColumn]
        bName = b[sortColumn]
    }
    else if (typeof a[sortColumn] == "object") {
        aName = new Date(a[sortColumn]);
        bName = new Date(b[sortColumn]);
    }
    return reverseSort ? ((bName < aName) ? -1 : ((bName > aName) ? 1 : 0)) : ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}