var qs = require('qs'),
  methods = require('./methods'),
  includes = require('./includes'),
  sterilize = require('./sterilize');

/**
 * 生成初始化的 req 请求体
 * @param  {String} origReqBody.method
 * @param  {String} origReqBody.url
 * @param  {Object} origReqBody.body
 * @return {Request}
 */
module.exports = function initReq(origReqBody) {
  var reqBody = sterilize(origReqBody),
    method = reqBody.method,
    originalUrl = reqBody.url,
    body = reqBody.body || {};

  if (!method || !url) {
    throw new Error('method 或 url 字段缺失');
  }
  if (!includes(methods, method.toLowerCase())) {
    throw new Error('不支持该 method 请求');
  }

  var origUrlSplit = originalUrl.split('?'),
    path = origUrlSplit[0],
    query = qs.parse(origUrlSplit[1]);

  return {
    method: method.toUpperCase(),
    body: body,
    originalUrl: originalUrl,
    path: path,
    query: query
    // params: {}
  };
};
