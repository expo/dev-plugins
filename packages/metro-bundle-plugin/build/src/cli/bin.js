#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var express_1 = require("@expo/server/adapter/express");
var express_2 = __importDefault(require("express"));
var compression_1 = __importDefault(require("compression"));
var morgan_1 = __importDefault(require("morgan"));
process.env.NODE_ENV = 'production';
var WEBUI_ROOT = path_1.default.resolve(__dirname, '../../../webui');
var CLIENT_BUILD_DIR = path_1.default.join(WEBUI_ROOT, 'dist/client');
var SERVER_BUILD_DIR = path_1.default.join(WEBUI_ROOT, 'dist/server');
var app = (0, express_2.default)();
app.use((0, compression_1.default)());
// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable('x-powered-by');
app.use(express_2.default.static(CLIENT_BUILD_DIR, {
    maxAge: '1h',
    extensions: ['html'],
}));
app.use((0, morgan_1.default)('tiny'));
app.all('*', (0, express_1.createRequestHandler)({
    build: SERVER_BUILD_DIR,
}));
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Express server listening on port ".concat(port));
});
//# sourceMappingURL=bin.js.map