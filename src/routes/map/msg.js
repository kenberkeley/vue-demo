export default {
  '/msg': {
    
    // 基页
    title: '留言板',
    icon: 'fa fa-commenting-o',
    showInNavbar: true,
    showInSidebar: true,
    component (resolve) {
      require(['@/views/msg'], resolve)
    },

    // 子路由
    subRoutes: {
      '/list': {
        title: '列表',
        icon: 'fa fa-list',
        component (resolve) {
          require(['@/views/msg/list'], resolve)
        }
      },
      '/detail/:msgId': {
        title: '详情',
        icon: 'fa fa-search-plus',
        component (resolve) {
          require(['@/views/msg/detail'], resolve)
        }
      },
      '/add': {
        title: '新增',
        icon: 'fa fa-plus',
        component (resolve) {
          require(['@/views/msg/add'], resolve)
        },
        needAuth: true // 用于权限拦截
      },
      '/update/:msgId': {
        title: '修改',
        icon: 'fa fa-eraser',
        component (resolve) {
          require(['@/views/msg/update'], resolve)
        },
        needAuth: true
      }
    }

  }
}
