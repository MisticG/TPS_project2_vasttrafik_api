"use strict";
exports.__esModule = true;
var express = require("express");
var bodyParser = require("body-parser");
//import { token } from './authenticationHandler';
//import { handleAuthenticate, Init, myCache } from './handlers/authenticationHandler';
var saveLocationHandler_1 = require("./handlers/saveLocationHandler");
var authenticationHandler_1 = require("./handlers/authenticationHandler");
var app = express();
/*Initiate everything before the page is loaded
 Get a token and save Locations in json file */
authenticationHandler_1["default"]();
saveLocationHandler_1.locationHandler.saveAllLocation();
console.log('one');
/* Sätt en timer på en dag för hämtning till json fil */
//setInterval(locationHandler.saveAllLocation, 1000 * 60 * 60 * 24)
//setInterval(locationHandler.saveAllLocation, 1000 * 30)
console.log('two');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use('/', handleAuthenticate.authenticate);
//app.use('/searchJourney')
app.get('/', function (req, res, next) {
    res.send({ myCache: authenticationHandler_1["default"]() });
    // res.send({token: res.locals.token})
});
var port = 5000;
app.listen(port, function () { return console.log("Listening on port " + (process.env.PORT || port)); });
