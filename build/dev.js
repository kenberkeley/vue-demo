var express = require('express'),
  webpack = require('webpack'),
  PATHS = require('./config/PATHS'),
  PORTS = require('./config/PORTS'),
  config = require('./webpack.dev.conf'),
  proxy = require('http-proxy-middleware'),
  app = express();

// 开发环境下直接将 _# 及 #_ 去掉
var stringReplaceLoader = 'string-replace?search=(_#|#_)&replace=&flags=g';
config.module.preLoaders = [{
  test: /.*$/,
  loader: stringReplaceLoader,
  include: PATHS.SRC,
  exclude: /node_modules/
}];
config.vue.loaders.js = stringReplaceLoader + '!babel!eslint';
config.vue.loaders.html = stringReplaceLoader + '!vue-html';

var compiler = webpack(config);

// 提供静态资源服务
app.use('/static', express.static(PATHS.STATIC));
app.use('/docs', express.static(PATHS.DOCS));

// Mock server
require(PATHS.MOCK.join('node-app')).listen(PORTS.MOCK_SERVER);
app.use('/api', proxy({
  target: 'http://127.0.0.1:' + PORTS.MOCK_SERVER,
  changeOrigin: true,
  pathRewrite: {
    // 重写 URL：[Dev Server]/api/xxx <=> [Mock Server]/xxx
    '^/api': '/'
  }
}));

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

// serve webpack bundle output
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

// enable hot-reload and state-preserving
// compilation error display
app.use(require('webpack-hot-middleware')(compiler));

app.listen(PORTS.DEV_SERVER);
