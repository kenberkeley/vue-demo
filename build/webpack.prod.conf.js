var webpack = require('webpack'),
  fs = require('fs-extra'),
  PATHS = require('./config/PATHS'),
  config = require('./webpack.base.conf'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  // SOURCE_MAP = true; // 大多数情况下用不到
  SOURCE_MAP = false;

config.output.filename = '[name].[chunkhash:6].js';
config.output.chunkFilename = '[id].[chunkhash:6].js';

config.devtool = SOURCE_MAP ? 'source-map' : false;

// 生产环境下分离出 CSS 文件
config.module.loaders.push({
  test: /\.css$/,
  loader: ExtractTextPlugin.extract('style', 'css')
}, {
  test: /\.less$/,
  loader: ExtractTextPlugin.extract('style', 'css!less')
}, {
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract('style', 'css!sass')
});

fs.emptyDirSync(PATHS.DIST); // 清空 build 目录

config.plugins.push(
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),
  new webpack.optimize.CommonsChunkPlugin({
    // 公共代码分离打包
    names: ['vendor', 'mainifest']
  }),
  new webpack.optimize.AggressiveMergingPlugin(),
  new webpack.optimize.MinChunkSizePlugin({
    minChunkSize: 30000
  }),
  new ExtractTextPlugin('[name].[contenthash:6].css', {
    allChunks : true // 若要按需加载 CSS 则请注释掉该行
  }),
  new HtmlWebpackPlugin({
    filename: '../index.html',
    template: PATHS.SRC.join('index.html')
  }),
  new CopyWebpackPlugin([ // 复制高度静态资源
    {
      context: PATHS.STATIC,
      from: '**/*',
      ignore: ['*.md']
    }
  ])
);

module.exports = config;
