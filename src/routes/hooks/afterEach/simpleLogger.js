/**
 * 打印路由日志到控制台
 */
const simpleLogger = ({ to, from }) => {
  const decode = decodeURIComponent
  console.info(`[${__('路由日志')}] ${decode(from.path || '')} => ${decode(to.path)}`)
}

export default simpleLogger
