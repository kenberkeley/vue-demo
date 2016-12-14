import xhr from './xhr/'

/**
 * 对应后端涉及到用户认证的 API
 */
class AuthService {

  checkLogin () {
    return xhr({
      url: '/auth/checkLogin'
    })
  }

  /**
   * @param  {String} userData.username
   * @return {Promise}
   */
  login (userData) {
    return xhr({
      method: 'post',
      url: '/auth/login',
      body: userData
    })
  }

  logout () {
    return xhr({
      method: 'delete',
      url: '/auth/logout'
    })
  }

}

// 实例化后再导出
export default new AuthService()
