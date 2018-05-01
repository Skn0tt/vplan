const webpack = require("webpack");
require("dotenv").config();

module.exports = ({ platform }, { module, resolve, plugins }) => ({
  entry: `./src/index.tsx`,
  module: {
    ...module,
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      },
      ...module.rules
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      API_BASEURL: JSON.stringify(process.env.API_BASEURL),
      IMPRINT_URL: JSON.stringify(process.env.IMPRINT_URL)
    }),
    ...plugins
  ],
  resolve: {
    ...resolve,
    extensions: [
      ".ts",
      ".tsx",
      `.${platform}.ts`,
      ".native.ts",
      `.${platform}.tsx`,
      ".native.tsx",
      ...resolve.extensions
    ]
  }
});
