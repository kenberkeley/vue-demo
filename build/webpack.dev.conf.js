var webpack = require('webpack'),
  PATHS = require('./config/PATHS'),
  PORTS = require('./config/PORTS'),
  config = require('./webpack.base.conf'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  BrowserSyncPlugin = require('browser-sync-webpack-plugin');

config.output.filename = '[name].js';
config.output.chunkFilename = '[id].js';

// add hot-reload related code to entry chunk
config.entry.app = [
  'eventsource-polyfill',
  'webpack-hot-middleware/client?reload=true',
  config.entry.app
];

config.output.publicPath = '';

config.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new ExtractTextPlugin('[name].css'),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: PATHS.SRC.join('index.html')
  }),
  new BrowserSyncPlugin({
    host: 'localhost',
    port: PORTS.BROWSER_SYNC,
    proxy: 'localhost:' + PORTS.DEV_SERVER,
    notify: false
  }, {
    reload: false
  })
);

module.exports = config;
