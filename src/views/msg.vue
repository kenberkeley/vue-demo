<template>
  <a
    type="button"
    class="btn btn-default btn-lg btn-block"
    v-link="{ name: 'addMsg' }"
    v-if="!$route.path.startsWith('/msg/add')">
    New Message
    <span class="glyphicon glyphicon-plus"></span>
  </a>

  <br/>
  
  <router-view></router-view>
</template>
