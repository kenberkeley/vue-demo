// VueResource最大的好处就是可以在组件中直接 this.$http 实现请求
// 但由于有服务层的存在，因此引入 VueResource 相当鸡肋，不建议使用
import Vue from 'vue'
import VueResource from 'vue-resource'
import { rootPath, errHandler } from './config'

Vue.use(VueResource)

// Vue.http.options.root = rootPath
// Vue.http.options.emulateJSON = true
// Vue.http.options.xhr = { withCredentials: true }

const xhr = ({ url, body, method = 'get' }) => {
  // 默认引入ES6的Promise实现
  return new Promise((resolve, reject) => {
    Vue.http[method.toLowerCase()](rootPath + url, body)
      .then(({ data }) => { // 从封装体中解构出data字段
        if (!data) // 读取undefined/null的属性会报错
          return resolve(null)

        if (data._code)
          return errHandler(data._msg)

        resolve(data)
      }, errHandler)
  })
}

export default xhr
