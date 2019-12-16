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
var HandleaccessToken_1 = require("./handlers/HandleaccessToken");
var axios_1 = require("axios");
var fileSytem = require("file-system");
var handleGetTwoPointsStops_1 = require("./handlers/handleGetTwoPointsStops");
var handleGetAllStops_1 = require("./handlers/handleGetAllStops");
var HandleGetTripDetail_1 = require("./handlers/HandleGetTripDetail");
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use([HandleaccessToken_1.handleAccesstoken.formHandler, HandleaccessToken_1.handleAccesstoken.handleError]);
app.get('/', function (req, res) {
    function test() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    /*  let response = await axios.get("https://api.vasttrafik.se/bin/rest.exe/v2/location.allstops?format=json", {
                             headers: {
                             Authorization: `Bearer ${res.locals.token}`,
                             },
                         })
                     let awaitResponse = await response.data.LocationList.StopLocation;
                     //console.log(awaitResponse)
                     let stringifiedlocations = JSON.stringify(awaitResponse);
                    
                     fileSytem.writeFile('locations.json', stringifiedlocations, (error, fs)=>{
                         if(error) {
                             console.log(error)
                         }
                         //console.log(stringifiedlocations)
                         res.send('Can write'+ fs)
                        
                     })
                      */
                    //check the length of json file
                    /*  fileSytem.readFile('locations.json',(error, data)=>{
                         if(error){
                             console.log(error)
                         }
                         let dataParse = JSON.parse(data)
                         console.log(dataParse.length);
                         res.json({length:dataParse.length})
                     }) */
                }
                catch (error) {
                    console.log(error, 'here');
                }
                return [2 /*return*/];
            });
        });
    }
    //test ()
    res.send('holla');
});
//Get all stops 
app.get('/locations', function (req, res) {
    handleGetAllStops_1["default"](fileSytem, res);
});
//Get orgin-dest points stops
app.post('/searchTrip', function (req, res) {
    handleGetTwoPointsStops_1["default"](req, res, axios_1["default"]);
});
//Get stop stations of specefic trip
app.post('/getTripDetail', function (req, res) {
    HandleGetTripDetail_1["default"](req, res, axios_1["default"]);
});
var port = 5000;
app.listen(port, function () { return console.log("Listening on port " + (process.env.PORT || port)); });
