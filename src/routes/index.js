import Vue from 'vue'
import VueRouter from 'vue-router'

import routesMap from './map/'
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


// 404的另一种实现
// router.redirect({
//   '*': '/'
// })

// 拦截机
router.beforeEach(({ to, from, abort, redirect, next }) => {
  console.info(`${from.path || ''} => ${to.path}`)

  if (to.needToLogin && !userService.data) {
    alert('需要登录后才能访问')
    return abort()
  }

  next()
})

export default router
