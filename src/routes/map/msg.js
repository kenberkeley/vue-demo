export default {

  '/msg': {
    
    // 基页
    component (resolve) {
      require(['VIEW/msg'], resolve)
    },

    // 子路由
    subRoutes: {
      '/': {
        name: 'msgIndex',
        component (resolve) {
          require(['COMPONENT/Msg/MsgList/'], resolve)
        }
      },
      '/detail/:msgId': {
        name: 'detailMsg',
        component (resolve) {
          require(['COMPONENT/Msg/MsgDetail'], resolve)
        }
      },
      // 下面两个路由共用同一个组件
      '/add': {
        name: 'addMsg',
        component (resolve) {
          require(['COMPONENT/Msg/MsgForm/'], resolve)
        },
        needToLogin: true // 用于权限拦截
      },
      '/modify/:msgId': {
        name: 'modifyMsg',
        component (resolve) {
          require(['COMPONENT/Msg/MsgForm/'], resolve)
        },
        needToLogin: true
      }
    }

  }

}
