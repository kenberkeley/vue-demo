/**
 * 保证url前带'/'
 * @param  {String} url
 * @return {String}
 */
export default (url) => {
  if (!url.startsWith('/')) {
    url = '/' + url
  }
  return url
}
