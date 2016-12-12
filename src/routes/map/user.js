export default {
  
  '/user/login': {
    title: '用户登录',
    component (resolve) {
      require(['VIEW/user/login'], resolve)
    },
    forbidAuthed: true
  }

}
