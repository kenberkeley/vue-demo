import trimQs from 'UTIL/trimQs'

const scrollToTop = ({ to, from }) => {
  if (trimQs(to.path) !== trimQs(from.path)) {
    $.scrollTo('#navbar', 500) // 不同页面间跳转：拉回顶部
  }
}

export default scrollToTop
