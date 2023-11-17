module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // [BEGIN] For react-query, this could be removed if we upgrade to react-native 0.73
      ['@babel/plugin-transform-flow-strip-types', { loose: true }],
      ['@babel/plugin-transform-private-methods', { loose: true }],
      // [END] For react-query

      // Required for expo-router
      'expo-router/babel',
    ],
  };
};
