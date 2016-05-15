"use strict";

var app = angular.module("auctionApp");

app.service("AuthServices", function ($http) {

    this.submitLogin = function (loginData) {
        return $http.post("/api/users/login", loginData)
    };

    this.getProfile = function () {
      return $http.get("/api/users/profile")
    };

    this.submitLogout = function () {
        return $http.post("/api/users/logout")
    }
});

app.service("AuctionServices", function ($http) {
    
    this.getActiveAuctions = function () {
        return $http.get("/api/auctions")
    }
    
})
