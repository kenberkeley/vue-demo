module.exports = function (req, res, next) {
  
  console.info('[LOG]', req.method, req.originalUrl);

  next();
};
