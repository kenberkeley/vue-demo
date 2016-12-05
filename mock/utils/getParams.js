module.exports = function (paramKeys, matchedResult) {
  var params = {};

  paramKeys.forEach(function(key, idx) {
    params[key.name] = matchedResult[idx + 1];
  });

  return params;
};
