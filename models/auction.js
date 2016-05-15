"use strict";

var express = require("express");
var mongoose = require("mongoose");
var moment = require("moment");

var auctionSchema = new mongoose.Schema({
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

auctionSchema.statics.createAuction = function (newAuctionData, callback) {
    var newAuction = new Auction(newAuctionData);
    var closeUnitOfTime = newAuctionData.closeUnitOfTime;
    var closeLength = newAuctionData.closeLength;
    newAuction.currentBid = newAuctionData.openingBid;
    newAuction.auctionCloseDate = moment().add(closeLength, closeUnitOfTime);
    newAuction.save(function (error, savedAuction) {
        callback(error, savedAuction);
    });
};


var Auction = mongoose.model("Auction", auctionSchema);

module.exports = Auction;