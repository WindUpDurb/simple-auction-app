"use strict";

var app = angular.module("auctionApp");

app.controller("mainController", function ($scope, AuthServices, $state) {
    console.log("Main Controller");
    AuthServices.getProfile()
        .then(function (response) {
            $scope.activeUser = response.data;
            console.log($scope.activeUser)
        })
        .catch(function (error) {
            console.log("Error: ", error);
        });

    $scope.logout = function () {
        AuthServices.submitLogout()
            .then(function (response) {
                $scope.activeUser = null;
                $state.go("login");
            })
            .catch(function (error) {
                console.log("Error: ", error);
            })
    }
});

app.controller("dropdownController", function ($scope, $log ) {
});

app.controller("loginController", function ($scope, $state, AuthServices) {
    console.log("Login Controller")

    $scope.submitLogin = function () {
        var loginData = $scope.loginData;
        console.log("login data: ", loginData)
        AuthServices.submitLogin(loginData)
            .then(function (response) {
                $state.go("profile")
            })
            .catch(function (error) {
                console.log("Error: ", error);
            })
    }
});