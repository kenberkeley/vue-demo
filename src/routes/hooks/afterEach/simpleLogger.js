/**
 * 打印路由日志到控制台
 */
const simpleLogger = ({ to, from }) => {
  const decode = decodeURIComponent
  console.info(`[_#路由日志#_] ${decode(from.path || '')} => ${decode(to.path)}`)
}

export default simpleLogger
