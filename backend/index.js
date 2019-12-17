"use strict";
exports.__esModule = true;
var express = require("express");
var bodyParser = require("body-parser");
var saveLocationHandler_1 = require("./handlers/saveLocationHandler");
var authenticationHandler_1 = require("./handlers/authenticationHandler");
var app = express();
//Initiate everything before the page is loaded
//Get a token and save Locations in json file 
authenticationHandler_1["default"]();
saveLocationHandler_1["default"]();
//Set a timer to get locations to a json-file every 24h
//setInterval(locationHandler.saveAllLocation, 1000 * 60 * 60 * 24)
setInterval(saveLocationHandler_1["default"], 1000 * 30);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use('/searchJourney')
app.get('/', function (req, res, next) {
    res.send({ handleToken: authenticationHandler_1["default"] });
});
var port = 5000;
app.listen(port, function () { return console.log("Listening on port " + (process.env.PORT || port)); });
