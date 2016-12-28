/**
 * 格式化时间（使用了 Moment.js，https://github.com/moment/moment）
 * @param  {Number} timestamp 时间戳
 * @param  {String} format    格式化类型
 * @return {String}
 */
export default function dateTimeFormatter(timestamp, format = 'YYYY-MM-DD HH:mm:ss') {
  return window.moment(timestamp).format(format)
}
