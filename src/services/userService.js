import xhr from './xhr/'

/**
 * 对应后端涉及到用户认证的 API
 */
class UserService {

  checkLogin () {
    return xhr({ url: '/user/checkLogin' })
  }

  /**
   * @param  {String} userData.username
   * @return {Promise}
   */
  login (userData) {
    return xhr({
      method: 'post',
      url: '/login',
      body: userData
    })
  }

  logout () {
    return xhr({ url: '/logout' })
  }

}

// 实例化后再导出
export default new UserService()
