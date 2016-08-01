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

  // Vue没有强制刷新操作，这算是hack（使用canReuse可以解决部分问题）
  // 用法1：<a v-link="{ path: 'refresh', query: { dest: '/msg' } }">
  // 用法2（推荐）：<a v-link="{ path: 'refresh?dest=/msg' }">
  '/refresh': {
    component: {
      ready () {
        this.$router.go(this.$route.query.dest)
      }
    }
  },

  '/': {
    name: 'welcome',
    component (resolve) {
      // 使用Webpack的lazyLoad
      require(['VIEW/welcome'], resolve)
    }
  },

  ...msgRoutes
}
