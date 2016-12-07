var pathToRegexp = require('path-to-regexp'),
  qs = require('qs'),
  routes = require('./routes/'),
  getParams = require('./utils/getParams'),
  SimpleExpress = require('./utils/SimpleExpress'),
  notFound = require('./middlewares/notFound'),
  simpleLogger = require('./middlewares/simpleLogger'),
  resAjaxReturn = require('./middlewares/res.ajaxReturn');

/**
 * 通过重写 xhr 接口来实现运行在浏览器的 Mock Server，以支持纯静态页的演示
 * @param  {String} reqBody.method
 * @param  {String} reqBody.url
 * @param  {Object} reqBody.body
 * @return {Promise}
 */
var xhr = function (reqBody) {
  var defer = $.Deferred();
  var method = (reqBody.method || 'GET').toUpperCase(),
    body = reqBody.body || {},
    originalUrl = reqBody.url,
    origUrlSplit = originalUrl.split('?'),
    path = origUrlSplit[0],
    query = qs.parse(origUrlSplit[1]),
    params = {};

  var middlewares = [simpleLogger, resAjaxReturn];
  for (var i = 0; i < routes.length; i++) {
    var route = routes[i];

    // 先匹配请求方法
    if (route.method.toUpperCase() !== method) continue;

    // 再匹配请求路径
    var paramKeys = [],
      regex = pathToRegexp(route.path, paramKeys),
      matchedResult = regex.exec(path);

    if (!matchedResult) continue;
    params = getParams(paramKeys, matchedResult);

    // 在此 handler 与 middleware 无异
    middlewares = middlewares.concat(route.middlewares || []);
    middlewares.push(route.handler);
    break;
  }
  middlewares.push(notFound);

  var mockServer = new SimpleExpress({
    middlewares: middlewares,
    req: {
      method: method,
      body: body,
      originalUrl: originalUrl,
      path: path,
      query: query,
      params: params
    },
    callback: function (re) {
      if (!re.success) return alert('[Mock Server Error] ' + re.errMsg);
      defer.resolve(re.data);
    }
  });
  mockServer.run();

  return defer.promise();
};

module.exports = xhr;
