module.exports = function (req, res, next) {
  console.info('[Logger]', req.method, req.originalUrl);
  next();
};
