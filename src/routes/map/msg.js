export default {
  '/msg': {
    
    // 基页
    component (resolve) {
      require(['VIEW/msg'], resolve)
    },

    // 子路由
    subRoutes: {
      '/list': {
        title: '留言板 · 列表',
        component (resolve) {
          require(['VIEW/msg/list'], resolve)
        }
      },
      '/detail/:msgId': {
        title: '留言板 · 详情',
        component (resolve) {
          require(['VIEW/msg/detail'], resolve)
        }
      },
      '/add': {
        title: '留言板 · 新增',
        component (resolve) {
          require(['VIEW/msg/add'], resolve)
        },
        needAuth: true // 用于权限拦截
      },
      '/update/:msgId': {
        title: '留言板 · 修改',
        component (resolve) {
          require(['VIEW/msg/update'], resolve)
        },
        needAuth: true
      }
    }

  }
}
