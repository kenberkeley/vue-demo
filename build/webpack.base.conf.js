var path = require('path'),
  webpack = require('webpack');

var src = path.resolve(__dirname, '../src'); // 源码目录
var commonPath = {
  dist: path.resolve(__dirname, '../dist'), // build 后输出目录
  indexHTML: path.join(src, 'index.html'), // 入口基页
  staticDir: path.resolve(__dirname, '../static') // 无需处理的静态资源目录
};

module.exports = {
  commonPath: commonPath,
  entry: {
    app: path.join(src, 'app.js'),

    // 框架 / 类库 单独打包
    vendor: [
      'vue',
      'vue-router',
      'vue-resource',
      'vue-validator',
      'lodash'
      // 'superagent'
    ]
  },
  output: {
    path: path.join(commonPath.dist, 'static'),
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['', '.js', '.vue', '.less'],
    alias: {
      // 自定义路径别名
      COMPONENT: path.join(src, 'components'),
      SERVICE: path.join(src, 'services'),
      VIEW: path.join(src, 'views'),
      UTIL: path.join(src, 'utils'),
      VALIDATOR: path.join(src, 'utils/validator')
    }
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  module: {
    loaders: [{
      test: /\.vue$/,
      loader: 'vue'
    }, {
      test: /\.js$/,
      loader: 'babel!eslint',
      exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.html$/,
      loader: 'html'
    }, {
      test: /\.less$/,
      loader: 'css!less'
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'url',
      query: {
        limit: 10000,
        name: '[name].[ext]?[hash]'
      }
    }, {
      test: /\.(eot|woff|ttf|svg)$/,
      loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
    }]
  },
  vue: {
    loaders: {
      js: 'babel!eslint',
      less: 'vue-style!css!less',
      sass: 'vue-style!css!sass'
    }
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'mainifest']
    }),
    new webpack.DefinePlugin({
      // 配置开发全局常量
      __DEV__: process.env.NODE_ENV.trim() === 'development',
      __PROD__: process.env.NODE_ENV.trim() === 'production'
    })
  ]
};
