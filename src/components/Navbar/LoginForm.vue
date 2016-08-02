<template>
  <form
    role="search"
    class="navbar-form navbar-right"
    @submit.prevent>
    <div class="form-group">
      <input
        required
        type="text"
        class="form-control"
        placeholder="请输入您的用户名"
        v-model="username"/>
    </div>
    <button
      type="submit"
      class="btn btn-success"
      @click="login">
      登录
    </button>
  </form>
</template>
<script>
import userService from 'SERVICE/userService'
export default {
  data () {
    return {
      username: '' // v-model必须设置默认值
    }
  },

  ready () {
    // 初始化：请求用户session
    userService.checkLogin()
      .then((userSessData) => {
        if (!userSessData) return
        // 手动同步顶级变量与服务
        this.$root.userData = userService.data = userSessData
      })
  },

  methods: {
    login () {
      userService
        .login({ username: this.username })
        .then((userSessData) => {
          this.$root.userData = userService.data = userSessData
        })
    }
  }
}
</script>
