/**
 * 替换浏览器标签页标题
 */
const docTitleReplacer = ({ to: { matched } }) => {
  let titles = []
  matched.slice().forEach(({ handler: { title } }) => {
    title && titles.push(title)
  })
  document.title = titles.join(' · ')
}

export default docTitleReplacer
