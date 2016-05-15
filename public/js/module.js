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
        .state("accountManagement", {
            url : "/accountManagement",
            views : {
                "body" : {
                    templateUrl : "/html/accountManagement.html",
                    controller : "accountManagementController"
                }
            }
        })
        .state("accountManagementViews", {
            parent : "accountManagement",
            url : "/:directory",
            views : {
                "accountManagementViews" : {
                    templateUrl : "/html/accountManagementViews.html",
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


    $urlRouterProvider.otherwise("/");
});