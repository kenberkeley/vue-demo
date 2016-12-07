/**
 * Express 的简单实现
 * @param {Array}    opt.middlewares 中间件
 * @param {Object}   opt.req         请求体
 * @param {Function} opt.callback    处理完成后调用的函数
 */
function SimpleExpress (opt) {
  this.queue = opt.middlewares;
  this.req = opt.req;
  this.res = { json: opt.callback }; // 默认仅提供 res.json
}

SimpleExpress.prototype.run = function () {
  if (!this.queue.length) {
    return this.res.json({ errMsg: '不存在对应的中间件处理逻辑' });
  }
  var mdw = this.queue.shift();
  // 传入匹配中间件参数表的参数：(req, res, next)
  mdw.call(mdw, this.req, this.res, this.run.bind(this));
};

module.exports = SimpleExpress;
