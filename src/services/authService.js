import xhr from './xhr/'

/**
 * 用户认证所用到的 API
 */
class AuthService {

  /**
   * 检测当前用户是否已经登录
   * @resolve {Object} userData / null
   */
  checkLogin () {
    return xhr({
      url: '/auth/checkLogin'
    })
  }

  /**
   * 登录
   * @param  {String} userData.username
   * @return {Object} userData
   */
  login (userData) {
    return xhr({
      method: 'post',
      url: '/auth/login',
      body: userData
    })
  }

  /**
   * 注销登录
   * @return {Promise}
   */
  logout () {
    return xhr({
      method: 'delete',
      url: '/auth/logout'
    })
  }

}

// 实例化后导出，全局单例
export default new AuthService()
