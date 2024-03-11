"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMetroBundlePlugin = void 0;
var devtools_1 = require("expo/devtools");
var react_1 = require("react");
function useMetroBundlePlugin() {
    var client = (0, devtools_1.useDevToolsPluginClient)('metro-bundle-plugin');
    (0, react_1.useEffect)(function () {
        var subscriptions = [];
        subscriptions.push(client === null || client === void 0 ? void 0 : client.addMessageListener('ping', function (data) {
            alert("Received ping from ".concat(data.from));
        }));
        client === null || client === void 0 ? void 0 : client.sendMessage('ping', { from: 'app' });
        return function () {
            for (var _i = 0, subscriptions_1 = subscriptions; _i < subscriptions_1.length; _i++) {
                var subscription = subscriptions_1[_i];
                subscription === null || subscription === void 0 ? void 0 : subscription.remove();
            }
        };
    }, [client]);
}
exports.useMetroBundlePlugin = useMetroBundlePlugin;
//# sourceMappingURL=useMetroBundlePlugin.js.map