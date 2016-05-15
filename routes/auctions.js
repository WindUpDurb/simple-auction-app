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
        Auction.createAuction(newAuctionData, function (error, newAuction, updatedUser) {
            if (error) response.status(400).send(error);
            console.log("updated user: ", updatedUser);
            console.log("new auction: ", newAuction);
            response.send(newAuction);
        })
    })

router.post("/deleteAuction", function (request, response) {
        var auctionToDelete = request.body;
        console.log("to delete: ", auctionToDelete)
        Auction.findByIdAndRemove(auctionToDelete, function (error) {
            if(error) {
                response.status(400).send(error);
            } else {
                response.send("Auction Has Been Deleted");
            }
        });
    });

router.post("/myAuctions", function (request, response) {
    var userId = request.body._id;
    Auction.find({ createdBy : userId}, function (error, auctionList) {
       if (error || !auctionList) response.status(400).send(error || {error : "You have no open auctions"});
       response.send(auctionList);
    });
});





module.exports = router;