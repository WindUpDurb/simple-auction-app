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

app.controller("activeAuctionsController", function (AuctionServices, $scope) {
    console.log("Active Auctions Controller");
    AuctionServices.getActiveAuctions()
        .then(function (response) {
            $scope.activeAuctions = response.data;
        })
        .catch(function (error) {
            console.log("Error: ", error);
        })
});

app.controller("accountManagementController", function ($scope, $stateParams) {
   console.log("Account Management Controller");
    console.log("State params: ", $stateParams)
});


app.controller("dropdownController", function ($scope, $log ) {
});

app.controller("homeController", function () {

});
