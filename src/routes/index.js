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
  suppressTransitionError: __PROD__ // 生产环境下不抛出异常
})

router.map(routesMap)

// ========================================
// 中间件
// ========================================
// 简单的路由跳转 Logger
router.beforeEach(({ to, from, abort, redirect, next }) => {
  console.info(`[RouteLogger] ${decodeURI(from.path)} => ${decodeURI(to.path)}`)
  next()
})

// 权限拦截
router.beforeEach(({ to, from, abort, redirect, next }) => {
  if (to.needToLogin && !router.app.userData) { // router 实例会暴露出根组件实例 app
    alert('需要登录后才能访问')
    console.info('[Auth:Failed] 用户未登录，中断跳转')
    return abort()
  }
  next()
})

/**
 * 在入口文件 src/app.js 中调用 router.start(App, '#app') 后，根组件实例就会暴露到 router.app
 * 在组件内部，可通过 this.$root 访问根组件；而在外部，则可通过以下方式访问到根组件：
 * 
 * import router from '<path to>/routes/'
 * 
 * const $root = router.app
 * console.log($root.userData) // 打印用户 session
 */
export default router
