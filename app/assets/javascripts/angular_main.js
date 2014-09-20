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
    var dt = new Date();
    var dateFrom = dt.getFullYear() + "/" + (dt.getMonth()+1) + "/" + dt.getDate();
    var dateTo = dt.getFullYear() + "/" + (dt.getMonth()+1) + "/" + (dt.getDate()+1);
    $scope.editingMeal = false;
    $scope.editingCalories = false;
    $scope.editingDate = false;
    $scope.editingDescription = false;
    $scope.dateFrom = dateFrom;
    $scope.dateTo = dateTo;
    $scope.timeFrom = "00";
    $scope.timeTo = "23";
    $scope.user = {};
    $scope.entry = {};

    $scope.init = function () {
        //fetch data
        $http({
            url: "/entries.json?dateFrom="+$scope.dateFrom+"&dateTo="+$scope.dateTo+"&timeFrom="+$scope.timeFrom+"&timeTo="+$scope.timeTo,
            method: "GET"
        }).success(function(data){
            $scope.entries = data;
           // $scope.totalCount();
        });
        $http({
            url: "/entries.json?dateFrom="+$scope.dateFrom+"&dateTo="+$scope.dateTo+"&timeFrom="+$scope.timeFrom+"&timeTo="+$scope.timeTo+"&daily=true",
            method: "GET"
        }).success(function(data){
            $scope.dailyEntries = data;
        });
        $http({
            url: "/user.json",
            method: "GET"
        }).success(function(data){
            $scope.user.daily_calories = data.daily_calories;
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
           // $scope.totalCount();
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
         //   $scope.totalCount();
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
             //   $scope.totalCount();
            }).fail(function (){
                log("error deleting entry");
            });

        }

    };

    $scope.totalCount = function(){
        var total = 0;
        $scope.entries.forEach(function(entry) {
            total += parseInt(entry.calories);
        });
        $scope.total = total;
    };

    $scope.createNewEntry = function(){
        $http({
            url: "/entries.json",
            data: $scope.newEntry,
            method: "POST"
        }).success(function (data) {
            $scope.entries.push(data);
         //   $scope.totalCount();
        }).fail(function (){
            log("error crating entry");
        });
    };

}]);

app.controller('UserController', ['$scope', '$http',  function($scope, $http) {
    $scope.user = {};
    $scope.editingCalories = false;

    $scope.editCalories = function(){
        $scope.editingCalories = true;
    };

    $scope.init = function(){
      $http({
          url: "/user.json",
          method: "GET"
      }).success(function(data){
          $scope.user.daily_calories = data.daily_calories;
      });
    };

    $scope.update = function(){
        $http({
            url: "/user.json",
            data: {user: {daily_calories: $scope.calories}
            },
            method: "PATCH"
        }).success(function () {
            $scope.editingCalories = false;
            $scope.user.daily_calories = $scope.calories;
        }).fail(function (){
            log("error updating calories");
        });
    };
}]);
