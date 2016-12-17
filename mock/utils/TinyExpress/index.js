var methods = require('./utils/methods'),
  initReq = require('./utils/initReq'),
  router = require('./router'),
  Queue = require('./Queue');

function TinyExpress () {
  // global Middlewares
  this.beforeMiddlewares = [];
  this.afterMiddlewares = [];

  this.routes = [];
}

var proto = TinyExpress.prototype;

/**
 * app.use(<globalMiddleware>)
 */
proto.use = function (middleware) {
  this[
    (this.routes.length ? 'after' : 'before') + 'Middlewares'
  ].push(middleware);
};

// app.VERB(<path>, <middlewares?>, handler)
methods.forEach(function (method) {
  proto[method] = function (path, middlewares, handler) {
    var route = { path: path };
    route.handler = handler ? (
      handler && (route.middlewares = middlewares)
    ) : middlewares;

    this.routes.push(route);
  };
});

proto.receive = function (reqBody, callback) {
  this.req = initReq(reqBody);
  this.res = { json: callback }; // 仅提供 res.json

  var middlewares = router(this.req, this.routes),
    queue = this.beforeMiddlewares.concat(
      middlewares, this.afterMiddlewares
    );
  
  (new Queue(this.req, this.res, queue)).run();
};

module.exports = TinyExpress;
