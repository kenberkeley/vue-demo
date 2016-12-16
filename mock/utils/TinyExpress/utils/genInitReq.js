var qs = require('qs'),
  purifyObject = require('./purifyObject');

module.exports = function genInitReq(origReqBody) {
  var reqBody = purifyObject(origReqBody);

  var method = (reqBody.method || 'GET').toUpperCase(),
    body = reqBody.body,
    originalUrl = reqBody.url,
    origUrlSplit = originalUrl.split('?'),
    path = origUrlSplit[0],
    query = qs.parse(origUrlSplit[1]);

  if (method === 'GET' && body) {
    originalUrl = path + '?' + qs.stringify(
      Object.assign(query, body), { encode: false }
    );
  }

  return {
    method: method,
    body: body || {},
    originalUrl: originalUrl,
    path: path,
    query: query
    // params: {}
  };
};
