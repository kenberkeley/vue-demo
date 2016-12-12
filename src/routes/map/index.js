// 不同功能模块的路由应代码分离
import msgRoutes from './msg'
import userRoutes from './user'

export default {
  '*': {
    component: {
      init () {
        window.swal({
          type: 'warning',
          title: '404 NOT FOUND',
          text: 'Redirecting to default page ...',
          timer: 2000,
          showConfirmButton: false
        })
        this.$router.replace('/')
      },
      template: '<span></span>'
    }
  },

  // Vue 没有强制刷新操作，这算是 hack（使用 canReuse 可以解决部分问题）
  // 用法1：<a v-link="{ path: '/redirect', query: { dest: '/xxx' } }">
  // 用法2：<a v-link="`/redirect?dest=/xxx`">
  // 用法3：this.$router.go('/redirect?dest=/xxx')
  '/redirect': {
    component: {
      init () {
        this.$router.replace({
          path: decodeURIComponent(this.$route.query.dest || '/'),
          force: true
        })
      },
      template: '<span></span>'
    }
  },

  '/': {
    title: '首页',
    component (resolve) {
      // 使用 Webpack 的 Code-Splitting
      require(['VIEW/'], resolve)
    }
  },

  ...msgRoutes,
  ...userRoutes
}
