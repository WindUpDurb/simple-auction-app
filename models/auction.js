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
    User.findById(newAuctionData.createdBy, function (error, databaseUser) {
        if (error || !databaseUser) return callback(error || { error : "Something is not right."});
        bcrypt.compare(newAuctionData.password, databaseUser.password, function (error, isGood) {
            if (error || !isGood) return callback(error || {error : "Authentication Failed" });

            var newAuction = new Auction(newAuctionData);
            newAuction.currentBid = newAuctionData.openingBid;
            newAuction.save(function (error, savedAuction) {
               if (error) return callback(error);
                var copyOfSavedAuctionID = savedAuction.id;
                databaseUser.openAuctions.push(copyOfSavedAuctionID);
                databaseUser.save(function (error, updatedUser) {
                    if (error) return callback(error);
                    callback(null, savedAuction, updatedUser);
                })
            });
        });
    });
};

auctionSchema.statics.submitBid = function (newBidData, auctionID, callback) {
    //verify user password
    //get auction data
    //verify auction is active and newBid is over current bid
    //move current bid to bid history, and update current bid
    //push auctionID to User.biddingOn
    //save user data and auction data
    User.findById(newBidData.userID, function (error, databaseUser) {
        if (error || !databaseUser) return callback(error || { error : "User data is not found." });

        bcrypt.compare(newBidData.userPassword, databaseUser.password, function (error, isGood) {
            if (error || !isGood) return callback(error || { error : "Authentication Failed." });

            Auction.findById(auctionID, function (error, auctionData) {
                if (error || !auctionData) return callback(error || { error : "There is no auction" });
                if (!auctionData.active) return callback({ error : "The auction has already closed." });
                if (newBidData.newBid <= auctionData.currentBid) return callback({ error : "Not an acceptable bid; It is lower than the current bid."});

                auctionData.bidHistory.push(auctionData.currentBid);
                auctionData.currentBid = newBidData.newBid;

                if(databaseUser.biddingOn.indexOf(auctionID) === -1 ) {
                    databaseUser.biddingOn.push(auctionID);
                }

                auctionData.save(function (error, savedAuction) {
                    if (error) return callback(error);
                    databaseUser.save(function (error2, savedUser) {
                        if (error) return callback(error2);
                        callback(null, savedAuction, savedUser);
                    });
                });
            });
        });
    });
};

var Auction = mongoose.model("Auction", auctionSchema);

module.exports = Auction;