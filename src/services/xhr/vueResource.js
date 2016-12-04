// VueResource 最大的好处就是可以在组件中直接 this.$http 实现请求
// 但由于有服务层的存在，因此引入 VueResource 相当鸡肋，不建议使用
import Vue from 'vue'
import VueResource from 'vue-resource'
import { rootPath, errHandler } from './config'

// 注意：此处需要自行引入 Promise 库
// 例如， npm i es6-promise -S 后：
// require('es6-promise').polyfill()
// 
// 请别忘了添加库到 build/webpack.base.conf.js 的 entry.vendor 分离打包

Vue.use(VueResource)

Vue.http.options.root = rootPath
// Vue.http.options.emulateJSON = true
// Vue.http.options.xhr = { withCredentials: true }

const xhr = ({ url, body, method = 'get' }) => {
  // P.S：您可能需要自行引入 Promise 实现以兼容
  return new Promise((resolve, reject) => {
    Vue.http[method.toLowerCase()](rootPath + url, body)
      .then(({ data: { success, errMsg, data } }) => { // 从封装体中解构出data字段
        if (!success) return alert(errMsg)
        resolve(data)
      }, errHandler)
  })
}

export default xhr
