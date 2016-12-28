<template>
  <div id="sidebar">
    <template v-for="route in routes">
      <div v-if="route.subRoutes">
        <a :href="'#panel'+$index"
          class="btn btn-default btn-block"
          data-toggle="collapse" data-parent="#sidebar">
          <i :class="route.icon" class="m-r-5"></i>
          {{ route.title }}
          <span class="caret"></span>
        </a>
        <div :id="'panel'+$index" class="collapse w-90p m-0-auto">
          <link v-for="subRoute in route.subRoutes"
            :path="subRoute.fullPath"
            :title="subRoute.title"
            :icon="subRoute.icon">
          </link>
        </div><!-- .collapse -->
      </div><!-- v-if -->
      <link v-else
        :path="route.path"
        :title="route.title"
        :icon="route.icon"
        :is-exact="true">
      </link>
    </template>
  </div><!-- #sidebar -->
</template>
<script>
import Link from './Link'
import routesMap from 'ROUTE/map/'
import _pickBy from 'lodash/pickBy'

export default {
  components: { Link },
  computed: {
    routes: () => _pickBy(routesMap, route => route.showInSidebar)
  },
  watch: {
    '$route.path' () {
      this.expand()
    }
  },
  attached () {
    this.expand()
  },
  methods: {
    // 若当前位置是二级路由，则自动展开折叠
    expand () {
      $(this.$el)
        .find('a.matched-route')
        .parents('div.collapse')
        .collapse('show')
    }
  }
}
</script>
<style>
.w-90p {
  width: 90%;
}
</style>
