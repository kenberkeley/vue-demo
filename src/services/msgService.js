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
  fetch ({ author = '', pageIdx = 1, quantity = 10, msgId } = {}) {
    let url = '/msg/'
    
    if (msgId) {
      url += msgId
    } else {
      url = `${url}?author=${author}&pageIdx=${pageIdx}&quantity=${quantity}`
    }

    return xhr({ url })
  }

  /**
   * 根据 msgId 获取信息
   * @param   {String} msgId
   * @resolve {Object} msg
   */
  getById (msgId) {
    return xhr({
      url: `/msg/${msgId}`
    })
  }

  /**
   * 新增留言信息
   * @param  {String} msgBody.title
   * @param  {String} msgBody.content
   * @return {Promise}
   */
  add (msgBody) {
    return xhr({
      method: 'post',
      url: '/msg',
      body: msgBody
    })
  }

  /**
   * 修改 msg
   * @param  {Object} msgBody { title:{String}, content:{String} }
   * @return {Promise}
   */
  mod (msgBody) {
    let msgId = msgBody.id
    delete msgBody.msgId

    return xhr({
      method: 'put',
      url: `/msg/${msgId}`,
      body: msgBody
    })
  }

  /**
   * 删除 msg
   * @param  {Number} msgId
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
