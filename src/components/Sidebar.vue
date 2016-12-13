<template>
  <div id="sidebar">
    <template v-for="route in routes">
      <div v-if="route.subRoutes">
        <a :href="'#panel'+$index"
          class="btn btn-default btn-block anchor"
          data-toggle="collapse" data-parent="#sidebar">
          <i :class="route.icon" class="m-r-5"></i>
          {{ route.title }}
          <span class="caret"></span>
        </a>
        <div :id="'panel'+$index" class="collapse w-90p m-0-auto">
          <a v-for="subRoute in route.subRoutes"
            :comment="subRoute.comment"
            class="btn btn-default btn-block anchor m-t-0"
            v-link="{
              path: trimDynamicParams(subRoute.fullPath),
              activeClass: 'matched-route'
            }">
            <i :class="subRoute.icon" class="m-r-5"></i>
            {{ subRoute.title }}
          </a>
        </div><!-- .collapse -->
      </div><!-- v-if -->
      <a v-else class="btn btn-default btn-block anchor"
        v-link="{
          path: route.path,
          activeClass: 'matched-route',
          exact: true
        }">
        <i :class="route.icon" class="m-r-5"></i>
        {{ route.title }}
      </a><!-- v-else -->
    </template>
  </div><!-- #sidebar -->
</template>
<script>
import routesMap from 'ROUTE/map/'
import _pickBy from 'lodash/pickBy'

console.log(routesMap)

export default {
  computed: {
    // 常规页面的路由都带有 title 属性
    routes: () => _pickBy(routesMap, route => route.title),
    trimDynamicParams: () => (url) => url.replace(/:.*?$/, '')
  },
  attached () {
    // 自动展开折叠到当前位置
    setTimeout(() => {
      $(this.$el)
        .find('.matched-route')
        .parents('.collapse')
        .collapse('show')
    }, 1000)

    $(this.$el).find('a[comment]').each(function () {
      $(this).tooltip({ title: $(this).attr('comment') })
    })
  }
}
</script>
<style>
.w-90p {
  width: 90%;
}
.m-t-0 {
  margin-top: 0 !important;
}
.anchor:hover {
  color: orange;
  background-color: #3071a9;
}
.matched-route {
  color: #fff !important;
  background-color: #31b0d5 !important;
}
</style>
