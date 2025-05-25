// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Workaround for antd: https://github.com/expo/expo/discussions/36551#discussioncomment-13015890
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
