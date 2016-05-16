"use strict";

var app = angular.module("auctionApp", ["ui.router", "ngAnimate", "ui.bootstrap"]);


app.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state("splash", {
            url : "/"
        })
        .state("login", {
            url : "/login",
            views : {
                "body" : {
                    templateUrl : "/html/login.html",
                    controller : "mainController"
                }
            }
        })
        .state("register", {
            url : "/register",
            views : {
                "body" : {
                    templateUrl : "html/register.html",
                    controller : "mainController"
                }
            }
        })
        .state("accountManagement", {
            url : "/accountManagement",
            views : {
                "body" : {
                    templateUrl : "/html/accountManagement.html",
                    controller : "accountManagementController"
                }
            }
        })
        .state("userInformation", {
            parent : "accountManagement",
            url : "/userInfo",
            views : {
                "accountManagementViews" : {
                    templateUrl : "/html/userInfo.html",
                    controller : "accountManagementController"
                }
            }
        })
        .state("manageAuctions", {
            parent : "accountManagement",
            url : "/manageAuctions",
            views : {
                "accountManagementViews" : {
                    templateUrl : "/html/manageAuctions.html",
                    controller : "accountManagementController"
                }
            }
        }).state("newAuction", {
            parent : "accountManagement",
            url : "/newAuction",
            views : {
                "accountManagementViews" : {
                    templateUrl : "/html/newAuction.html",
                    controller : "accountManagementController"
                }
            }
        })
        .state("home", {
            url : "/home",
            views : {
                "body" : {
                    templateUrl : "/html/home.html",
                    controller : "homeController"
                }
            }
        })
        .state("activeAuctions", {
            url : "/activeAuctions",
            views : {
                "body" : {
                    templateUrl : "/html/activeAuctions.html",
                    controller : "activeAuctionsController"
                }
            }
        })
        .state("auctionDetails", {
            url : "/auction/:auctionID",
            views : {
                "body" : {
                    templateUrl : "/html/auctionDetails.html",
                    controller : "auctionDetailsController"
                }
            }
        })


    $urlRouterProvider.otherwise("/");
});