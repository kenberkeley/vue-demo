<template>
  <div class="row">
    <div class="col-md-12">
      <nav class="navbar navbar-default">
        <div class="navbar-header">
          <a class="navbar-brand" v-link="`/`">
            Vue Demo
          </a>
        </div>
        <ul class="nav navbar-nav">
          <li v-link-active>
            <a v-link="{ path: '/', exact: true, activeClass: 'active' }">
              <i class="fa fa-home fa-lg m-r-5"></i>
            </a>
          </li>
        </ul>
        <ul class="nav navbar-nav navbar-right m-r-5">
          <li v-if="$root.userData" class="dropdown">
            <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
              {{ $root.userData.username }}
              <span class="caret"></span>
            </a>
            <ul class="dropdown-menu">
              <li><a v-link="`/auth/logout`">
                <i class="fa fa-sign-out m-r-5"></i>
                注销登录
              </a></li>
            </ul>
          </li>
          <li v-else v-link-active>
            <a v-link="{ path: '/auth/login', activeClass: 'active' }">
              <i class="fa fa-sign-in m-r-5"></i>
              登录
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
