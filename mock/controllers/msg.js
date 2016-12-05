var uuid = require('uuid/v1');
var db = require('../db/');

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
exports.addMsg = function (req, res) {
  req.body.id = uuid.substr(0, 8);
  req.body.author = db.get('session.username').value();
  req.body.ctime = Date.now();
  
  res.ajaxReturn(
    db.get('msgs').push(req.body).last().value()
  );
};

// GET /msg/:msgId
exports.getById = function (req, res) {
  res.ajaxReturn(
    db.get('msgs').find({ id: req.params.msgId }).value()
  );
};

// PUT /msg/:msgId
exports.update = function (req, res) {
  delete req.body.id; // 防止篡改 ID
  req.body.ctime = Date.now();

  var target = db.get('msgs').find({
    id: req.params.msgId,
    author: db.get('session.username').value()
  }).assign(req.body).value()

  if (target) return res.ajaxReturn();
  res.ajaxReturn(null, { success: false, errMsg: '修改失败' });
};

// DELETE /msg/:msgId
exports.remove = function (req, res) {
  var target = db.get('msgs').remove({
    id: req.params.msgId,
    author: db.get('session.username').value()
  }).value()[0] // 删除返回的是一个集合

  if (target) return res.ajaxReturn();
  res.ajaxReturn(null, { success: false, errMsg: '删除失败' });
};
