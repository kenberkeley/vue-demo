var msgCtrls = require('../controllers/msg');
var userCtrls = require('../controllers/user');
var interceptor = require('../middlewares/interceptor');

/*
  GET     /msg              获取留言信息列表
  POST    /msg              新增一条留言信息

  GET     /msg/:msgId       获取指定 ID 的留言信息
  PUT     /msg/:msgId       更新指定 ID 的留言信息
  DELETE  /msg/:msgId       删除指定 ID 的留言信息

  GET     /user/checkLogin  检测用户是否已经登录
  POST    /user/login       登录
  DELETE  /user/logout      注销登录
 */

module.exports = [{
  path: '/msg'
  method: 'GET',
  handler: msgCtrls.getList
}, {
  path: '/msg',
  method: 'POST',
  middlewares: [interceptor('NEED_AUTH')],
  handler: msgCtrls.addMsg
}, {
  path: '/msg/:msgId',
  method: 'GET',
  handler: msgCtrls.getById
}, {
  path: '/msg/:msgId',
  method: 'PUT',
  middlewares: [interceptor('NEED_AUTH')],
  handler: msgCtrls.update
}, {
  path: '/msg/:msgId',
  method: 'DELETE',
  middlewares: [interceptor('NEED_AUTH')],
  handler: msgCtrls.remove
}, {
  path: '/user/checkLogin',
  method: 'GET',
  handler: userCtrls.checkLogin
}, {
  path: '/user/login',
  method: 'POST',
  middlewares: [interceptor('FORBID_AUTHED')],
  handler: userCtrls.login
}, {
  path: '/users/logout',
  method: 'DELETE',
  middlewares: [interceptor('NEED_AUTH')],
  handler: userCtrls.logout
}];
