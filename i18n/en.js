// src/
module.exports = {
  /* components/ */
    /** Select/ */
      /*** LimitSelect.vue ***/
      '每页显示': 'Show',
      '条': 'records per page',
    /** Sidebar/ */
      /*** index.vue ***/
      '动态路由不可直接点击访问': 'Dynamic routes could not be visited directly',
    /** Breadcrumb.vue **/
    '强制刷新': 'Force reload',
    '返回': 'Back',
    /** Navbar.vue */
    '注销登录': 'Log out',
    '登录': 'Login',
    '文档': 'documentation',
  /* routes/ */
    /** hooks/ **/
      /*** afterEach/ ***/
        /**** simpleLogger.js ****/
        '路由日志': 'Routing Logger',
      /*** beforeEach/ ***/
        /**** authInterceptor.js ****/
        '访问该页面需要登录权限': 'You need to login to access this page',
        '登录成功后将会自动跳转': 'It will trace to the page automatically after login',
        '您已登录，禁止访问该页面': 'You have logged in, the access is disallowed',
        '已中断跳转': 'Transition blocked',
  /** map/ **/
    /*** auth.js ***/
    '用户登录': 'Login',
    // '注销登录': 'Log out', // 已有重复
    /*** index.js ***/
    '首页': 'Home Page',
    /*** msg.js ***/
    '留言板': 'Message Board',
    '列表': 'List',
    '详情': 'Detail',
    '新增': 'Add',
    '修改': 'Update',
  /* services/ */
    /** xhr/ */
      /*** config.js ***/
      '请求 API 失败': 'API request failed',
      /*** jquery.js ***/
      '操作失败': 'Operation failed',
  /* views/ */
    /** auth/ **/
      /*** login.vue ***/
      '仅需输入用户名即可登录': 'Only username is required',
      '用户名为空': 'Username is empty',
    /** msg/ **/
      /*** _components/ ***/
        /**** AuthorSelect.vue ****/
        '双击我刷新下拉框': 'Double click to refresh',
        '筛选发布者:': 'Authors:',
        '请选择发布者': 'Select authors',
        '已刷新': 'Refresh done',
        /**** MsgForm.vue ****/
        '标题': 'Title',
        '请输入标题': 'Please enter title',
        '内容': 'Body',
        '请输入留言信息': 'Enter message here',
        '请完整填写表单': 'Please fill out the form completely',
        /**** OptBtnGroup.vue ****/
        '确认删除？': 'Are you sure to delete ?',
        '删除后不可恢复': 'This operation can not be restored',
        '取消': 'Cancel',
        '删除': 'Delete',
        '删除成功': 'Deleted successfully',
      /*** add.vue ***/
      '发布成功': 'Publish succeeded',
      '已自动跳转到详情页': 'Now in detail page',
      /*** detail.vue ***/
      '标题：': 'Title: ',
      '发布者：': 'Author: ',
      /*** list.vue ***/
      '添加留言信息': 'Add a message',
      '（暂无留言信息）': 'No messages for now',
      '共': 'Total ',
      '条记录': ' records',
      /*** update.vue ***/
      '更新成功': 'Update succeeded',
      // '已自动跳转到详情页': 'Now in detail page', // 已有重复
      '非法访问': 'Illegal access',
    /** index.vue */
    '欢迎使用': 'Welcome to ',
    '两个命令玩转 <code>Vue</code>': 'Have fun with Vue in 2 commands',
  /* app.js */
  '[当前环境] 开发环境': "[Environment] Development",
  '[当前环境] 生产环境': "[Environment] Production"
};
