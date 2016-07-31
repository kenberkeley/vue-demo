<template src="./navbar.html"></template>
<script>
import LoginForm from './login-form/'
import LogoutDropdown from './logout-dropdown/'

export default {
  components: { LoginForm, LogoutDropdown },

  events: {
    LOG_IN () {
      console.info('Navbar on LOG_IN')
      return true // 显式返回true才能允许事件继续往上传递
    },

    LOG_OUT () {
      console.info('Navbar on LOG_OUT')
      return true
    }
  }
}
</script>
