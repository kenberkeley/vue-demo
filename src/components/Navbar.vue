<template>
  <div class="row">
    <div class="col-md-12">
      <nav class="navbar navbar-default">
        <div class="navbar-header">
          <a class="navbar-brand" v-link="`/`">
            Vue Demo
          </a>
        </div>
        <ul class="nav navbar-nav navbar-right">
          <li class="dropdown">
            <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
              Dropdown
              <span class="caret"></span>
            </a>
            <ul class="dropdown-menu">
              <li><a href="#">Action</a></li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
