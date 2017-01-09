export default {
  '/msg': {
    
    // 基页
    title: '_#留言板#_',
    icon: 'fa fa-commenting-o',
    showInNavbar: true,
    showInSidebar: true,
    component (resolve) {
      require(['VIEW/msg'], resolve)
    },

    // 子路由
    subRoutes: {
      '/list': {
        title: '_#列表#_',
        icon: 'fa fa-list',
        component (resolve) {
          require(['VIEW/msg/list'], resolve)
        }
      },
      '/detail/:msgId': {
        title: '_#详情#_',
        icon: 'fa fa-search-plus',
        component (resolve) {
          require(['VIEW/msg/detail'], resolve)
        }
      },
      '/add': {
        title: '_#新增#_',
        icon: 'fa fa-plus',
        component (resolve) {
          require(['VIEW/msg/add'], resolve)
        },
        needAuth: true // 用于权限拦截
      },
      '/update/:msgId': {
        title: '_#修改#_',
        icon: 'fa fa-eraser',
        component (resolve) {
          require(['VIEW/msg/update'], resolve)
        },
        needAuth: true
      }
    }

  }
}
