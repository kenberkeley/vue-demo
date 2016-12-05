var db = require('../db/');
var interceptor = require('../middlewares/interceptor');

// GET /user/checkLogin
exports.checkLogin = function (req, res) {

};

// POST /user/login
exports.login = {
  middlewares: [interceptor('FORBID_AUTHED')],
  handler: function (req, res) {

  }
};

// DELETE /user/logout
exports.logout = function () {
  middlewares: [interceptor('NEED_AUTH')],
  handler: function () {

  }
};
