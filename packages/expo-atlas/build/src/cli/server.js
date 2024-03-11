"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
var path_1 = __importDefault(require("path"));
var express_1 = require("@expo/server/adapter/express");
var express_2 = __importDefault(require("express"));
var compression_1 = __importDefault(require("compression"));
var morgan_1 = __importDefault(require("morgan"));
var env_1 = require("../utils/env");
var WEBUI_ROOT = path_1.default.resolve(__dirname, '../../../webui');
var CLIENT_BUILD_DIR = path_1.default.join(WEBUI_ROOT, 'dist/client');
var SERVER_BUILD_DIR = path_1.default.join(WEBUI_ROOT, 'dist/server');
function createServer(options) {
    process.env.NODE_ENV = 'production';
    process.env.EXPO_METRO_BUNDLE_STATS_FILE = options.statsFile;
    var app = (0, express_2.default)();
    app.use((0, compression_1.default)());
    // http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
    app.disable('x-powered-by');
    app.use(express_2.default.static(CLIENT_BUILD_DIR, {
        maxAge: '1h',
        extensions: ['html'],
    }));
    if (env_1.env.EXPO_DEBUG) {
        app.use((0, morgan_1.default)('tiny'));
    }
    app.all('*', (0, express_1.createRequestHandler)({
        build: SERVER_BUILD_DIR,
    }));
    return app;
}
exports.createServer = createServer;
//# sourceMappingURL=server.js.map