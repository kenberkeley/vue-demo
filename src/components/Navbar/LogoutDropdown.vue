<template>
  
  <ul class="nav navbar-nav navbar-right">
    <li class="dropdown">
      <a
        class="dropdown-toggle"
        href="javascript:;"
        data-toggle="dropdown">
        欢迎您，{{ username }}
        <strong class="caret"></strong>
      </a>
      <ul class="dropdown-menu">
        <li @click="logout">
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
          // 手动同步顶级变量与服务
          this.$root.userData = userService.data = null
          this.$router.replace('/')
        })
    }
  }
}
</script>
