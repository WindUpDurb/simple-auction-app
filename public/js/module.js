"use strict";

var app = angular.module("auctionApp", ["ui.router", "ngAnimate", "ui.bootstrap"]);

app.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state("home", {
            url : "/"
        })


    $urlRouterProvider.otherwise("/");
});