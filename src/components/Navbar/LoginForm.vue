<template>
  <validator name="loginForm">
    <form novalidate
      role="search"
      class="navbar-form navbar-right"
      @submit.prevent="handleLogin">
      <div class="form-group">
        <span
          class="label label-warning"
          v-show="$loginForm.username.required && $loginForm.username.touched">
          用户名必填
        </span>
        <input
          type="text"
          class="form-control"
          placeholder="请输入您的用户名"
          v-model="username"
          v-validate:username="['required']" />
      </div>
      <button
        :disabled="$loginForm.invalid"
        type="submit"
        class="btn btn-success">
        登录
      </button>
    </form>
  </validator>
</template>
<script>
import 'VALIDATOR'
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
          console.info('[LoginForm] 登录成功，立即设置 session 到 $root.userData')
          this.$root.userData = userSessData
        })
    }
  }
}
</script>
