import Vue from 'vue'
import VueRouter from 'vue-router'

import routesMap from './map/' // 路由映射

// 在这里访问不了Appx的this.$root.userData，但服务照常无障碍访问
import userService from 'SERVICE/userService'

Vue.use(VueRouter)

const router = new VueRouter({
  hashbang: true,
  history: true,
  saveScrollPosition: true,
  suppressTransitionError: false // 开发环境下
  // suppressTransitionError: true // 生产环境下
})

router.map(routesMap)

// ========================================
// 中间件
// ========================================
// 简单的路由跳转Logger
router.beforeEach(({ to, from, abort, redirect, next }) => {
  console.info(`[RouteLogger] ${decodeURI(from.path)} => ${decodeURI(to.path)}`)
  next()
})

// 权限拦截
router.beforeEach(({ to, from, abort, redirect, next }) => {
  if (to.needToLogin && !userService.data) {
    alert('需要登录后才能访问')
    console.info('[Auth:Failed] 中断跳转')
    return abort()
  }
  next()
})

export default router
