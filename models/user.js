"use strict";

var express = require("express");
var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var moment = require("moment");

var JWT_SECRET = process.env.JWT_SECRET;

var userSchema = new mongoose.Schema({
    email : { type : String, required : true, unique : true },
    password : { type : String, required : true },
    mailingAddress : { type : String, required : false },
    openAuctions : [{ type : mongoose.Schema.Types.ObjectId, ref : "Auction"}],
    closedAuctions : [{ type : mongoose.Schema.Types.ObjectId, ref : "Auction"}],
    biddingOn : [{ type : mongoose.Schema.Types.ObjectId, ref : "Auction"}]
});

userSchema.methods.generateToken = function () {
  var payload = {
      _id : this._id,
      exp : moment().add(7, "day").unix()
  };
  return jwt.sign(payload, JWT_SECRET);
};


userSchema.statics.register = function (userObject, callback) {
    User.findOne({ email : userObject.email }, function (error, databaseUser) {
        if (error || databaseUser) return callback(error || {error : "Email not available"});

        bcrypt.hash(userObject.password, 12, function (error, hash) {
            if (error) return callback(error);
            var user = new User(userObject);
            user.password = hash;

            user.save(function (error, savedUser) {
                savedUser.password = null;
                callback(error, savedUser);
            });
        });
    });
};


userSchema.statics.authenticate = function (loginData, callback) {
    User.findOne({ email : loginData.email }, function (error, databaseUser) {
        if (error || !databaseUser) return callback(error || { error : "Authentication Failed. Invalid email or password" });
        bcrypt.compare(loginData.password, databaseUser.password, function (error, isGood ) {
            if (error || !isGood) return callback(error || { error : "Authentication Failed." });
            var token = databaseUser.generateToken();
            var userDataToSend = databaseUser;
            userDataToSend.password = null;
            callback(null, token, userDataToSend);
        });
    });
};

userSchema.statics.isLoggedIn = function (request, response, next) {
    var token = request.cookies.accessToken;

    jwt.verify(token, JWT_SECRET, function (error, payload) {
        if (error) return response.status(401).send({ error : "Authentication Required." });
        
        User.findById(payload._id, function (error, user) {
            request.user = user;
            next();
        }).select("-password");
    });
};


var User = mongoose.model("User", userSchema);

module.exports = User;