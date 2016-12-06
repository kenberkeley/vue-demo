/**
 * 根据 path-to-regexp 匹配路由路径（例如 /msg/:msgId）生成的 paramKeys
 * 与当前访问路径（例如 /msg/10086）正则执行后的 matchedResult 产生对应的 req.params
 * 
 * @param  {Array}  paramKeys
 * @param  {Array}  matchedResult
 * @return {Object}
 */
module.exports = function (paramKeys, matchedResult) {
  var params = {};

  paramKeys.forEach(function(key, idx) {
    params[key.name] = matchedResult[idx + 1];
  });

  return params;
};
