import trimQs from 'UTIL/trimQs'
/**
 * 不同页面间的跳转，把视图拉回顶部
 */
const scrollToTop = ({ to, from }) => {
  if (trimQs(to.path) !== trimQs(from.path)) {
    $.scrollTo('#navbar', 500)
  }
}

export default scrollToTop
