var express = require('express'),
  webpack = require('webpack'),
  PATHS = require('./config/PATHS'),
  PORTS = require('./config/PORTS'),
  // favicon = require('express-favicon'),
  config = require('./webpack.dev.conf'),
  proxy = require('http-proxy-middleware'),
  app = express();

var compiler = webpack(config);

// for highly stable resources
app.use('/static', express.static(PATHS.STATIC));
// app.use(favicon(path.join(__dirname, '../favicon.ico')));

// Mock server
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

app.listen(PORTS.DEV_SERVER, '127.0.0.1', function(err) {
  err && console.log(err);
});
