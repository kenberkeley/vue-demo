import { rootPath, errHandler } from './config'

const xhr = ({ url, body = null, method = 'get' }) => {
  const defer = $.Deferred()

  $.ajax({
    type: method,
    url: rootPath + url,
    data: body
    // xhrFields: { // 跨域允许带上 cookie
    //   withCredentials: true
    // },
    // crossDomain: true
  })
  .done(({ success, errMsg, data }) => {
    if (!success) return alert('[Mock Server Error]' + errMsg)
    defer.resolve(data)
  })
  .fail(errHandler)

  return defer.promise()
}

export default xhr
