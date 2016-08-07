<script>
/* 根组件的作用实际上就是AngularJS的$rootScope */

// import userService from 'SERVICE/userService'
export default {
  // 路由会自动将该组件挂载到#app上
  // el: () => '#app',

  // 顶级变量必须设置默认值方能引入observer
  data () {
    return {
      // userService, // 实现 userService 挂载 data 的可追踪
      userData: null // 须与 userService.data【手动】同步
    }
  }
}
</script>
