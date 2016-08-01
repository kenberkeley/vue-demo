<template src="./login-form.html"></template>
<script>
import userService from 'SERVICE/userService'

export default {
  data () {
    return {
      username: '' // v-model必须设置默认值
    }
  },

  methods: {
    login () {
      userService
        .login({ username: this.username })
        .then((userSessData) => {
          // 将数据写入服务再dispatch（顺序别乱了）
          userService.data = userSessData

          // 挂载到全局Appx的数据，都应当通过服务传递数据
          // （事件虽也可传递数据，但作为单例模式的服务更优雅）

          console.info('LoginForm dispatch LOG_IN')
          this.$dispatch('LOG_IN')
        })
    }
  }
}
</script>
