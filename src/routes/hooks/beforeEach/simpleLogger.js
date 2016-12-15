const simpleLogger = ({ to, from, next }) => {
  console.info(
    `[路由日志] ${decodeURIComponent(from.path || '')} => ${decodeURIComponent(to.path)}`
  )
  next()
}

export default simpleLogger
