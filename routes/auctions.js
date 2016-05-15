"use strict";

var express = require("express");
var router = express.Router();
var Auction = require("../models/auction");

router.route("/")
    .get(function (request, response) {
        Auction.find({}, function (error, auctionData) {
            if (error) response.status(400).send(error);

            response.send(auctionData);

        })
    })
    .post(function (request, response) {
        var newAuctionData = request.body;
        Auction.createAuction(newAuctionData, function (error, newAuction) {
            if (error) response.status(400).send(error);
            response.send(newAuction);
        })
        
    })







module.exports = router;