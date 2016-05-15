"use strict";

var express = require("express");
var mongoose = require("mongoose");
var moment = require("moment");
var User = require("./user");
var bcrypt = require('bcrypt');

var auctionSchema = new mongoose.Schema({
    active : { type : Boolean, required : true, default : true },
    openingBid : { type : Number, required : true },
    closingBid : { type : Number },
    currentBid : { type : Number },
    bidHistory : [{ type : Number }],
    createdBy : { type : mongoose.Schema.Types.ObjectId, required : true },
    auctionOpenDate : { type : Date, required : true, default : moment() },
    auctionCloseDate : { type : Date, required : true },
    auctionTitle : { type : String, required : true },
    auctionDescription : { type : String },
    auctionImages : [{ type : String }]
});

//create middleware so that it checks on the active status of an auction
//if false, cannot interact; it is a closed auction
// have expiration set active status to false

auctionSchema.statics.createAuction = function (newAuctionData, callback) {
    User.findById(newAuctionData._id, function (error, databaseUser) {
        if (error || !databaseUser) return callback(error || { error : "Something is not right."});

        bcrypt.compare(newAuctionData.password, databaseUser.password, function (error, isGood) {
            if (error || !isGood) return callback(error || {error : "Authentication Failed" });

            var newAuction = new Auction(newAuctionData);
            newAuction.currentBid = newAuctionData.openingBid;
            newAuction.createdBy = databaseUser._id;
            newAuction.save(function (error, savedAuction) {
               if (error) return callback(error);
                databaseUser.openAuctions.push(savedAuction._id);
                databaseUser.save(function (error, updatedUser) {
                    if (error) return callback(error);
                    callback(null, savedAuction, updatedUser);
                })
            });
        });
    });
};


var Auction = mongoose.model("Auction", auctionSchema);

module.exports = Auction;