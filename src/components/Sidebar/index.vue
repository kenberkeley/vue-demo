<template>
  <div id="sidebar">
    <template v-for="route in accessibleRoutes">
      <div v-if="route.subRoutes">
        <a :href="'#panel'+$index"
          class="btn btn-default btn-block anchor"
          data-toggle="collapse" data-parent="#sidebar">
          <i :class="route.icon" class="m-r-5"></i>
          {{ route.title }}
          <span class="caret"></span>
        </a>
        <div :id="'panel'+$index" class="collapse w-90p m-0-auto">
          <vlink v-for="subRoute in route.subRoutes"
            :path="subRoute.fullPath"
            :title="subRoute.title"
            :icon="subRoute.icon">
          </vlink>
        </div><!-- .collapse -->
      </div><!-- v-if -->
      <vlink v-else
        :path="route.path"
        :title="route.title"
        :icon="route.icon"
        :is-exact="true">
      </vlink>
    </template>
  </div><!-- #sidebar -->
</template>
<script>
import Vlink from './Vlink'
import routesMap from 'ROUTE/map/'
import _pickBy from 'lodash/pickBy'

export default {
  components: { Vlink },
  computed: {
    accessibleRoutes: () => _pickBy(routesMap, route => route.showInSidebar)
  },
  attached () {
    // 自动展开折叠到当前位置
    setTimeout(() => {
      $(this.$el).find('.matched-route').parents('.collapse').collapse('show')
    }, 1000)
  }
}
</script>
<style>
.w-90p {
  width: 90%;
}
</style>
