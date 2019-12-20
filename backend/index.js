"use strict";
exports.__esModule = true;
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function (req, res) {
    res.send('Hell haahahah');
});
// Access the parse results as request.body
app.post('/', function (req, res) {
    // Formulär data
    console.log(req.body.to);
    console.log(req.body.from);
    /*  const to = req.body.to
     const from = req.body.from */
    // Skicka till västtrafik för att hämta Stops
    // Skicka tillbaka till klienten 
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});
var searchController = require('./searchController');
app.route('/search').get(searchController.search);
var port = 5000;
app.listen(port, function () { return console.log("Listening on port " + (process.env.PORT || port)); });
