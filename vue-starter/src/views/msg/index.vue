<template>
  <a
    type="button"
    class="btn btn-default btn-lg btn-block"
    v-link="{ name: 'addMsg' }"
    v-if="$root.userData && !$route.path.startsWith('/msg/add')">
    New Message
    <span class="glyphicon glyphicon-plus"></span>
  </a>

  <br/>
  
  <router-view></router-view>
</template>
<script>
// 路由/msg的基页。在这里可以直接写HTML，内容实在是太少了，没有必要分出去
export default {}
</script>
