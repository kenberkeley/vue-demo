var userService = require('../services/userService');

module.exports = function (req, res, next) {
  
  if (!req.session) req.session = {};

  req.session.userData = userService.isLogin();
  
  next();
};
