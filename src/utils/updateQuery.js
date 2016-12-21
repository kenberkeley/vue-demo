import qs from 'qs'
import _pickBy from 'lodash/pickBy'

/**
 * 更新 URL 中的 query string
 * @param  {String} url
 * @param  {Object} newQsObj
 * @return {String} url with new query string
 */
export default function updateQuery(url, newQsObj) {
  let _url = url.split('?')
  let path = _url[0]
  let curQs = _url[1]

  let newQs = qs.stringify(
    _pickBy({ ...qs.parse(curQs), ...newQsObj }, v => v), // 去除值为空的 kv 对
    { encode: false } // 禁用编码
  )
  return newQs ? path + '?' + newQs : path
}

/**
 * e.g.
 * updateQuery('http://demo.com?a=1&b=2', { a: '', b: 3 }) => 'http://demo.com?b=3'
 * updateQuery('http://demo.com?a=1&b=2', { a: '', b: '' }) => 'http://demo.com'
 */
