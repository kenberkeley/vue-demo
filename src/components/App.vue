<script>
/**
 * 根组件的作用实际上就是AngularJS的$rootScope
 */
export default {
  // 路由会自动将该组件挂载到#app上
  // el: () => '#app',

  // 顶级变量必须设置默认值方能引入observer
  data () {
    return {
      userData: null // 须与 userService.data【手动】同步
    }
  }
}
</script>
