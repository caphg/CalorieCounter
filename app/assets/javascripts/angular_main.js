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
            $scope.user.availability = data.availability;
        });
        $scope.user.fetchNotifications();
    };



    $scope.user.changeAvailability = function(option){
        $http({
            url: "/users/preferences",
            data:{"availability": option},
            method: "PATCH"
        }).success(function () {
            $scope.user.availability = option;
            $.gritter.add({
                // (string | mandatory) the heading of the notification
                title: "You are now " +option +" for chat",
                time: 4000,
                // (string | mandatory) the text inside the notification
                text: "Others will see you as " + option
            });
        }).fail(function (){
            log("error updating availability");
        });
    };

    $scope.users.fetchAll = function(room_id){
        $http({
            url: "/chat_rooms/"+room_id+".json",
            method: "GET"
        }).success(function(data){
            $scope.users = data;

        });
    };

    $scope.user.fetchNotifications = function(){
        $http({
            url: "/notifications.json",
            method: "GET"
        }).success(function(data){
            $scope.user.notifications = data;
        });
    };

    /* $scope.chat.messages.fetchAll = function(chat_room_id, chat_id){
     $http({
     url: "/chat_rooms/"+chat_room_id+"/chats/"+chat_id+"/messages.json",
     method: "GET"
     }).success(function(data){
     $scope.chat.messages = data;
     alert("ds");

     });
     };*/

    $scope.getCorrections = function () {
        $http({
            url: "/corrections.json",
            method: "GET"
        }).success(function(data){
            alert(JSON.stringify(data));
            $scope.corrections = data;
        });
    };

    $scope.chat.sendMessage = function (chat_room_id, chat_id, username) {
        $http({
            url: "/chat_rooms/"+chat_room_id+"/chats/"+chat_id+"/messages",
            data:{"text": $scope.chat.message, "chat_id": chat_id, "username": username},
            method: "POST"
        }).success(function (data) {
            //search for existing corrections
            if (data.length > 0) {
                $.gritter.add({
                    // (string | mandatory) the heading of the notification
                    title: "This message has already been corrected! Read the correction below",
                    time: 10000,
                    // (string | mandatory) the text inside the notification
                    text: data[0].text + "<hr> <a href='#' onclick='vote("+data[0].id+", true)' >+1</a> <a href='#' onclick='vote("+data[0].id+", false)' >-1</a>"
                });
            }
            $scope.chat.message = "";
            gotoBottom();
        }).fail(function (){
            log("error sending message");
        });
    };

    $scope.chat.keyboardEvents = function (key, chat_room_id, chat_id, username) {
        if(key == 13) {
            $scope.chat.sendMessage(chat_room_id, chat_id, username);
        }
    };


}]);
