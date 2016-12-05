var express = require('express'),
  bodyParser = require('body-parser'),
  routes = require('./_routes'),
  PORTS = require('../../build/config/PORTS');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 根据 app.<verb>(<path>, <[middlewares]?>, <handler>) 挂载路由
routes.forEach(function (route) {
  var opts = [route.path];
  if (route.middlewares) opts.push(route.middlewares);
  opts.push(route.handler);

  app[route.method.toLowerCase()].apply(app, opts);
});

app.listen(PORTS.MOCK_SERVER);
