import { rootPath, errHandler } from './config'

const xhr = ({ method = 'get', url, body = null }) => {
  // 由于引入了 es6-shim，因此这里完全可以使用原生 Promise
  const defer = $.Deferred()

  $.ajax({
    type: method,
    url: rootPath + url,
    data: body
    // crossDomain: true, // 跨域
    // xhrFields: { withCredentials: true } // 跨域允许带上 cookie
  })
  .done(({ success, errMsg, data }) => {
    if (!success) return $.toast({
      heading: '_#操作失败#_',
      text: errMsg,
      icon: 'warning',
      stack: false
    })
    defer.resolve(data)
  })
  .fail(errHandler)

  return defer.promise()
}

export default xhr
