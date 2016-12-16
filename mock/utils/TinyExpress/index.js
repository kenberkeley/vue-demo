var pathToRegexp = require('path-to-regexp'),
  typeOf = require('./utils/typeOf'),
  getParams = require('./utils/getParams'),
  getInitReq = require('./utils/genInitReq');

/** init **/
function TinyExpress () {
  this.globalMiddlewares = [];

  Object.defineProperty(this, 'routes', {
    set: function () {
      this._setNullForRouteMiddlewares();
    }
  });
  this.routes = [];
}

var proto = TinyExpress.prototype;

proto.receive = function (reqBody, callback) {
  this.req = getInitReq(reqBody);
  this.res = { json: callback }; // 仅提供 res.json

  // TODO
};

proto.getRouteMiddlewares = function () {
  for (var i = 0; i < this.routes.length; i++) {
    var route = this.routes[i];

    // 先匹配请求方法
    if (route.method.toUpperCase() !== this.req.method) continue;

    // 再匹配请求路径
    var paramKeys = [],
      regex = pathToRegexp(route.path, paramKeys),
      matchedResult = regex.exec(this.req.path);

    if (!matchedResult) continue;
    this.req.params = getParams(paramKeys, matchedResult);

    // 在此 handler 与 middleware 无异
    return (route.middlewares || []).concat(route.handler);
  }
};
/**
 * app.use(<globalMiddleware>)
 * app.use([{ <path>, <method>, <middlewares>, <handler> }, ...])
 * app.use({<path>, <method>, <middlewares>, <handler>})
 */
proto.use = function (entity) {
  switch(typeOf(entity)) {
    case 'function':
      this.globalMiddlewares.push(entity);
      break;
    case 'array':
      this.routes = entity;
      break;
    case 'object':
      this.routes.push(entity);
      break;
    default:
      throw new Error('传入了不支持的参数类型');
  }
};

// app.VERB(<path>, <middlewares?>, handler)
['get', 'post', 'put', 'delete'].forEach(function (method) {
  proto[method] = function (path, middlewares, handler) {
    var route = { path: path };
    route.handler = handler ? (
      handler && (route.middlewares = middlewares)
    ) : middlewares;

    this.routes.push(route);
  };
});

proto._setNullForRouteMiddlewares = function () {
  var globalMdw = this.globalMiddlewares;
  if (!globalMdw.length) return;
  if (globalMdw.indexOf(null) === -1) globalMdw.push(null);
};
