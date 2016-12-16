/**
 * Cut the reference of obj
 * @param  {Object} obj
 * @return {Object}
 */
module.exports = function purifyObject(obj) {
  return JSON.parse(JSON.stringify(obj));
};
