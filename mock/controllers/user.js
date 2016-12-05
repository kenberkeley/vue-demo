var db = require('../db/');

// GET /user/checkLogin
exports.checkLogin = function (req, res) {
  res.ajaxReturn(db.get('session').value());
};

// POST /user/login
exports.login = function (req, res) {
  db.set('session', { username: req.body.username }).value();
  res.ajaxReturn(true);
};

// DELETE /user/logout
exports.logout = function (req, res) {
  db.set('session', null).value();
  res.ajaxReturn(true);
};
