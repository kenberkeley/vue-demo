var userService = require('../../services/userService');

// GET /user
exports.get = function (req, res, next) {
  res.json( userService.isLogin() );
};
