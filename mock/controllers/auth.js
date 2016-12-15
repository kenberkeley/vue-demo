var db = require('../db/');

// GET /auth/checkLogin
exports.checkLogin = function (req, res) {
  res.ajaxReturn(db.get('session').value());
};

// POST /auth/login
exports.login = function (req, res) {
  var username = (req.body.username || '').trim();
  if (!username) {
    return res.ajaxReturn(false, { errMsg: 'username 字段为空' });
  }

  var session = { username: username };

  db.set('session', session).value();
  res.ajaxReturn(session);
};

// DELETE /auth/logout
exports.logout = function (req, res) {
  db.set('session', null).value();
  res.ajaxReturn();
};
