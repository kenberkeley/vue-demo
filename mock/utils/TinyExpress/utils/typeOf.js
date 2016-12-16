var toString = Object.prototype.toString,
  reg = /^\[object\s(\w+)\]$/;

module.exports = function typeOf(entity) {
  return reg.exec(toString.call(entity))[1].toLowerCase();
};
