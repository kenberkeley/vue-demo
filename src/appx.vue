<script>
import userService from 'SERVICE/userService'
/**
 * Appx的作用相当于Vuex，实际上更像是AngularJS的$rootScope
 */
export default {
  // 路由会自动将该组件挂载到#app上
  // el: () => '#app',

  // 顶级变量必须设置默认值方能引入observer
  // 值须从services的data获取，以保证全局数据的一致性
  data () {
    return {
      userData: null
    }
  },

  ready () {
    // 初始化：请求用户session
    userService.checkLogin()
      .then((userSessData) => {
        if (!userSessData) {
          return console.info('尚未登录')
        }

        // 同步全局用户状态
        this.userData = userService.data = userSessData

        console.info('当前用户已登录')
        console.info('Appx broadcast LOG_IN')
        this.$broadcast('LOG_IN')
      })
  },

  events: {
    // 有关用户状态变化，都要从服务中更新顶级变量
    // 请注意：更新完毕后再broadcast
    LOG_IN () {
      this.userData = userService.data

      console.info('Appx on LOG_IN, broadcast!')
      this.$broadcast('LOG_IN')
    },

    LOG_OUT () {
      this.userData = userService.data

      // 为了安全性，一般都需要跳转到登录页（此处跳回首页）
      console.info('Appx on LOG_OUT, redirect to /')
      this.$router.go('/')
    }
  }
}
</script>
