/**
 * 格式化时间
 * @param  {Number} timestamp 时间戳
 * @param  {String} format    格式化类型
 * @return {String}
 */
export default function dateTimeFormatter(timestamp, format = 'YYYY-MM-DD HH:mm:ss') {
  return window.moment(timestamp).format(format)
}

/**
 * 引入 Moment.js 仅为了演示如何结合第三方库使用及合并压缩打包
 */
