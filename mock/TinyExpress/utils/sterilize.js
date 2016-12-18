/**
 * Just for cutting the reference
 * @param  {Any} entity
 * @return {Any}
 */
module.exports = function sterilize(entity) {
  return JSON.parse(JSON.stringify(entity));
};
