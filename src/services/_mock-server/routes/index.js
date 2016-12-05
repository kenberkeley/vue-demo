// https://github.com/typicode/lowdb 前后端通用的微型数据库
var uuid = require('uuid/v1');
var interceptor = require('../middlewares/interceptor');

module.exports = [{
  path: '/msg',
  handlers: {
    // 获取留言信息列表
    GET: function (req, res) {
      var offset = ~~req.query.offset || 0,
        limit = ~~req.query.limit || 10;

      var msgs_ = db.get('msgs');

      res.ajaxReturn({
        total: msgs_.size().value(),
        rows: msgs_.slice(offset, offset + limit).value()
      })
    },
    // 新增一条留言信息
    POST: {
      middlewares: [interceptor('NEED_AUTH')],
      handler: function (req, res) {
        req.body.id = uuid.substr(0, 8);
        req.body.author = db.get('session.username').value();
        req.body.ctime = Date.now();
        
        res.ajaxReturn(
          db.get('msgs').push(req.body).last().value()
        );
      }
    }
  }
}, {
  path: '/msg/:msgId',
  handlers: {
    GET: function (req, res) {
      res.ajaxReturn(
        db.get('msgs').find({ id: req.params.msgId }).value
      );
    },
    PUT: {
      middlewares: [interceptor('NEED_AUTH')],
      handler: function (req, res) {
        delete req.body.id; // 防止篡改 ID
        req.body.ctime = Date.now();

        res.ajaxReturn(
          db.get('msgs').find({ id: req.params.msgId }).assign(req.body).value()
        );
      }
    },
    DELETE: {
      middlewares: [interceptor('NEED_AUTH')],
      handler: function (req, res) {

      }
    }
  }
}, {
  path: '/user/checkLogin',
  handlers: {
    GET: function (req, res) {

    }
  }
}, {
  path: '/user/login',
  handlers: {
    POST: function (req, res) {

    }
  }
}, {
  path: '/user/logout',
  handlers: {
    DELETE: function (req, res) {

    }
  }
}];
