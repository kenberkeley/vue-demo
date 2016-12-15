/**
 * beforeEach 与 afterEach 最显著的区别是后者无法调用任何切换函数
 * https://github.com/vuejs/vue-router/blob/1.0/docs/zh-cn/api/before-each.md
 * https://github.com/vuejs/vue-router/blob/1.0/docs/zh-cn/api/after-each.md
 */
import simpleLogger from './beforeEach/simpleLogger'
import authInterceptor from './beforeEach/authInterceptor'
import docTitleReplacer from './afterEach/docTitleReplacer'
import scrollToTop from './afterEach/scrollToTop'

export default (router) => {
  if (__DEV__) {
    router.beforeEach(simpleLogger)
  }
  router.beforeEach(authInterceptor(router))

  router.afterEach(scrollToTop)
  router.afterEach(docTitleReplacer)
}
