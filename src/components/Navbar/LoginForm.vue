<template>
  <form
    role="search"
    class="navbar-form navbar-right"
    @submit.prevent="handleLogin">
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
      class="btn btn-success">
      登录
    </button>
  </form>
</template>
<script>
import userService from 'SERVICE/userService'
export default {
  data () {
    return {
      username: '' // v-model 必须设置默认值
    }
  },

  methods: {
    handleLogin () {
      console.info('[LoginForm:XHR] 发送登录请求')
      userService
        .login({ username: this.username })
        .then((userSessData) => {
          console.info('[LoginForm] 登录成功，立即手动同步 $root.userData 与 userService.data')
          this.$root.userData = userService.data = userSessData
        })
    }
  }
}
</script>
