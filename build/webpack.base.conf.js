var path = require('path'),
  webpack = require('webpack'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  NyanProgressPlugin = require('nyan-progress-webpack-plugin');

var rootPath = path.resolve(__dirname, '..'), // 项目根目录
  src = path.join(rootPath, 'src'); // 开发源码目录
var commonPath = {
  rootPath: rootPath,
  dist: path.join(rootPath, 'dist'), // build 后输出目录
  indexHTML: path.join(src, 'index.html'), // 入口基页
  staticDir: path.join(rootPath, 'static') // 无需处理的静态资源目录
};

module.exports = {
  commonPath: commonPath,
  entry: {
    app: path.join(src, 'app.js'),

    // 框架 / 类库 单独打包
    vendor: [
      'vue',
      'vue-router',
      'vue-validator'
      // 'vue-resource'
      // 'superagent'
    ]
  },
  output: {
    path: path.join(commonPath.dist, 'static'),
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    alias: {
      // 自定义路径别名
      ASSET: path.join(src, 'assets'),
      COMPONENT: path.join(src, 'components'),
      SERVICE: path.join(src, 'services'),
      VIEW: path.join(src, 'views'),
      UTIL: path.join(src, 'utils'),
      VALIDATOR: path.join(src, 'utils/validator')
    }
  },
  resolveLoader: {
    root: path.join(rootPath, 'node_modules')
  },
  module: {
    loaders: [{
      test: /\.vue$/,
      loader: 'vue',
      include: src,
      exclude: /node_modules/
    }, {
      test: /\.js$/,
      loader: 'babel!eslint',
      include: src,
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
      loader: 'fonts/url-loader?limit=10240&name=[name]-[hash:6].[ext]'
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
    new webpack.optimize.CommonsChunkPlugin({
      // 公共代码分离打包
      names: ['vendor', 'mainifest']
    }),
    new webpack.DefinePlugin({
      // 配置开发全局常量
      __DEV__: process.env.NODE_ENV.trim() === 'development',
      __PROD__: process.env.NODE_ENV.trim() === 'production'
    })
  ]
};
