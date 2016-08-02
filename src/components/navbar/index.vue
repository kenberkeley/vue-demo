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
            v-link="{ path: '/' }">
            Vue Demo
          </a>
        </div>

        <div class="collapse navbar-collapse" id="nav-collapse">
          <ul class="nav navbar-nav">
            <li :class="{ 'active': $route.path === '/' }">
              <a v-link="{ name: 'welcome' }">
                Welcome
              </a>
            </li>
            <li :class="{ 'active': $route.path.startsWith('/msg') }">
              <a v-link="{ path: '/msg' }">
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

export default {
  components: { LoginForm, LogoutDropdown }
}
</script>
