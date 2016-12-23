# § 目录结构

```
.
├── build/               # Webpack 配置目录
├── dist/                # build 生成的生产环境下的项目
├── src/                 # 源码目录（开发都在这里进行）
│   ├── assets/            # 放置需要经由 Webpack 处理的静态文件（ASSET）
│   ├── components/        # 组件（COMPONENT）
│   ├── filters/           # 过滤器（FILTER）
│   ├── mixins/            # （MIXIN）
│   ├── routes/            # 路由（ROUTE）
│   ├── services/          # 服务（SERVICE，统一管理 XHR 请求）
│   ├── utils/             # 工具类（UTIL）
│   ├── views/             # 路由页面组件（VIEW）
│   ├── app.js             # 启动文件
│   ├── index.html         # 静态基页
├── static/              # 放置无需经由 Webpack 处理的静态文件
├── .babelrc             # Babel 转码配置
├── .eslintignore        # （配置）ESLint 检查中需忽略的文件（夹）
├── .eslintrc            # ESLint 配置
├── .gitignore           # （配置）需被 Git 忽略的文件（夹）
├── package.json         # （这个就不用多解释了吧）
```

您可以根据业务需求改动目录结构  
譬如本 demo 就在根目录下新增了 `docs/`（文档）与 `mock/`（Mock 服务器）

上述目录结构中，需要注意的是 `src/components/` 与 `src/views/` 的区别  
不妨把本 demo 中的这两个目录以树状形式展开：

```
src/components/                    # 组件
    ├── App.vue                      # 根组件
    ├── Breadcrumb.vue               # 面包屑
    ├── Navbar.vue                   # 顶部导航栏
    ├── Pagination.vue               # 分页
    ├── Select/                      # 下拉框选择框组件
    │   ├── LimitSelect.vue            # “每页显示多少条记录” 下拉选择框
    │   └── Select2.vue                # 对 Select2 的封装
    └── Sidebar/                     # 侧边栏组件
        ├── index.vue                  # 侧边栏
        └── Link.vue                   # 导航链接封装

src/views/                         # 路由页面组件
    ├── index.vue                    # 首页
    ├── auth/                        # 用户认证模块
    │   ├── login.vue                  # 登录页
    │   └── logout.vue                 # 注销登录页
    └── msg/                         # 留言板模块
        ├── index.vue                  # /msg（留言板首页，alias => /msg/list）
        ├── list.vue                   # /msg/list（留言板列表）
        ├── add.vue                    # /msg/add（新增留言）
        ├── detail.vue                 # /msg/detail/:msgId（查看留言）
        ├── update.vue                 # /msg/update/:msgId（修改留言）
        ├── _components/               # 留言板模块共用组件
        │   ├── AuthorSelect.vue         # 留言发布者选择下拉框
        │   ├── MsgForm.vue              # 留言表单
        │   └── OptBtnGroup.vue          # 留言操作按钮组
        └── _mixins/                   # 留言板模块共用 mixins
            └── autoLoadByParams.js      # 根据 $route.params.msgId 自动加载
```

根据注释，我们大概知道了二者的差别：

`src/components/`
* 主要是全局性的，或通用性很强的组件（例如是对某些插件的封装）
* 一般不会涉及到业务逻辑
* 具备良好的封装性（根组件 `App.vue` 除外）
