/**
 * 模仿 Express 实现简单的中间件，适用于基于浏览器的 Mock Server
 * @param {Array}    opt.middlewares 中间件
 * @param {Object}   opt.reqBody:{params:{Object}, query:{Object}} 请求体
 * @param {Function} opt.callback 处理完成后调用的函数
 */
function Middleware (opt) {
  this.queue = opt.middlewares;
  this.req = opt.reqBody;
  this.res = { ajaxReturn: opt.callback };
}

Middleware.prototype.run = function () {
  if (!this.queue.length) {
    return this.res.ajaxReturn(null, {
      success: false, errMsg: '不存在对应的中间件处理逻辑'
    });
  }
  var mdw = this.queue.shift();
  mdw.call(mdw, this.req, this.res, this.run.bind(this));
}

module.exports = Middleware;
