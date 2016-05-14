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

    $scope.submitLogin = function (loginData) {
        AuthServices.submitLogin(loginData)
            .then(function (response) {
                $scope.activeUser = response.data;
                $state.go("home")
            })
            .catch(function (error) {
                console.log("Error: ", error);
            })
    };

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

app.controller("homeController", function () {

});

app.controller("loginController", function ($scope, $state, AuthServices) {
    console.log("Login Controller")

});