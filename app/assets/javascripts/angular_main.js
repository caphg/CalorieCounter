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

app.filter('utc', function(){

    return function(val){
        var date = new Date(val);
        return new Date(date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate(),
            date.getUTCHours(),
            date.getUTCMinutes(),
            date.getUTCSeconds());
    };

});

app.controller('CaloriesController', ['$scope', '$http',  function($scope, $http) {
    var dt = new Date();
    var dateFrom = dt.getFullYear() + "/" + (dt.getMonth()+1) + "/" + dt.getDate();
    var dateTo = dt.getFullYear() + "/" + (dt.getMonth()+1) + "/" + (dt.getDate()+1);
    $scope.editingMeal = -1;
    $scope.editingCalories = -1;
    $scope.editingDate = -1;
    $scope.editingDescription = -1;
    $scope.dateFrom = dateFrom;
    $scope.dateTo = dateTo;
    $scope.timeFrom = "00:00";
    $scope.timeTo = "23:59";
    $scope.user = {};
    $scope.entry = {};

    $scope.init = function () {
        $scope.reloadData();
        $http({
            url: "/user.json",
            method: "GET"
        }).success(function(data){
            $scope.user.daily_calories = parseInt(data.daily_calories);
        });
    };

    $scope.reloadData = function () {
        //fetch data
        $http({
            url: "/entries.json?dateFrom="+$scope.dateFrom+"&dateTo="+$scope.dateTo+"&timeFrom="+$scope.timeFrom+"&timeTo="+$scope.timeTo,
            method: "GET"
        }).success(function(data){
            $scope.entries = data;
            // $scope.totalCount();
        });
        $http({
            url: "/daily.json?dateFrom="+$scope.dateFrom+"&dateTo="+$scope.dateTo+"&timeFrom="+$scope.timeFrom+"&timeTo="+$scope.timeTo,
            method: "GET"
        }).success(function(data){
            $scope.dailyEntries = data;
        });
    };

    $scope.doneEditingMeal = function(id, cancelled){
        if(cancelled){
            $scope.editingMeal = -1;
            $scope.reloadData();
        } else {
            $http({
                url: "/entries/"+id+".json",
                data: $scope.entry,
                method: "PATCH"
            }).success(function () {
                $scope.editingMeal = -1;
            }).fail(function (){
                log("error updating meal");
            });
        }

    };

    $scope.startEditingMeal = function(val, idx){
        $scope.editingMeal = idx;
        $scope.entry = val;
    };

    $scope.doneEditingCalories = function(id, cancelled){
        if(cancelled){
            $scope.editingCalories = -1;
            $scope.reloadData();
        } else {
            $http({
                url: "/entries/"+id+".json",
                data: $scope.entry,
                method: "PATCH"
            }).success(function () {
                $scope.editingCalories = -1;
                $scope.reloadData();
            }).fail(function (){
                log("error updating calories");
            });
        }

    };

    $scope.startEditingCalories = function(val,idx){
        $scope.editingCalories = idx;
        $scope.entry = val;
    };

    $scope.doneEditingDate = function(id, cancelled){
        if(cancelled){
            $scope.editingDate = -1;
            $scope.reloadData();
        } else {
            $http({
                url: "/entries/"+id+".json",
                data: $scope.entry,
                method: "PATCH"
            }).success(function () {
                $scope.editingDate = -1;
                $scope.reloadData();
            }).fail(function (){
                log("error updating date");
            });
        }

    };

    $scope.startEditingDate = function(val, idx){
        $scope.editingDate = idx;
        $scope.entry = val;
    };

    $scope.doneEditingDescription = function(id, cancelled){
        if(cancelled){
            $scope.editingDescription = -1;
            $scope.reloadData();
        } else {
            $http({
                url: "/entries/"+id+".json",
                data: $scope.entry,
                method: "PATCH"
            }).success(function () {
                $scope.editingDescription = -1;
            }).fail(function (){
                log("error updating description");
            });
        }

    };

    $scope.startEditingDescription = function(val, idx){
        $scope.editingDescription = idx;
        $scope.entry = val;
    };
    
    $scope.deleteEntry = function (id, index) {
        if( confirm("Are you sure?") ) {
            $http({
                url: "/entries/"+id+".json",
                method: "DELETE"
            }).success(function () {
                $scope.entries.splice(index,1);
                $scope.reloadData();
                cancelEditing();
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
            $scope.reloadData();
            cancelEditing();
            resetNewForm();
        }).fail(function (data){
            alert(JSON.stringify(data));
            log("error crating entry");
        });
    };

    var resetNewForm = function () {
        $scope.newEntry.meal= "";
        $scope.newEntry.calories = "";
        $scope.newEntry.date = "";
        $scope.newEntry.description = "";
    };

    var cancelEditing = function (){
        $scope.editingMeal = -1;
        $scope.editingCalories = -1;
        $scope.editingDate = -1;
        $scope.editingDescription = -1;
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
