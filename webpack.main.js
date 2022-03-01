const { merge } = require('webpack-merge');

const baseConfig = require('./webpack.base');

module.exports = merge(baseConfig, {
  entry: {
    main: './src/main/main.ts',
  },
  target: 'electron-main',
});
