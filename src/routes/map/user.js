export default {
  
  '/user/login': {
    title: '用户登录',
    icon: 'fa fa-sign-in',
    component (resolve) {
      require(['VIEW/user/login'], resolve)
    },
    forbidAuthed: true
  }

}
