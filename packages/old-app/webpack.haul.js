module.exports = ({ platform }, { module, resolve }) => ({
  entry: `./src/index.tsx`,
  module: {
    ...module,
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/
      },
      ...module.rules
    ]
  },
  resolve: {
    ...resolve,
    extensions: [
      ".ts",
      ".tsx",
      `.${platform}.ts`,
      `.${platform}.tsx`,
      ...resolve.extensions
    ]
  }
});
