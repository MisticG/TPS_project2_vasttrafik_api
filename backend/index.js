"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express = require("express");
var bodyParser = require("body-parser");
var saveLocationHandler_1 = require("./handlers/saveLocationHandler");
var authenticationHandler_1 = require("./handlers/authenticationHandler");
var axios_1 = require("axios");
var fileSytem = require("file-system");
var handleGetTwoPointsStops_1 = require("./handlers/handleGetTwoPointsStops");
var handleGetAllStops_1 = require("./handlers/handleGetAllStops");
var HandleGetTripDetail_1 = require("./handlers/HandleGetTripDetail");
var handleGetTrafikInfo_1 = require("./handlers/handleGetTrafikInfo");
exports.app = express();
//Initiate everything before the page is loaded
//Get a token and save Locations in json file 
saveLocationHandler_1["default"]();
//Set a timer to get locations to a json-file every 24h
setInterval(saveLocationHandler_1["default"], 1000 * 60 * 60 * 24);
//setInterval(saveAllLocation, 1000 * 30)
exports.app.use(bodyParser.json());
exports.app.use(bodyParser.urlencoded({ extended: true }));
//app.use('/searchJourney')
//app.use([handleAccesstoken.formHandler, handleAccesstoken.handleError])
exports.app.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.send('Hello from start page');
        return [2 /*return*/];
    });
}); });
//Get all stops 
exports.app.get('/locations', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        handleGetAllStops_1["default"](fileSytem, res);
        return [2 /*return*/];
    });
}); });
//Get orgin-dest points stops
exports.app.post('/searchTrip', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, authenticationHandler_1["default"]()];
            case 1:
                token = _a.sent();
                console.log(token);
                handleGetTwoPointsStops_1["default"](req, res, axios_1["default"], token);
                return [2 /*return*/];
        }
    });
}); });
//Get stop stations of specefic trip
exports.app.post('/getTripDetail', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, authenticationHandler_1["default"]()];
            case 1:
                token = _a.sent();
                HandleGetTripDetail_1["default"](req, res, axios_1["default"], token);
                return [2 /*return*/];
        }
    });
}); });
exports.app.post('/getTrafikInfo', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, authenticationHandler_1["default"]()];
            case 1:
                token = _a.sent();
                handleGetTrafikInfo_1["default"](req, res, axios_1["default"], token);
                return [2 /*return*/];
        }
    });
}); });
exports.app.get('/', function (req, res, next) {
    res.send({ handleToken: authenticationHandler_1["default"] });
});
var port = 5000;
exports.app.listen(port, function () { return console.log("Listening on port " + (process.env.PORT || port)); });
