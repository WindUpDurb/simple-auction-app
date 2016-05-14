"use strict";

var express = require("express");
var router = express.Router();
var User = require("../models/user");

router.route("/")
    .get(function (request, response) {
        User.find({}, function (error, users) {
            if (error) response.status(400).send(error);
            response.send(users);
      });
    })
    .post(function (request, response) {
        var newUserData = request.body;
        User.register(newUserData, function (error) {
            if (error) response.status(400).send(error);
            response.send("New user has been created");
        });
    });

router.post("/login", function (request, response) {
    var loginData = request.body;
    
    User.authenticate(loginData, function (error, token) {
        if (error) response.status(400).send(error);

        response.cookie("accessToken", token).send();
    })
});

router.post("/logout", function (request, response) {
    response.clearCookie("accessToken").send();
});

router.get("/profile", User.isLoggedIn, function (request, response) {
    console.log("request.user: ", request.user);
    response.send();
});


module.exports = router;