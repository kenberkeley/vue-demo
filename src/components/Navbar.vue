<template>
  <div class="row">
    <div class="col-md-12 column">
      <nav class="navbar navbar-default">
        <div class="navbar-header">
          <button class="navbar-toggle"
            data-toggle="collapse"
            data-target="#nav-collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" v-link="'/'">
            Vue Demo
          </a>
        </div>
        <div class="collapse navbar-collapse" id="nav-collapse">
          <ul class="nav navbar-nav">
            <li :class="{ 'active': $route.path === '/' }">
              <a v-link="'/'">
                欢迎页
              </a>
            </li>
            <li :class="{ 'active': $route.path.startsWith('/msg') }">
              <a v-link="'/msg'">
                留言板
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
