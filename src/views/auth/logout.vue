<template>
  <div></div>
</template>
<script>
import authService from '@/services/authService' 

export default {
  init () {
    authService.logout().then(() => {
      this.$root.userData = null // “清空 session”
      this.$router.replace('/auth/login')
    })
  }
}
</script>
