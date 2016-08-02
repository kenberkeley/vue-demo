2016/6/17 src/build/webpack.base.conf.js新增自定义路径别名，使得组件、服务等的引入更加方便，同时也把相关的路径改为`COMPONENTS`、`SERVICES`

2016/7/6 合理利用 Vue Router 的 [`route.data`](http://router.vuejs.org/zh-cn/pipeline/data.html)，减少不必要的路由

2016/7/30 将后端 API 拆出独立成一个项目 [简易留言板](https://github.com/kenberkeley/msg-board-api)

2016/8/1 组件命名形式从 msg-list 改为 MsgList；修改 webpack.dev.conf.js 中有关 BrowserSync / HMR / SOURCE_MAP 的配置；将 views/ 下改成纯 template；改成手动同步 `this.$root.userData = userService.data = XXX` 而不是事件传递；

2016/8/2 分拆 MsgList 组件；修改 webpack.dev.conf.js 中 HMR 失败后自动刷新 reload=true； webpack.base.conf.js 增加 CommonsChunkPlugin
