<template>
  
  <ul class="nav navbar-nav navbar-right">
    <li class="dropdown">
      <a
        class="dropdown-toggle"
        href="javascript:;"
        data-toggle="dropdown">
        欢迎您，{{ $root.userData.username }}
        <strong class="caret"></strong>
      </a>
      <ul class="dropdown-menu">
        <li @click="handleLogout">
          <a href="javascript:;">
            注销登录
          </a>
        </li>
      </ul>
    </li>
  </ul>

</template>
<script>
import userService from 'SERVICE/userService'

export default {
  methods: {
    handleLogout () {
      userService
        .logout()
        .then(() => {
          console.info('[LogoutDropdown:XHR] 注销登录，立即清空 $root.userData 的 session')
          this.$root.userData = null

          // 跳转回首页
          this.$router.replace('/')
        })
    }
  }
}
</script>
