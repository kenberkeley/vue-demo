var pathToRegexp = require('path-to-regexp'),
  getParams = require('./utils/getParams');

module.exports = function router(req, routes) {
  for (var i = 0; i < routes.length; i++) {
    var route = routes[i];

    // 先匹配请求方法
    if (route.method.toUpperCase() !== req.method) continue;

    // 再匹配请求路径
    var paramKeys = [],
      regex = pathToRegexp(route.path, paramKeys),
      matchedResult = regex.exec(req.path);

    if (!matchedResult) continue;
    req.params = getParams(paramKeys, matchedResult);

    // 在此 handler 与 middleware 无异
    return (route.middlewares || []).concat(route.handler);
  }
};
