const path = require('path');

const exclude = /(node_modules)|(.*\.stories\.js)|(.*\.test\.js)/;

module.exports = () => ({
  entry: './src/index.js',
  devtool: 'inline-source-map',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'bonfire',
    libraryTarget: 'umd'
  },
  externals: [
    'react',
    'prop-types',
    'styled-components'
  ],
  plugins: [],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        exclude,
        loader: 'eslint-loader',
        options: {
          emitWarnings: true,
          configFile: './.eslintrc'
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
});