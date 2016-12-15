import Vue from 'vue'
import VueRouter from 'vue-router'
import routesMap from './map/' // 路由映射
import hooks from './hooks/' // 路由钩子

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
router.alias({ '/msg': '/msg/list' })

hooks(router)

/**
 * 调用 router.start(App, '#app') 后，根组件实例就会暴露到 router.app
 * 组件内部可通过 this.$root 访问，外部则可通过 router.app 进行访问
 */
export default router
