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
var keys_1 = require("./keys");
var axios_1 = require("axios");
var moment = require("moment");
var querystring = require('querystring');
var token = '';
var tokenTime = 0;
//console.log(token, 'wut')
exports.handleAuthenticate = {
    authenticate: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var now, expires_in, diff, url, body, config;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    now = new Date();
                    expires_in = moment().add(tokenTime, 'seconds');
                    diff = expires_in.isAfter(now);
                    if (!(token === '' && diff === false)) return [3 /*break*/, 2];
                    url = keys_1.keys.oauthUrl;
                    body = querystring.stringify({
                        'grant_type': 'client_credentials',
                        'client_id': keys_1.keys.key,
                        'client_secret': keys_1.keys.secret
                    });
                    config = {
                        'Content-type': 'application/x-www-form-urlencoded'
                    };
                    return [4 /*yield*/, axios_1["default"].post(url, body, config)
                            .then(function (response) { return __awaiter(void 0, void 0, void 0, function () {
                            var data;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, response.data];
                                    case 1:
                                        data = _a.sent();
                                        token = data.access_token;
                                        tokenTime = data.expires_in;
                                        console.log(data, 'jag är data');
                                        return [2 /*return*/, token];
                                }
                            });
                        }); }, function (error) {
                            console.log(error);
                        })];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    console.log(token, 'jag är en token som redan finns');
                    _a.label = 3;
                case 3:
                    res.locals.token = token;
                    next();
                    return [2 /*return*/];
            }
        });
    }); }
    /*try {
        let request = await axios.post(url, body, config)
        let response = request

        if (response.status >= 400 ) {
            return response.status + 'Error: ' + response.statusText
           
            
            //return await token
    
            //console.log(response.data)
        } else {
            console.log(response.data.access_token)
            return await response.data.access_token;
        }

    } catch(error) {
        console.log(error)
    }*/
};
