var path = require('path'),
  DbOptService = require('./DbOptService');

function UserService() {}

UserService.prototype = new DbOptService(
  path.resolve(__dirname, '../db/user.session')
);

UserService.prototype.constructor = UserService;

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
