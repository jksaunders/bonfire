const path = require("path");

module.exports = () => ({
  entry: "./src/index.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist")
  },
  externals: [
    "react",
    "prop-types",
    "styled-components"
  ],
  plugins: [],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: "pre",
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          emitWarnings: true,
          configFile: "./.eslintrc"
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
});