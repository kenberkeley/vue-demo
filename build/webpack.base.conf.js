var webpack = require('webpack'),
  PATHS = require('./config/PATHS'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  NyanProgressPlugin = require('nyan-progress-webpack-plugin');

module.exports = {
  entry: {
    app: PATHS.SRC.join('app.js'),

    // 框架 / 类库 单独打包
    vendor: [
      'es6-shim',
      'query-string',
      'vue',
      'vue-router'
    ]
  },
  output: {
    path: PATHS.DIST.join('static'),
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    alias: {
      // 自定义路径别名
      MOCK: PATHS.MOCK,
      ASSET: PATHS.SRC.join('assets'),
      COMPONENT: PATHS.SRC.join('components'),
      FILTER: PATHS.SRC.join('filters'),
      MIXIN: PATHS.SRC.join('mixins'),
      ROUTE: PATHS.SRC.join('routes'),
      SERVICE: PATHS.SRC.join('services'),
      UTIL: PATHS.SRC.join('utils'),
      VIEW: PATHS.SRC.join('views')
    }
  },
  resolveLoader: {
    root: PATHS.ROOT.join('node_modules')
  },
  module: {
    loaders: [{
      test: /\.vue$/,
      loader: 'vue',
      include: PATHS.SRC,
      exclude: /node_modules/
    }, {
      test: /\.js$/,
      loader: 'babel!eslint',
      include: PATHS.SRC,
      exclude: /node_modules/
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.html$/,
      loader: 'html'
    }, {
      test: /\.(png|jpe?g|gif|svg)$/,
      loader: 'url',
      query: {
        limit: 10240, // 10KB 以下使用 base64
        name: 'img/[name]-[hash:6].[ext]'
      }
    }, {
      test: /\.(woff2?|eot|ttf|otf)$/,
      loader: 'url-loader?limit=10240&name=fonts/[name]-[hash:6].[ext]'
    }]
  },
  vue: {
    loaders: {
      js: 'babel!eslint',
      css: ExtractTextPlugin.extract('vue-style', 'css'),
      less: ExtractTextPlugin.extract('vue-style', 'css!less'),
      sass: ExtractTextPlugin.extract('vue-style', 'css!sass')
    }
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  plugins: [
    new NyanProgressPlugin(), // 进度条
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV.trim()),
      // 配置开发全局常量
      __DEV__: process.env.NODE_ENV.trim() === 'development',
      __PROD__: process.env.NODE_ENV.trim() === 'production'
    })
  ]
};
