// 不同模块应代码分离
import msgRoutes from './msg'

export default {
  '*': {
    component: {
      ready () {
        alert('404 - Page not found')
        this.$router.replace('/')
      }
    }
  },

  // Vue 没有强制刷新操作，这算是 hack（使用 canReuse 可以解决部分问题）
  // 用法1：<a v-link="{ path: '/redirect', query: { dest: '/msg' } }">
  // 用法2：<a v-link="{ path: '/redirect?dest=/msg' }">
  // 用法3：<a v-link="`/redirect?dest=/msg`">
  // v-link 的用法有很多种，详情 http://router.vuejs.org/zh-cn/link.html
  '/redirect': {
    name: 'redirect',
    component: {
      ready () {
        this.$router.replace(this.$route.query.dest)
      }
    }
  },

  '/': {
    name: 'welcome',
    component (resolve) {
      // 使用 Webpack 的 Code-Splitting
      require(['VIEW/welcome'], resolve)
    }
  },

  ...msgRoutes
}
