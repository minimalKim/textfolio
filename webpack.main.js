const path = require('path');

const { merge } = require('webpack-merge');

const baseConfig = require('./webpack.base');

module.exports = merge(baseConfig, {
  entry: {
    main: './src/main/main.ts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
  },
  target: 'electron-main',
});
