/**
 * 去掉 query string
 * @param  {String} url
 * @return {String}
 */
export default function trimQs(url) {
  return url ? url.split('?')[0] : ''
}

/**
 * e.g.
 * trimQs('http://a.com?b=c&d=e') => 'http://a.com'
 */
