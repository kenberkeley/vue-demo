// import xhr from './jquery'
// 若要使用下列两者，最好添加到 build/webpack.base.conf.js 的 entry.vendor 分离打包
// import xhr from './superagent'
// import xhr from './vueResource'

var xhr = require('./jquery').default

// 为了方便纯静态页的演示，特实现了一个基于浏览器的 Mock Server
// 通过重写 xhr 接口实现基于 Promise 的请求与响应
if (__PROD__) {
  window._ = require('lodash')
  xhr = require('MOCK/browser-xhr')
}

/**
 * XHR 请求接口定义
 * @param  {String} options.method 请求方法，默认为 get
 * @param  {String} options.url    请求路径，基于 rootPath 地址
 * @param  {Object} options.body   请求体，例如后端 Express 可使用 req.body 获取该对象
 * @return {Promise}
 *
 * 使用例子 xhr({ method: 'post', url: 'XXX', body: {Object} })
 * 最简单的例子 xhr({ url: '/xxx' })
 *
 * 本 Demo 的 API 封装格式为 { success: <Boolean>, errMsg: <String>, data: <Any> }
 */
export default xhr
