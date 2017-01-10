export default {
  
  '/auth/login': {
    title: '_#用户登录#_',
    icon: 'fa fa-sign-in',
    component (resolve) {
      require(['VIEW/auth/login'], resolve)
    },
    forbidAuthed: true
  },

  '/auth/logout': {
    title: '_#注销登录#_',
    icon: 'fa fa-sign-out',
    component (resolve) {
      require(['VIEW/auth/logout'], resolve)
    },
    needAuth: true
  }

}
