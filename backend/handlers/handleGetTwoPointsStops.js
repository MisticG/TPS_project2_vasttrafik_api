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
function getTwoPointStops(req, res, axios) {
    return __awaiter(this, void 0, void 0, function () {
        var data, url, response, awaitResponse, trips, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = req.body;
                    console.log(data);
                    url = "https://api.vasttrafik.se/bin/rest.exe/v2/trip?originId=" + data.originId + "&destId=" + data.destId + "&time=" + data.time + "&searchForArrival=" + data.isDepOrArrTime + "&date=" + data.date + "&needJourneyDetail=1&format=json";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, axios.get(url, {
                            headers: {
                                Authorization: "Bearer " + res.locals.token
                            }
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.data];
                case 3:
                    awaitResponse = _a.sent();
                    response.status === 200 ? awaitResponse : [];
                    trips = awaitResponse.TripList.Trip;
                    //console.log(response);
                    console.log(trips.length, 'here');
                    typeof awaitResponse.errorText === undefined && trips === undefined ? res.json([]) : res.json(trips);
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    res.json([]);
                    console.log('Something went wrong during getting current trip', error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports["default"] = getTwoPointStops;
function axiosRequest(axios, url, res) {
    return __awaiter(this, void 0, void 0, function () {
        var response, awaitResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios.get(url, {
                        headers: {
                            Authorization: "Bearer " + res.locals.token
                        }
                    })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.data];
                case 2:
                    awaitResponse = _a.sent();
                    return [4 /*yield*/, awaitResponse];
                case 3: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function getTripsWithDetails(trips, axios, res) {
    return __awaiter(this, void 0, void 0, function () {
        var test, f, tr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    test = [];
                    return [4 /*yield*/, trips.filter(function (trip) {
                            return trip.Leg.filter(function (leg) {
                                if (leg.JourneyDetailRef && leg.JourneyDetailRef !== undefined) {
                                    axiosRequest(axios, leg.JourneyDetailRef.ref, res).then(function (details) {
                                        leg.details = details.JourneyDetail;
                                        test.push(leg);
                                    }).then(function () {
                                        console.log(test);
                                    });
                                }
                            });
                        })];
                case 1:
                    f = _a.sent();
                    return [4 /*yield*/, test];
                case 2:
                    tr = _a.sent();
                    console.log(tr);
                    return [2 /*return*/, tr];
            }
        });
    });
}
/*
//1departureBoard uses id from all locations and return the next 20 stops by giving time
This method will return the next 20 departures (or less if not existing) from a given point
    in time or the next departures in a given timespan. The service can only be called for stops/stations
    by using according ID retrieved by the location method. The parameter is called id. The time and date
    are defined with the parameters date and time.


//2journyDetail arrival times can not be called directly
//3 /trip from which time a bus will leave
*/ 
