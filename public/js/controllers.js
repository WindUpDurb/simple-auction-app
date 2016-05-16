"use strict";

var app = angular.module("auctionApp");

app.controller("mainController", function ($scope, AuthServices, $state) {
    console.log("Main Controller");

    AuthServices.getProfile()
        .then(function (response) {
            $scope.activeUser = response.data;
            console.log("active user: ", $scope.activeUser)
        })
        .catch(function (error) {
            console.log("Error: ", error);
        });

    $scope.submitLogin = function (loginData) {
        AuthServices.submitLogin(loginData)
            .then(function (response) {
                console.log(response.data)
                $scope.activeUser = response.data;
                $state.go("home")
            })
            .catch(function (error) {
                console.log("Error: ", error);
            })
    };

    $scope.logout = function () {
        AuthServices.submitLogout()
            .then(function (response) {
                $scope.activeUser = null;
                $state.go("login");
            })
            .catch(function (error) {
                console.log("Error: ", error);
            })
    };

    $scope.submitRegistration = function (registrationForm) {
        if (registrationForm.password !== registrationForm.passwordConfirm || registrationForm.email !== registrationForm.emailConfirm) {
            console.log("Passwords must match. Email address must match.")
        } else {
            AuthServices.submitRegistration(registrationForm)
                .then(function (response) {
                    $state.go("login");
                })
                .catch(function (error) {
                    console.log("Error: ", error);
                })
        }
    };
});

app.controller("activeAuctionsController", function (AuctionServices, $scope) {
    console.log("Active Auctions Controller");
    AuctionServices.getActiveAuctions()
        .then(function (response) {
            $scope.activeAuctions = response.data;
            console.log($scope.activeAuctions)
        })
        .catch(function (error) {
            console.log("Error: ", error);
        })
});

app.controller("accountManagementController", function ($scope, $state, $stateParams, AccountManagementServices, AuctionServices) {
    console.log("Account Management Controller")
    
    $scope.userData = angular.copy($scope.activeUser);

    AuctionServices.getMyAuctions({_id : $scope.activeUser._id})
        .then(function (response) {
            $scope.myAuctions = response.data;
        })
        .catch(function (error) {
            console.log("Error: ", error);
        });

    $scope.submitEdits = function () {
        var editsToSubmit = $scope.userData;
        AccountManagementServices.submitAccountEdits(editsToSubmit)
            .then(function (response) {
                 $scope.userData = response.data;
            })
            .catch(function (error) {
                console.log("Error: ", error.data.error);
            })
    };

    $scope.deleteAuction = function (auctionId) {
        var toRemove = { _id : auctionId };
        console.log("To remove: ", toRemove )
        AuctionServices.removeAuction(toRemove)
            .then(function (response) {
                return AuctionServices.getMyAuctions()
            })
            .then(function (response2) {
                $scope.myAuctions = response2.data;
            })
            .catch(function (error) {
                console.log("Error: ", error);
            });
    };

    $scope.submitNewAuction = function (newAuctionData) {
        var dataToSend = angular.copy(newAuctionData);
        dataToSend.createdBy = $scope.activeUser._id;
        AuctionServices.createNewAuction(dataToSend)
            .then(function (response) {
                console.log("Response: ", response);
                $state.go("accountManagement");
            })
            .catch(function (error) {
                console.log("Error: ", error);
            })
    }

});

app.controller("auctionDetailsController", function ($scope, $stateParams, AuctionServices) {
    console.log("params: ", $stateParams);

    AuctionServices.getAuctionByID($stateParams)
        .then(function (response) {
            $scope.auctionDetails = response.data;
            console.log($scope.auctionDetails)
        })
        .catch(function (error) {
            console.log("Error: ", error);
        })
    
    $scope.submitNewBid = function (bidData) {
        var dataToSend = angular.copy(bidData);
        dataToSend.userID = $scope.activeUser._id;
        dataToSend.newBid = $scope.auctionDetails.currentBid + bidData.incrementBy;
        var auctionID = $scope.auctionDetails._id;
        AuctionServices.submitNewBid(dataToSend, auctionID)
            .then(function (response) {
                console.log("response: ", response.data);
            })
            .catch(function (error) {
                console.log("Error: ", error);
            })
    }
});


app.controller("dropdownController", function ($scope, $log ) {
});

app.controller("homeController", function () {

});
