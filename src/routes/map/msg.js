export default {

  '/msg': {
    
    // 基页
    component (resolve) {
      require(['VIEWS/msg/'], resolve)
    },

    // 子路由
    subRoutes: {
      '/': {
        name: 'msgIndex',
        component (resolve) {
          require(['COMPONENTS/msg-list/'], resolve)
        }
      },
      '/add': {
        name: 'addMsg',
        component (resolve) {
          require(['COMPONENTS/msg-form/'], resolve)
        },
        needToLogin: true
      },
      '/detail/:msgId': {
        name: 'detailMsg',
        component (resolve) {
          require(['COMPONENTS/msg-detail/'], resolve)
        }
      },
      '/modify/:msgId': {
        name: 'modifyMsg',
        component (resolve) {
          require(['COMPONENTS/msg-form/'], resolve)
        },
        needToLogin: true
      }
    }

  }

}
