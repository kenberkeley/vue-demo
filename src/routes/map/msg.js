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
          require(['COMPONENT/MsgList/'], resolve)
        }
      },
      '/detail/:msgId': {
        name: 'detailMsg',
        component (resolve) {
          require(['COMPONENT/MsgDetail/'], resolve)
        }
      },
      // 下面两个路由共用同一个组件
      '/add': {
        name: 'addMsg',
        component (resolve) {
          require(['COMPONENT/MsgForm/'], resolve)
        },
        needToLogin: true
      },
      '/modify/:msgId': {
        name: 'modifyMsg',
        component (resolve) {
          require(['COMPONENT/MsgForm/'], resolve)
        },
        needToLogin: true
      }
    }

  }

}
