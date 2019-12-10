"use strict";
exports.__esModule = true;
var express = require("express");
var bodyParser = require("body-parser");
var authenticationHandler_1 = require("./authenticationHandler");
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function (req, res) {
    res.send(authenticationHandler_1.authenticate());
});
var port = 5000;
app.listen(port, function () { return console.log("Listening on port " + (process.env.PORT || port)); });
