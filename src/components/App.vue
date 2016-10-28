<template>
  <div>

    <navbar></navbar>

    <div class="container">
      <router-view></router-view>
    </div>

  </div>
</template>
<script>
/* 根组件就像是 AngularJS 的 $rootScope，同时也负责全局布局 */
import Navbar from 'COMPONENT/Navbar/'

export default {
  // 路由会自动将该组件挂载到 #app 上
  // el: () => '#app',
  
  components: { Navbar },

  // 注意：顶级变量必须设置默认值方能引入 observer
  data () {
    return {
      userData: null
    }
  }
}
</script>
