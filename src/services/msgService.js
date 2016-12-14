import xhr from './xhr/'
/**
 * 对应后端的 /msg/* 所有 API
 */
class MsgService {
  /**
   * @param  {String} options.author   作者名
   * @param  {Number} options.pageIdx  目标页码（默认是第 1 页）
   * @param  {Number} options.quantity 单页请求 msg 的数量（默认每页 10 条）
   * @param  {Number} options.msgId
   * @return {Promise}
   */
  fetchList (query) {
    return xhr({
      url: '/msg',
      body: query
    })
  }

  /**
   * 获取所有发布者
   * @resolve {String[]}
   */
  fetchAuthorList () {
    return xhr({
      url: '/msg/authors'
    })
  }

  /**
   * 根据 msgId 获取留言信息
   * @param   {String} msgId
   * @resolve {Object} msg
   */
  fetchById (msgId) {
    return xhr({
      url: `/msg/${msgId}`
    })
  }

  /**
   * 新增留言信息
   * @param   {String} msgBody.title
   * @param   {String} msgBody.content
   * @resolve {Object} msg
   */
  add (msgBody) {
    return xhr({
      method: 'post',
      url: '/msg',
      body: msgBody
    })
  }

  /**
   * 修改留言信息
   * @param   {Object} msgBody
   * @resolve {Object} msg
   */
  update (msgBody) {
    let msgId = msgBody.id
    delete msgBody.msgId

    return xhr({
      method: 'put',
      url: `/msg/${msgId}`,
      body: msgBody
    })
  }

  /**
   * 删除留言信息
   * @param  {String} msgId
   * @return {Promise}
   */
  del (msgId) {
    return xhr({
      method: 'delete',
      url: `/msg/${msgId}`
    })
  }

}

// 实例化后再导出
export default new MsgService()
