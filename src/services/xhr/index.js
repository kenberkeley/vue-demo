// 若您的项目不使用 jQuery，而引入第三方 Ajax 请求库（如 Superagent）
// 请别忘了把该库添加到 build/webpack.base.conf.js 的 entry.vendor 分离打包

var xhr = require('./jquery').default

// 为方便纯静态页的演示，使用了支持在浏览器运行的 Mock Server
// 通过按照接口格式封装 xhr 函数，以实现基于 Promise 的请求与响应
if (__PROD__) {
  xhr = require('./mock')
}

/**
 * XHR 请求接口定义
 * @param  {String} options.method 请求方法（默认为 get）
 * @param  {String} options.url    请求路径（基于 rootPath 地址）
 * @param  {Object} options.body   请求体（例如后端 Express 可使用 req.body 获取该对象）
 * @return {Promise}
 *
 * 本 Demo 的 API 封装格式为 { success: <Boolean>, errMsg: <String>, data: <Any> }
 */
export default xhr
