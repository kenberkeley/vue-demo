<template>
  <div>

    <navbar></navbar>

    <div class="container">
      <router-view></router-view>
    </div>

  </div>
</template>
<script>
/* 根组件的作用有点像是 AngularJS 的 $rootScope */
// import userService from 'SERVICE/userService'
import Navbar from 'COMPONENT/Navbar/'

export default {
  // 路由会自动将该组件挂载到 #app 上
  // el: () => '#app',
  
  components: { Navbar },

  // 顶级变量必须设置默认值方能引入 observer
  data () {
    return {
      // userService, // 实现 userService 挂载 data 的可追踪
      userData: null // 须与 userService.data【手动】同步
    }
  }
}
</script>
