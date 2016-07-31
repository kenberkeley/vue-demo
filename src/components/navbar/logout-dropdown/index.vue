<template src="./logout-dropdown.html"></template>
<script>
import userService from 'SERVICES/userService'

export default {
  computed: {
    username () {
      return userService.data.username
    }
  },

  methods: {
    logout () {
      userService
        .logout()
        .then(() => {
          userService.data = null // 清空服务中的用户状态数据

          console.info('LogoutDropdown dispatch LOG_OUT')
          this.$dispatch('LOG_OUT')
        })
    }
  }
}
</script>
