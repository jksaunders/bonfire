const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const exclude = /(node_modules)|(.*\.stories\.js)|(.*\.test\.js)/;

module.exports = () => ({
  entry: {
    index: './src/index.js',
  },
  devtool: 'inline-source-map',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    library: 'bonfire',
    libraryTarget: 'umd',
  },
  externals: ['react', 'prop-types', 'styled-components'],
  plugins: [new CleanWebpackPlugin()],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        exclude,
        loader: 'eslint-loader',
        options: {
          emitWarnings: true,
          configFile: './.eslintrc',
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
});
