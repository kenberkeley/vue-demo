var msgCtrls = require('../controllers/msg'),
  authCtrls = require('../controllers/auth'),
  interceptor = require('../middlewares/interceptor');

/*
  GET     /msg              获取留言信息列表
  POST    /msg              新增一条留言信息
    
  GET     /msg/authors      获取所有留言用户名

  GET     /msg/:msgId       获取指定 ID 的留言信息
  PUT     /msg/:msgId       更新指定 ID 的留言信息
  DELETE  /msg/:msgId       删除指定 ID 的留言信息

  GET     /auth/checkLogin  检测用户是否已经登录
  POST    /auth/login       登录
  DELETE  /auth/logout      注销登录
 */

module.exports = [{
  path: '/msg',
  method: 'GET',
  handler: msgCtrls.getList
}, {
  path: '/msg',
  method: 'POST',
  middlewares: [interceptor.NEED_AUTH],
  handler: msgCtrls.add
}, {
  path: '/msg/authors',
  method: 'GET',
  handler: msgCtrls.authors
}, {
  path: '/msg/:msgId',
  method: 'GET',
  handler: msgCtrls.getById
}, {
  path: '/msg/:msgId',
  method: 'PUT',
  middlewares: [interceptor.NEED_AUTH],
  handler: msgCtrls.update
}, {
  path: '/msg/:msgId',
  method: 'DELETE',
  middlewares: [interceptor.NEED_AUTH],
  handler: msgCtrls.remove
}, {
  path: '/auth/checkLogin',
  method: 'GET',
  handler: authCtrls.checkLogin
}, {
  path: '/auth/login',
  method: 'POST',
  middlewares: [interceptor.FORBID_AUTHED],
  handler: authCtrls.login
}, {
  path: '/auth/logout',
  method: 'DELETE',
  middlewares: [interceptor.NEED_AUTH],
  handler: authCtrls.logout
}];
