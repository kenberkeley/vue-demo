import xhr from './xhr/'
/**
 * 留言板所用到的 API
 */
class MsgService {
  /**
   * 获取留言信息列表
   * @param   {String}   query.authors 作者名（逗号隔开）
   * @param   {String}   query.offset  skip 条数（默认 0）
   * @param   {String}   query.limit   每页显示条数（默认 5）
   * @resolve {Object[]} msgs
   */
  fetchList (query) {
    return xhr({
      url: '/msg',
      body: query
    })
  }

  /**
   * 获取所有发布者
   * @resolve {String[]} authors
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
    msgBody = { ...msgBody } // 在副本上操作
    const msgId = msgBody.id
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

// 实例化后导出，全局单例
export default new MsgService()
