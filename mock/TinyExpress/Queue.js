function Queue(req, res, queue) {
  this.req = req;
  this.res = res;
  this.queue = queue;
}

Queue.prototype.run = function (err) {
  if (!this.queue.length) {
    throw new Error('中间件队列为空');
  }

  var mdw = this.queue[err ? 'pop' : 'shift']();
  mdw.call(this, this.req, this.res, this.run);
};

module.exports = Queue;
