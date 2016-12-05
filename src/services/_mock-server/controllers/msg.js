var uuid = require('uuid/v1');
var db = require('../db/');
var interceptor = require('../middlewares/interceptor');

// GET /msg
exports.getList = function (req, res) {
  var offset = ~~req.query.offset || 0,
    limit = ~~req.query.limit || 10;

  var msgs_ = db.get('msgs');

  res.ajaxReturn({
    total: msgs_.size().value(),
    rows: msgs_.slice(offset, offset + limit).value()
  });
};

// POST /msg
exports.addMsg = {
  middlewares: [interceptor('NEED_AUTH')],
  handler: function (req, res) {
    req.body.id = uuid.substr(0, 8);
    req.body.author = db.get('session.username').value();
    req.body.ctime = Date.now();
    
    res.ajaxReturn(
      db.get('msgs').push(req.body).last().value()
    );
  }
};

// GET /msg/:msgId
exports.getById = function (req, res) {
  res.ajaxReturn(
    db.get('msgs').find({ id: req.params.msgId }).value()
  );
};

// PUT /msg/:msgId
exports.modify = {
  middlewares: [interceptor('NEED_AUTH')],
  handler: function (req, res) {
    delete req.body.id; // 防止篡改 ID
    req.body.ctime = Date.now();

    res.ajaxReturn(
      db.get('msgs').find({ id: req.params.msgId }).assign(req.body).value()
    );
  }
};

// DELETE /msg/:msgId
exports.remove = {
  middlewares: [interceptor('NEED_AUTH')],
  handler: function (req, res) {

  }
};
