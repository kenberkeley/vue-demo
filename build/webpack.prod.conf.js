var webpack = require('webpack'),
  rimraf = require('rimraf'),
  config = require('./webpack.base.conf'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  SOURCE_MAP = false;

rimraf.sync(config.commonPath.dist);

// naming output files with hashes for better caching.
// dist/index.html will be auto-generated with correct URLs.
config.output.filename = '[name].[chunkhash:6].js';
config.output.chunkFilename = '[id].[chunkhash:6].js';

config.devtool = SOURCE_MAP ? 'source-map' : false;

// generate loader string to be used with extract text plugin
function generateExtractLoaders(loaders) {
  return loaders.map(function(loader) {
    return loader + '-loader' + (SOURCE_MAP ? '?sourceMap' : '');
  }).join('!');
}

config.vue.loaders = {
  js: 'babel!eslint',
  // http://vuejs.github.io/vue-loader/configurations/extract-css.html
  css: ExtractTextPlugin.extract('vue-style-loader', generateExtractLoaders(['css'])),
  less: ExtractTextPlugin.extract('vue-style-loader', generateExtractLoaders(['css', 'less'])),
  sass: ExtractTextPlugin.extract('vue-style-loader', generateExtractLoaders(['css', 'sass']))
};

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

config.plugins.push(
  // 复制高度静态资源
  new CopyWebpackPlugin([
    {
      from: config.commonPath.staticDir,
      ignore: ['*.md']
    }
  ]),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  // extract css into its own file
  new ExtractTextPlugin('[name].[contenthash:6].css'),
  // generate dist index.html with correct asset hash for caching.
  // you can customize output by editing /build/index.template.html
  // see https://github.com/ampedandwired/html-webpack-plugin
  new HtmlWebpackPlugin({
    filename: '../index.html',
    template: config.commonPath.indexHTML
  })
);

module.exports = config;
