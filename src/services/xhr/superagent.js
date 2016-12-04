import request from 'superagent'
import { rootPath, errHandler } from './config'

// 注意：此处需要自行引入 Promise 库
// 例如， npm i es6-promise -S 后：
// require('es6-promise').polyfill()
// 
// 请别忘了添加库到 build/webpack.base.conf.js 的 entry.vendor 分离打包

const xhr = ({ url, body = null, method = 'get' }) => {
  return new Promise((resolve, reject) => {
    request[method.toLowerCase()](rootPath + url)
      // 跨域允许带上 cookie（http://visionmedia.github.io/superagent/#cors）
      // .withCredentials()
      .send(body)
      .end((err, { success, errMsg, data }) => {
        if (!success) return alert(errMsg)
        resolve(data)
      })
  })
}

export default xhr
