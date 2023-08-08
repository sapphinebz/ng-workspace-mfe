const {
  shareAll,
  withModuleFederationPlugin,
} = require("@angular-architects/module-federation/webpack");

module.exports = withModuleFederationPlugin({
  // remotes: {
  //   mfe1: "http://localhost:4201/remoteEntry.js",
  // },

  shared: {
    // ...shareAll({
    //   singleton: true,
    //   strictVersion: true,
    //   requiredVersion: "auto",
    // }),
    "@angular/core": {
      singleton: true,
      strictVersion: true,
    },
    "@angular/common": {
      singleton: true,
      strictVersion: true,
    },
    "@angular/common/http": {
      singleton: true,
      strictVersion: true,
    },
    "@angular/router": {
      singleton: true,
      strictVersion: true,
    },
  },
});
