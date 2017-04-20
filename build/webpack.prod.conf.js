var webpack = require('webpack'),
  PATHS = require('./config/PATHS'),
  config = require('./webpack.base.conf'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

config.output.filename = 'js/[name].[chunkhash:6].js';
config.output.chunkFilename = 'js/[id].[chunkhash:6].js';

config.plugins.push(
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false }
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
    minChunks: Infinity
  }),
  new webpack.optimize.AggressiveMergingPlugin(),
  new webpack.optimize.MinChunkSizePlugin({
    minChunkSize: 30000
  }),
  new ExtractTextPlugin('css/[name].[contenthash:6].css', {
    allChunks : true // 若要按需加载 CSS 则请注释掉该行
  }),
  new OptimizeCssAssetsPlugin(), // 优化 CSS（去重/压缩）
  new HtmlWebpackPlugin({
    filename: '../index.html',
    template: PATHS.SRC.join('index.html'),
    chunksSortMode: 'none'
  })
);

module.exports = config;
