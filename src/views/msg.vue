<template>
<!-- Msg 模块的基页 -->

  <a
    type="button"
    class="btn btn-default btn-lg btn-block"
    v-link="{ name: 'addMsg' }"
    v-show="!$route.path.startsWith('/msg/add')">
    New Message
    <span class="glyphicon glyphicon-plus"></span>
  </a>

  <br/>
  
  <!-- 嵌套路由 -->
  <router-view></router-view>

</template>
