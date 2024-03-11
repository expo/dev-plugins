"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
var getenv_1 = require("getenv");
exports.env = {
    get EXPO_DEBUG() {
        return (0, getenv_1.boolish)('EXPO_DEBUG', false);
    },
    get EXPO_NO_STATS_VALIDATION() {
        return (0, getenv_1.boolish)('EXPO_NO_STATS_VALIDATION', false);
    },
};
//# sourceMappingURL=env.js.map