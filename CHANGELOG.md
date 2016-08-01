2016/6/17 `src/build/webpack.base.conf.js`新增自定义路径别名，使得组件、服务等的引入更加方便，同时也把相关的路径改为`COMPONENTS`、`SERVICES`

2016/7/6 合理利用 Vue Router 的 [`route.data`](http://router.vuejs.org/zh-cn/pipeline/data.html)，减少不必要的路由

2016/7/30 将后端 API 拆出独立成一个项目 [简易留言板](https://github.com/kenberkeley/msg-board-api)

2016/8/1 组件命名形式从 msg-list 改为 MsgList；修改 `webpack.dev.conf.js` 中有关 BrowserSync 与 HMR 的配置
