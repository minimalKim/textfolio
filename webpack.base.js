const path = require('path');

const Dotenv = require('dotenv-webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// const { IgnorePlugin } = require('webpack');

// // const optionalPlugins = [];
// // if (process.platform !== 'darwin') {
// //   optionalPlugins.push(new IgnorePlugin({ resourceRegExp: /^fsevents$/ }));
// // }

module.exports = {
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
        include: path.resolve(__dirname, 'src'),
      },
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
        include: path.resolve(__dirname, 'src'),
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [new ForkTsCheckerWebpackPlugin(), new Dotenv()],
  devtool: 'inline-source-map',
};
