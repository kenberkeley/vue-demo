<template>
  <form @submit.prevent="handleSubmit" class="m-0-auto m-t-100 w-60p">
    <div class="form-group">
      <div class="input-group">
        <div class="input-group-addon">
          <i class="fa fa-user"></i>
        </div>
        <input type="text" v-model="username" required
          class="form-control" placeholder="_#仅需输入用户名即可登录#_">
      </div>
    </div>
    <button type="submit" class="btn btn-block"
      :class="{ 'btn-success': username.length }"
      :disabled="!username.length">
      <i class="fa fa-sign-in m-r-5"></i>
      _#登录#_
    </button>
  </form>
</template>
<script>
import authService from 'SERVICE/authService'

export default {
  data: () => ({ username: '' }),
  methods: {
    handleSubmit () {
      let username = $.trim(this.username)
      if (!username) return $.toast({
        heading: '_#用户名为空#_',
        icon: 'warning',
        stack: false
      })

      authService
        .login({ username })
        .then(userData => {
          this.$root.userData = userData // “写 session”
          
          let { referrer } = this.$route.query
          referrer = referrer ? decodeURIComponent(referrer) : '/'
          this.$router.replace({ path: referrer, force: true })
        })
    }
  }
}
</script>
<style>
.m-t-100 {
  margin-top: 100px !important;
}
.w-60p {
  width: 60%;
}
</style>
