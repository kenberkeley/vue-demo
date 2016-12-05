var pathToRegexp = require('path-to-regexp');
var qs = require('qs');
var Promise = require('es6-promise').Promise;
var getParams = require('../utils/getParams');
var routes = require('./_routes');
var Middleware = require('../utils/Middleware');

// 实现 xhr 接口
var xhr = function (reqBody) {
  reqBody.method = (reqBody.method || 'GET').toUpperCase();
  var url = reqBody.url;

  for (var i = 0; i < routes.length; i++) {
    var paramKeys = [];
    var regex = pathToRegexp(routes[i].path, paramKeys);

    var re = regex.exec(url);
    if (re) {
      var params = getParams(paramKeys, re);
      var query = qs.parse(url.split(?)[1]);

      var middlewares = (route[i].middlewares || []).concat(route[i].handler)

      var mdw = new Middleware({
        middlewares: middlewares,
        req: {
          params: params,
          query: query
        },
        callback: function (data) {
          return Promise.resolve(data)
        }
      });

      mdw.run(); // 执行！
    }
  }
};
