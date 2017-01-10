// import router from 'ROUTE/' // 为避免循环依赖，改用如下传入的方式

// 权限拦截
const authInterceptor = (router) => ({ to, redirect, abort, next }) => {
  const { userData } = router.app
  // needAuth：需要登录后访问；forbidAuthed：禁止登录后访问
  const { needAuth, forbidAuthed, path } = to

  if (needAuth && !userData) {
    $.toast({
      heading: '_#访问该页面需要登录权限#_',
      text: '_#登录成功后将会自动跳转#_',
      icon: 'info',
      stack: false
    })
    return redirect({
      path: `/auth/login?referrer=${encodeURIComponent(path)}`,
      force: true // 禁用追加模式
    })
  }
  
  if (forbidAuthed && userData) {
    $.toast({
      heading: '_#您已登录，禁止访问该页面#_',
      text: '_#已中断跳转#_',
      icon: 'warning',
      stack: false
    })
    return abort()
  }

  next()
}

export default authInterceptor
