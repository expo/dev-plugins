# Expo DevTools Plugins

- A collection of Expo DevTools Plugins.
- The repository here is a Proof-Of-Concept for Expo DevTools Plugins and showing the migration effort for moving Flipper Plugins to Expo DevTools Plugins.

## Awesome Plugins

- `@dev-plugins/apollo-client`: Plugin for [Apollo Client](https://www.apollographql.com/docs/react/)

  - Credit: Most code are forked from [react-query-apollo-devtools](https://github.com/razorpay/react-native-apollo-devtools)

- `@dev-plugins/react-query`: Plugin for [TanStack Query](https://tanstack.com/query/latest/)

  - Credit: Most code are forked from [react-query-native-devtools](https://github.com/bgaleotti/react-query-native-devtools)

- `@dev-plugins/react-navigation`: Plugin for [React Navigation](https://reactnavigation.org/)

  - Credit: Most code are forked from [@react-navigation/devtools](https://github.com/react-navigation/react-navigation/tree/4797ace/packages/devtools) and the [Flipper plugin frontend](https://github.com/react-navigation/react-navigation/tree/4797ace/packages/flipper-plugin-react-navigation)

- `@dev-plugins/async-storage`: Plugin for [@react-native-async-storage/async-storage](https://github.com/react-native-async-storage/async-storage)

  - Credit: Originally contributed by [jthoward64](https://github.com/jthoward64)

- `@dev-plugins/react-native-mmkv`: Plugin for [react-native-mmkv](https://github.com/mrousavy/react-native-mmkv)

  - Credit: Originally contributed by [cyrilbo](https://github.com/cyrilbo)

- `@dev-plugins/redux`: Plugin for [redux](https://github.com/reduxjs/react-redux)

  - Credit: Originally contributed by [dannyBies](https://github.com/dannyBies)

- [`redux-devtools-expo-dev-plugin`](https://github.com/matt-oakes/redux-devtools-expo-dev-plugin): A plugin for [redux](https://github.com/reduxjs/react-redux) with the full [Redux DevTools](https://github.com/reduxjs/redux-devtools/) (from the Chrome extension)

  - Credit: [Matt Oakes](https://mattoakes.net) and based [Redux DevTools](https://github.com/reduxjs/redux-devtools/)

## Contributions

Due to the current bandwidth limitations of our team, we are unable to accept new plugin pull requests in this repository. We recommend developers to create and maintain their plugins in their own npm accounts.

However, we understand the value of community contributions and would love to showcase your work. This repository serves as a gallery for awesome plugins. If you have created a plugin and would like to share it with the community, you are welcome to submit a pull request to introduce your plugin in this README.

When submitting a pull request, please include the following:

- Name of the plugin
- Brief description of what the plugin does
- Link to the plugin's repository

We appreciate your understanding and look forward to your contributions!

## Example App

The [example app](/apps/example) is an [Expo Router](https://docs.expo.dev/routing/introduction/) app that provides test cases for plugins

- Expo Router is based on React Navigation, so you can just test `@dev-plugins/react-navigation` from visiting different screens from the app.
- [`Apollo Client`](/apps/example/src/app/apollo-client/): Apollo Client example forked from https://www.apollographql.com/docs/react/get-started/
- [`React Query`](/apps/example/src/app/react-query/): React Query example forked from https://github.com/TanStack/query/tree/5b9be1e299257e32c4c294796711f5d82f968530/examples/react/react-native
- [`React Query Time`](/apps/example/src/app/react-query-time/): React Query example forked from https://github.com/bgaleotti/react-query-native-devtools/tree/799efff17b08e9793ab27d5a93457c5d5510233c/apps/Time
