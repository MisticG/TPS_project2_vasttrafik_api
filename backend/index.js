"use strict";
exports.__esModule = true;
var express = require("express");
var bodyParser = require("body-parser");
//import { token } from './authenticationHandler';
var authenticationHandler_1 = require("./handlers/authenticationHandler");
var saveLocationHandler_1 = require("./handlers/saveLocationHandler");
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', authenticationHandler_1.handleAuthenticate.authenticate);
app.use('/', function (req, res, next) {
    var intervalId = setInterval(function () {
        saveLocationHandler_1.locationHandler.saveAllLocation(req, res, next);
    }, 10000);
    //next() 
});
//app.use('/', locationHandler.saveAllLocation)
app.get('/', function (req, res, next) {
    res.send({ token: res.locals.token });
});
var port = 5000;
app.listen(port, function () { return console.log("Listening on port " + (process.env.PORT || port)); });
