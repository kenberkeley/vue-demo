import Vue from 'vue'
import VueRouter from 'vue-router'
import routesMap from './map/' // 路由映射

Vue.use(VueRouter)

const router = new VueRouter({
  // root: null,
  // hashbang: false,
  // history: true,
  // saveScrollPosition: true,
  // transitionOnLoad: true,
  // linkActiveClass: '',
  suppressTransitionError: __PROD__ // 生产环境下不抛出异常
})

router.map(routesMap)
router.alias({
  '/msg': '/msg/list',
  '/login': '/user/login'
})

// ========================================
// 中间件
// ========================================
// 路由日志
// if (__DEV__) {
//   router.beforeEach(({ to, from, next }) => {
//     console.info(`[路由日志] ${decodeURIComponent(from.path || '')} => ${decodeURIComponent(to.path)}`)
//     next()
//   })
// }

// 权限拦截（needAuth：需要登录后访问；forbidAuthed：禁止登录后访问）
// router.beforeEach(({ to: { needAuth, forbidAuthed, path }, redirect, next, abort }) => {
//   let { userData } = router.app

//   if (needAuth && !userData) {
//     if (__DEV__) { console.info('[权限拦截] 当前用户未登录，重定向到登录页') }
//     return redirect({
//       path: `/auth/login?referrer=${encodeURIComponent(path)}`,
//       force: true // 禁用追加模式
//     })
//   }
  
//   if (forbidAuthed && userData) {
//     if (__DEV__) { console.info('[权限拦截] 当前用户已登录，中断跳转') }
//     return abort()
//   }

//   next()
// })

// 替换标签页标题，并恢复页面位置
router.afterEach(({ to, from }) => {
  let titles = []
  to.matched.slice().forEach(({ handler: { title } }) => {
    if (title) titles.push(title)
  })
  document.title = titles.join(' · ')

  if (to.path.split('?')[0] !== (from.path || '').split('?')[0]) {
    $.scrollTo('#scroll-to-top', 500) // 不同页面间跳转：页面拉回顶部
  }
})

/**
 * 调用 router.start(App, '#app') 后，根组件实例就会暴露到 router.app
 * 组件内部可通过 this.$root 访问，外部则可通过 router.app 进行访问
 */
export default router
