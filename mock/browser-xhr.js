window._ = require('lodash'); // lowdb 依赖

var tinyExpress = require('tiny-express'),
  qs = require('query-string'),
  routes = require('./routes/'),
  notFound = require('./middlewares/notFound'),
  simpleLogger = require('./middlewares/simpleLogger'),
  resAjaxReturn = require('./middlewares/res.ajaxReturn');

var app = tinyExpress();
app.use(simpleLogger);
app.use(resAjaxReturn);
app.use(routes);
app.use(notFound);

/**
 * 通过重写 xhr 接口来实现运行在浏览器的 Mock Server，以支持纯静态页的演示
 * @param  {String} reqBody.method
 * @param  {String} reqBody.url
 * @param  {Object} reqBody.body
 * @return {Promise}
 */
var xhr = function (reqBody) {
  console.group('Mock Server');
  var method = (reqBody.method || 'GET').toUpperCase(),
    body = reqBody.body,
    url = reqBody.url,
    urlSplit = url.split('?'),
    path = urlSplit[0],
    query = qs.parse(urlSplit[1]);

  if (method === 'GET' && body) {
    Object.assign(query, body);

    var queryStr = qs.stringify(query);
    url = queryStr ? path + '?' + queryStr : url;
  }

  return new Promise(function (resolve) {
    app.receive({
      method: method,
      url: url,
      body: body || {}
    }).respond(function (re) {
      if (typeof re === 'string') re = JSON.parse(re);
      if (!re.success) return alert(re.errMsg);
      resolve(re.data);
      console.groupEnd('Mock Server');
    });
  });
};

module.exports = xhr;
