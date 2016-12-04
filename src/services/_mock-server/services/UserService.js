var DbOptService = require('./DbOptService');

function UserService() {}
UserService.prototype = new DbOptService('../db/user.session');

/**
 * @return {Object/Null} userData/null(unautherized)
 */
UserService.prototype.isLogin = function () {
  return this.read();
};

/**
 * @param  {Object} userData
 */
UserService.prototype.login = function (userData) {
  var curUser = this.read();
  if (curUser) {
    console.info('[INFO] You had already loged in');
    return;
  }
  this.save(userData);
};

UserService.prototype.logout = function () {
  this.delDb();
};

module.exports = new UserService();
