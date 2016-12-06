module.exports = function (req, res, next) {
  console.info('[Mock Server Logger]', req.method, req.originalUrl);
  next();
};
