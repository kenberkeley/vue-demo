var db = require('../db/');

module.exports = function (condition) {
  var bool, errMsg;

  switch (condition) {
    case 'NEED_AUTH':
      bool = true;
      errMsg = '您需要登录后才能进行操作';
      break;
    case 'FORBID_AUTHED':
      bool = false;
      errMsg = '您已经登录，禁止进行操作'
      break;
    default:
      throw new Error('无对应拦截状态');
      break;
  }

  return function (req, res, next) {
    if(!!!db.get('session').value() === bool) {
      res.ajaxReturn(null, { success: false, errMsg: errMsg });
    } else {
      next();
    }
  };
};
