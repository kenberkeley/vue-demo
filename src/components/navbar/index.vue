<template>
  <div class="row clearfix">
    <div class="col-md-12 column">
      <nav class="navbar navbar-default" role="navigation">
        <div class="navbar-header">
          <button
            type="button"
            class="navbar-toggle"
            data-toggle="collapse"
            data-target="#nav-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a
            class="navbar-brand"
            v-link="'/'">
            Vue Demo
          </a>
        </div>
        <div class="collapse navbar-collapse" id="nav-collapse">
          <ul class="nav navbar-nav">
            <li :class="{ 'active': $route.path === '/' }">
              <a v-link="'/'">
                Welcome
              </a>
            </li>
            <li :class="{ 'active': $route.path.startsWith('/msg') }">
              <a v-link="'/msg'">
                Message Board
              </a>
            </li>
          </ul>

          <login-form v-if="!$root.userData"></login-form>
          <logout-dropdown v-if="$root.userData"></logout-dropdown>
        </div>
      </nav>
    </div>
  </div>
</template>
<script>
import LoginForm from './LoginForm'
import LogoutDropdown from './LogoutDropdown'
import userService from 'SERVICE/userService'

export default {
  // 绝对私有的组件可以直接包含在父组件目录下
  components: { LoginForm, LogoutDropdown },

  // 组件创建之初就发送用户是否已登录的请求
  // 组件生命周期请参考http://cn.vuejs.org/guide/instance.html
  created () {
    console.info('[Navbar:XHR] 检测用户是否已经登录')
    userService.checkLogin()
      .then((userSessData) => {
        if (!userSessData) {
          return console.info('[Navbar] 检测完毕，当前用户尚未登录')
        }

        // 【手动】同步顶级变量与服务
        console.info('[Navbar] 检测完毕，当前用户已经登录，立即手动同步 $root.userData 与 userService.data')
        this.$root.userData = userService.data = userSessData
      })
  }
}
</script>
