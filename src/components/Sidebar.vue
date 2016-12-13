<template>
  <div class="panel-group" id="sidebar">
    <template v-for="route in routes">
      <template v-if="route.title">
        <div class="panel panel-default">
          <template v-if="route.subRoutes">
            <div :href="'#panel'+$index"
              class="panel-heading anchor-mouse"
              data-toggle="collapse" data-parent="#sidebar">
              <h4 class="panel-title text-center">
                <i :class="route.icon" class="m-r-5"></i>
                {{ route.title }}
                <span class="caret"></span>
              </h4>
            </div>
            <div :id="'panel'+$index" class="panel-collapse collapse">
              <div class="panel-body p-0">
                <ul class="list-group m-0">
                  <li v-for="subRoute in route.subRoutes"
                    v-link="{
                      path: subRoute.fullPath.replace(/:.*?$/, ''),
                      activeClass: 'matched-route'
                    }"
                    class="list-group-item anchor-mouse text-center">
                    <i :class="subRoute.icon" class="m-r-5"></i>
                    {{ subRoute.title }}
                  </li>
                </ul>
              </div><!-- .panel-body -->
            </div><!-- .panel-collapse -->
          </template>
          <template v-else>
            <!-- v-link 并非限定用于 a 标签 -->
            <div v-link="{
                path: route.path.replace(/:.*?$/, ''),
                activeClass: 'matched-route',
                exact: true
              }"
              data-parent="#sidebar" data-toggle="collapse"
              class="panel-heading anchor-mouse"
              style="background-color:#fff">
              <h4 class="panel-title text-center">
                <i :class="route.icon" class="m-r-5"></i>
                {{ route.title }}
              </h4>
            </div>
          </template>
        </div><!-- .panel-default -->
      </template>
    </template>
  </div><!-- .panel-group -->
</template>
<script>
import routesMap from 'ROUTE/map/'
// TODO：replace(/:.*?$/, '')
export default {
  computed: {
    routes: () => routesMap
  },
  attached () {
    // 自动展开折叠
    setTimeout(() => {
      $(this.$el)
        .find('li.matched-route')
        .parents('div.collapse')
        .collapse('show')
    }, 1000)
  }
}
</script>
<style>
.anchor-mouse {
  cursor: pointer;
}
.anchor-mouse:hover {
  color: orange;
  background-color: #3071a9;
}
.matched-route {
  color: #fff !important;
  background-color: #31b0d5 !important;
}
</style>
