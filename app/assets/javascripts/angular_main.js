var app = angular.module('caloriesApp', ['ngResource']);

app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.headers.patch = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };

    $httpProvider.defaults.headers.post = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };

    $httpProvider.defaults.headers.delete = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };
}]);

app.filter('firstLetter', function() {
    return function(input) {
        return input.charAt(0).toUpperCase();
    }
});

app.controller('CaloriesController', ['$scope', '$http',  function($scope, $http) {
    $scope.editingMeal = false;
    $scope.editingCalories = false;
    $scope.editingDate = false;
    $scope.editingDescription = false;

    $scope.entry = {};

    $scope.init = function () {
        //fetch data
        $http({
            url: "/entries.json",
            method: "GET"
        }).success(function(data){
            $scope.entries = data;
        });
    };

    $scope.doneEditingMeal = function(id){
        $http({
            url: "/entries/"+id+".json",
            data: $scope.entry,
            method: "PATCH"
        }).success(function () {
            $scope.editingMeal = false;
        }).fail(function (){
            log("error updating meal");
        });
    };

    $scope.startEditingMeal = function(val){
        $scope.editingMeal = true;
        $scope.entry = val;
    };

    $scope.doneEditingCalories = function(id){
        $http({
            url: "/entries/"+id+".json",
            data: $scope.entry,
            method: "PATCH"
        }).success(function () {
            $scope.editingCalories = false;
        }).fail(function (){
            log("error updating calories");
        });
    };

    $scope.startEditingCalories = function(val){
        $scope.editingCalories = true;
        $scope.entry = val;
    };

    $scope.doneEditingDate = function(id){
        $http({
            url: "/entries/"+id+".json",
            data: $scope.entry,
            method: "PATCH"
        }).success(function () {
            $scope.editingDate = false;
        }).fail(function (){
            log("error updating date");
        });
    };

    $scope.startEditingDate = function(val){
        $scope.editingDate = true;
        $scope.entry = val;
    };

    $scope.doneEditingDescription = function(id){
        $http({
            url: "/entries/"+id+".json",
            data: $scope.entry,
            method: "PATCH"
        }).success(function () {
            $scope.editingDescription = false;
        }).fail(function (){
            log("error updating description");
        });
    };

    $scope.startEditingDescription = function(val){
        $scope.editingDescription = true;
        $scope.entry = val;
    };
    
    $scope.deleteEntry = function (id, index) {
        if( confirm("Are you sure?") ) {
            $http({
                url: "/entries/"+id+".json",
                method: "DELETE"
            }).success(function () {
                $scope.entries.splice(index,1);
            }).fail(function (){
                log("error updating description");
            });

        }

    };

}]);
