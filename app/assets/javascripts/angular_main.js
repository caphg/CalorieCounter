var app = angular.module('caloriesApp', ['ngResource']);

app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.headers.patch = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };

    $httpProvider.defaults.headers.post = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
}]);

app.filter('firstLetter', function() {
    return function(input) {
        return input.charAt(0).toUpperCase();
    }
});

app.controller('CaloriesController', ['$scope', '$http',  function($scope, $http) {


    $scope.init = function () {
        //fetch data
        $http({
            url: "/entries.json",
            method: "GET"
        }).success(function(data){
            $scope.entries = data;
        });
    };


}]);
