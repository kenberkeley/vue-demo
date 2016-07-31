/**
 * 个位数前加零
 * @param  {Number} val
 * @return {String/Number}
 */
let zerofill = (val) => {
  return val >= 10 ? val : '0' + val
}

/**
 * 格式化时间
 * @param  {Number} time 时间戳
 * @param  {Number} type 格式化类型
 * @return {String}
 */
export default (time, type) => {
  let date = new Date(time)
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hours = date.getHours()
  let minutes = date.getMinutes()
  let second = date.getSeconds()
  let result
  
  switch (type) {
    case 0: // 01-05
      result = `${zerofill(month)}-${zerofill(day)}`
      break
    case 1: // 11:12
      result = `${zerofill(hours)}-${zerofill(minutes)}`
      break
    case 2: // 2015-01-05
      result = `${year}-${zerofill(month)}-${zerofill(day)}`
      break
    case 3: // 2015-01-05 11:12
      result = `${year}-${zerofill(month)}-${zerofill(day)}  ${zerofill(hours)}:${zerofill(minutes)}`
      break
    case 4:// 2015-01-05 11:12:06
    default:
      result = `${year}-${zerofill(month)}-${zerofill(day)}  ${zerofill(hours)}:${zerofill(minutes)}:${zerofill(second)}`
      break
  }
  return result
}
