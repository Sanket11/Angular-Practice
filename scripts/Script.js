/// <reference path = "angular.min.js"> ///

var myApp = angular.module("employeeModule", ['ui.bootstrap']);

var employees = [
        { name: "Ben", dateOfBirth: new Date("November 23, 1980"), gender: "Male", salary: 55000.788 },
        { name: "Sara", dateOfBirth: new Date("May 5, 1970"), gender: "Female", salary: 68000 },
        { name: "Mark", dateOfBirth: new Date("August 15, 1974"), gender: "Male", salary: 57000 },
        { name: "Pam", dateOfBirth: new Date("October 27, 1979"), gender: "Female", salary: 53000 },
        { name: "Todd", dateOfBirth: new Date("December 30, 1983"), gender: "Male", salary: 60000 },
        { name: "Huang", dateOfBirth: new Date("July 15, 1991"), gender: "Male", salary: 50000 },
        { name: "Shan", dateOfBirth: new Date("September 11, 1992"), gender: "Male", salary: 80000 },
        { name: "Huang", dateOfBirth: new Date("May 15, 1976"), gender: "Male", salary: 50000 },
        { name: "Jay", dateOfBirth: new Date("June 11, 1981"), gender: "Male", salary: 89000 },
        { name: "Harry", dateOfBirth: new Date("January 7, 1995"), gender: "Male", salary: 71000 },
        { name: "Lucifer", dateOfBirth: new Date("March 5, 1987"), gender: "Male", salary: 41000 },
        { name: "Tom", dateOfBirth: new Date("February 19, 1977"), gender: "Male", salary: 33000 },
        { name: "John", dateOfBirth: new Date("October 17, 1969"), gender: "Male", salary: 57000 },
        { name: "Mike", dateOfBirth: new Date("July 30, 1979"), gender: "Male", salary: 59000 },
        { name: "Sally", dateOfBirth: new Date("September 15, 1988"), gender: "Female", salary: 75000 },
        { name: "Roy", dateOfBirth: new Date("August 21, 1990"), gender: "Male", salary: 90000 }
];

myApp.controller("employeeController", function ($scope) {

    //Data
    $scope.employees = employees;


    //Sorting
    $scope.sortColumn = "name";
    $scope.reverseSort = false;

    $scope.employees = $scope.employees.sort(SortByName);

    $scope.sortData = function (column) {
        $scope.reverseSort = $scope.sortColumn == column ? !$scope.reverseSort : false;
        $scope.sortColumn = column;
        
        $scope.employees = $scope.employees.sort(SortByName);

        $scope.filteredEmployees = [];
        var begin = (($scope.currentPage - 1) * $scope.numPerPage), end = begin + $scope.numPerPage;
        $scope.filteredEmployees = $scope.employees.slice(begin, end);
    }

    $scope.getSortClass = function (column) {
        if ($scope.sortColumn == column) {
            return $scope.reverseSort ? "arrow-down" : "arrow-up";
        }
        return "";
    }


    //Paging
    $scope.filteredEmployees = [];
    $scope.currentPage = 1;
    $scope.numPerPage = 5;
    $scope.maxSize = 5;

    $scope.$watch('currentPage + numPerPage', function () {
        var begin = (($scope.currentPage - 1) * $scope.numPerPage), end = begin + $scope.numPerPage;
        $scope.filteredEmployees = $scope.employees.slice(begin, end);
    });
});


//This will sort your array
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