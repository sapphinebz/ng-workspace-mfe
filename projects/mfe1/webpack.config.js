const {
  shareAll,
  withModuleFederationPlugin,
} = require("@angular-architects/module-federation/webpack");

module.exports = withModuleFederationPlugin({
  name: "mfe1",

  exposes: {
    "./Component": "./projects/mfe1/src/app/app.component.ts",
    "./Download": "./projects/mfe1/src/app/download/download.component.ts",
    "./Upload": "./projects/mfe1/src/app/upload/upload.component.ts",
  },

  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: "auto",
    }),
  },
});
