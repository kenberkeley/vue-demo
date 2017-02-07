<template>
  <nav class="navbar navbar-default" id="navbar">
    <div class="navbar-header">
      <a class="navbar-brand" v-link="`/`">
        Vue Demo
      </a>
    </div>
    <ul class="nav navbar-nav">
      <li v-for="route in routes" v-link-active>
        <a v-link="{
            path: route.fullPath,
            exact: route.showInNavbar.exact,
            activeClass: 'active'
          }">
          <i class="fa-lg m-r-5" :class="route.icon | defaultIcon"></i>
        </a>
      </li>
    </ul>
    <ul class="nav navbar-nav navbar-right m-r-5">
      <li data-toggle="tooltip" title="Github">
        <a href="https://github.com/kenberkeley/vue-demo" target="_blank">
          <i class="fa fa-github fa-lg"></i>
        </a>
      </li>
      <li data-toggle="tooltip" title="文档">
        <a href="/vue-demo/docs/_book" target="_blank">
          <i class="fa fa-book fa-lg"></i>
        </a>
      </li>
      <li v-if="$root.userData" class="dropdown">
        <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
          <i class="fa fa-user-secret fa-lg m-r-5"></i>
          {{ $root.userData.username }}
          <span class="caret"></span>
        </a>
        <ul class="dropdown-menu">
          <li><a v-link="`/auth/logout`">
            <i class="fa fa-sign-out fa-lg m-r-5"></i>
            注销登录
          </a></li>
        </ul>
      </li>
      <li v-else v-link-active>
        <a v-link="{ path: '/auth/login', activeClass: 'active' }">
          <i class="fa fa-sign-in fa-lg m-r-5"></i>
          登录
        </a>
      </li>
    </ul>
  </nav>
</template>
<script>
import routesMap from 'ROUTE/map/'
import _pickBy from 'lodash/pickBy'

export default {
  computed: {
    routes: () => _pickBy(routesMap, route => route.showInNavbar)
  },
  filters: {
    defaultIcon: icon => icon ? icon : 'fa fa-link'
  },
  attached () {
    $(this.$el).find('[data-toggle=tooltip]').tooltip({
      placement: 'bottom'
    })
  }
}
</script>
