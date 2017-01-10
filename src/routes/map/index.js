// 不同功能模块的路由应代码分离
import msgRoutes from './msg'
import authRoutes from './auth'

export default {
  '*': {
    component: {
      init () {
        window.swal({
          type: 'warning',
          title: '404 NOT FOUND',
          timer: 2000,
          showConfirmButton: false
        })
        history.back()
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
    title: '_#首页#_',
    icon: 'fa fa-home',
    showInNavbar: { exact: true },
    showInSidebar: true,
    component (resolve) {
      // 统一使用 Code-Splitting 形式引入路由页面组件
      // build 时可通过 AggressiveMergingPlugin / MinChunkSizePlugin 合并 chunks
      require(['VIEW/'], resolve)
    }
  },

  ...msgRoutes,
  ...authRoutes
}
