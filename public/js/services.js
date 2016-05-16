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
    };
    
    this.submitRegistration = function (registrationData) {
        return $http.post("/api/users", registrationData);
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
    };
    
    this.submitNewBid = function (newBidData, auctionID) {
        return $http.post(`/api/auctions/newBid/${auctionID}`, newBidData)
    }
    
});

app.service("AccountManagementServices", function ($http) {
   
    this.submitAccountEdits = function (userEdits) {
       return $http.post("/api/users/updateAccount", userEdits)
    }
    
});
