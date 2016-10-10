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
      'lodash',
      'superagent'
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
      COMPONENT: path.join(src, 'components'),
      SERVICE: path.join(src, 'services'),
      VIEW: path.join(src, 'views')
    }
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
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
        limit: 10000,
        name: 'img/[name]-[hash:6].[ext]'
      }
    }, {
      test: /\.(woff2?|eot|ttf|otf)$/,
      loader: 'fonts/url-loader?limit=10000&name=[name]-[hash:6].[ext]'
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
