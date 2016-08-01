export default {

  '/msg': {
    
    // 基页
    component (resolve) {
      require(['VIEW/msg/'], resolve)
    },

    // 子路由
    subRoutes: {
      '/': {
        name: 'msgIndex',
        component (resolve) {
          require(['COMPONENT/msg-list/'], resolve)
        }
      },
      '/add': {
        name: 'addMsg',
        component (resolve) {
          require(['COMPONENT/msg-form/'], resolve)
        },
        needToLogin: true
      },
      '/detail/:msgId': {
        name: 'detailMsg',
        component (resolve) {
          require(['COMPONENT/msg-detail/'], resolve)
        }
      },
      '/modify/:msgId': {
        name: 'modifyMsg',
        component (resolve) {
          require(['COMPONENT/msg-form/'], resolve)
        },
        needToLogin: true
      }
    }

  }

}
