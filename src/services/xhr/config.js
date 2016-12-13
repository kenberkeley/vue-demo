// 此处配置 根访问路径 以及 全局错误处理
// 更多配置请根据业务逻辑自行实现

// 后端 API（往后的 XHR 请求为 rootPath + <url>）
export const rootPath = '/api'

export const errHandler = (e) => {
  $.toast({
    heading: '请求 API 失败',
    icon: 'error',
    stack: false
  })
  console.warn(e)
}
