var _ = require('lodash'),
  uuid = require('uuid/v1'),
  DbOptService = require('./DbOptService');

function MsgService() {}
MsgService.prototype = new DbOptService('../db/msg.json');

/**
 * fetch messages with conditions
 * @param  {Object} condition ↓↓↓
 *         {
 *           query: {Object},
 *           paging: {
 *             idx: {Number},
 *             quantity: {Number}
 *           }
 *         }
 * @return {Array}             matched collection
 */
MsgService.prototype.find = function (condition) {
  var queryBody = condition.query,
    pageIdx = condition.paging.idx,
    quantity = condition.paging.quantity;

  /** filtering and sorting begins */
  var msgs = this.read();
  if (queryBody)
    msgs = _.filter(msgs, queryBody);

  msgs = _.orderBy(msgs, ['time'], ['desc']);
  /* filtering and sorting ends **/

  /** paging begins */
  var startIdx = (pageIdx - 1) * quantity,
    endIdx = startIdx + quantity;
  
  msgs = msgs.filter(function(msg, idx) {
    return startIdx <= idx && idx < endIdx;
  });
  /* paging ends **/

  return msgs;
};

/**
 * [findById description]
 * @param  {uuid}   id Msg ID
 * @return {Object} matched msg object
 */
MsgService.prototype.findById = function (id) {
  return _.find(this.read(), { id: id }) || null;
};

/**
 * @param  {Object} msgBody { author: {String}, title: {String} content: {String} }
 * @return {Object} newMsg
 */
MsgService.prototype.add = function (msgBody) {
  var newMsg = Object.assign({
    id: uuid.v1().substr(0, 8),
    time: Date.now()
  }, msgBody);

  var msgs = this.read() || [];
  msgs.push(newMsg);

  this.save(msgs);
  console.info('[INFO] Successfully added');
  return newMsg;
};

/**
 * authenticate delete or modify opt
 * @param  {Object}  authBody { id: {uuid, Msg ID}, author: {String} }
 * @return {Boolean} isAccessiable
 */
MsgService.prototype._auth = function (authBody) {
  var targetMsg = this.findById(authBody.id);

  if (!targetMsg || targetMsg.author !== authBody.author) {
    console.info('[WARN] Record not found or auth failed');
    return false;
  }

  return true;
};

/**
 * authenticate delete or modify opt
 * @param  {Object}  authBody { id: {uuid, Msg ID}, author: {String} }
 * @return {Boolean} hasDeleted
 */
MsgService.prototype.del = function (authBody) {
  if (!this._auth(authBody)) return;

  this.save(_.reject(this.read(), { id: authBody.id }));
  console.info('[INFO] Successfully deleted');
  return true;
};

/**
 * modify: delete the original and push the new one
 * @param  {Object} modMsgBody { id, author, title, content }
 * @return {Object} the modified msg
 */
MsgService.prototype.mod = function (modMsgBody) {
  if (
    !this.del(_.omit(modMsgBody, ['title', 'content']))
  ) return;

  var modMsg = this.add(modMsgBody);
  console.info('[INFO] Successfully modified');

  return modMsg;
};

// singleton
module.exports = new MsgService();
