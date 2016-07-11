import Vue from 'vue'
import VueResource from 'vue-resource'
import { rootPath, errHandler } from './config'

Vue.use(VueResource)

// 后端API地址，请记得以http(s)://打头
Vue.http.options.root = rootPath

// Send request data as application/x-www-form-urlencoded content type
Vue.http.options.emulateJSON = true

// 跨域，后端需要设置header的Access-Control-Allow-[Origin/Credentials/Methods]才能真正起效
Vue.http.options.xhr = { withCredentials: true }

/**
 * 默认后端的API形式为
 *   { success: true, code: 0, data: [数据] }
 *
 * VueResource对其进行了封装，打印then返回的结果是
 *   { request: [Object], data: [Object], status: 200, statusText: "OK", ok: true }
 *
 * 也就是说
 * 后端API返回的整个内容都包含在上述封装体中的data字段
 * 这种封装对于纯粹的Ajax操作而言的确有点鸡肋
 * 但前端RESTful就是返回一个操作实例，因此必须是封装的
 *
 * 若项目本身采用jQuery/Zepto
 * 你也可以直接使用其优雅的Ajax API替代
 *
 * 实际上我们可以直接返回VueResource请求
 * 它本身就是一个Promise
 * 但我们在这里只关注
 * 封装体中的data对象中的data（有效数据）
 * 并对异常进行统一处理
 *
 * 总之，请自行根据业务逻辑进行修改
 *
 * @param  {String} options.url          请求路径，基于上述root地址。例：欲请求http://localhost:3333/user，仅需要填写user即可
 * @param  {Object} options.body         请求体。后端Express使用req.body获取该对象
 * @param  {String} options.method = get 请求方法，默认为get。支持post、put、patch、delete等
 * @return {Promise}
 */

/* 版本一：需要引入Babel ES6 Promise（gzip前大约为14kB） */
// 若需要自行处理异常，则请把errHandler换成reject
const xhr = ({ url, body, method = 'get' }) => {
  return new Promise((resolve, reject) => {
    Vue.http[method.toLowerCase()](url, body)
      .then(({ data }) => { // 从封装体中解构出data字段
        if (!data) // 读取undefined/null的属性会报错
          return resolve(null)

        if (data._code)
          return errHandler(data._msg)

        resolve(data)
      }, errHandler)
  })
}

/* 版本二（适用于业务逻辑简单情景）：毋须引入Promise库，直接使用回调函数 */
// const xhr = ({ url, body, method = 'get' }, cb) => {
//   Vue.http[method](url, body)
//     .then(({ data }) => {
//       if (data.code) {
//         return errHandler(data.data)
//       }

//       if (typeof cb === 'function') {
//         cb(data.data)
//       }
//     })
// }

/* 版本三（不推荐，皆因之后还是要重复解构）：直接返回VueResource Promise */
// const xhr = ({ url, body, method = 'get' }) => Vue.http[method](url, body)
export default xhr
