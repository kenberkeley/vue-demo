<template>
  <a class="btn btn-default btn-block m-t-0 vlink"
    :class="{ 'matched-route': path === curMatchedPath }"
    v-link="vlinkContent">
    <i :class="icon" class="m-r-5"></i>
    {{ title }}
  </a>
</template>
<script>
export default {
  props: {
    path: { type: String, required: true },
    title: { type: String, required: true },
    icon: { type: String, default: 'fa fa-link' },
    isExact: { type: Boolean, default: false }
  },
  computed: {
    curMatchedRoute () {
      const { matched } = this.$route
      return matched[matched.length - 1]
    },
    curMatchedPath () {
      return this.curMatchedRoute.handler.fullPath
    },
    isDynamicPath () {
      return this.path.includes(':')
    },
    vlinkContent () {
      if (this.isDynamicPath) return
      return { path: this.path, exact: this.isExact }
    }
  },
  attached () {
    if (!this.isDynamicPath) return
    $(this.$el).on('click', () =>
      $.toast({
        heading: '动态路由不可直接点击访问',
        icon: 'info',
        stack: false
      })
    )
  }
}
</script>
<style>
.m-t-0 {
  margin-top: 0 !important;
}
.vlink:hover {
  color: orange;
  background-color: #3071a9;
}
.matched-route {
  color: #fff !important;
  background-color: #31b0d5 !important;
}
</style>
