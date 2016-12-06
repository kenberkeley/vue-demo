var db = require('../db/');

function interceptorGen(loginStatus, errMsg) {
  return function (req, res, next) {
    if(!db.get('session').isEmpty().value() === loginStatus) {
      next();
    } else {
      res.ajaxReturn(false, { errMsg: errMsg });
    }
  };
}

module.exports = {
  NEED_AUTH: interceptorGen(true, '您需要登录后才能进行该操作'),
  FORBID_AUTHED: interceptorGen(false, '您已经登录，禁止当前操作')
};
