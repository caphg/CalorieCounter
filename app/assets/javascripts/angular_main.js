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
    //logged in user scope
    $scope.user = {};

    //all users score
    $scope.users = {};

    //chat scope
    $scope.chat = {};

    //current message
    $scope.chat.message = "";

    //all messages
    $scope.chat.messages = {};

    $scope.user.notifications = {};



    $scope.init = function () {
        //fetch data
        $http({
            url: "/users.json",
            method: "GET"
        }).success(function(data){

        });
    };


}]);
