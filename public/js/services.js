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
    };
    
    this.createNewAuction = function (newAuction) {
        return $http.post("/api/auctions", newAuction)
    };

    this.getMyAuctions = function (activeUserId) {
        return $http.post("/api/auctions/myAuctions", activeUserId)
    };
    
    this.removeAuction = function (auctionId) {
        return $http.post("/api/auctions/deleteAuction", auctionId)
    };
    
    this.getAuctionByID = function (auctionID) {
        return $http.post("/api/auctions/auctionByID", auctionID)
    }
    
});

app.service("AccountManagementServices", function ($http) {
   
    this.submitAccountEdits = function (userEdits) {
       return $http.post("/api/users/updateAccount", userEdits)
    }
    
});
