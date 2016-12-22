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
│   ├── services/          # 服务（SERVICE）
│   ├── utils/             # 工具类（UTIL）
│   ├── views/             # 路由视图页（VIEW）
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
例如本 demo 就在根目录下新增了 `docs/`（文档）与 `mock/`（Mock 服务器）

从表面上看，本 demo 与 [`vue-cli`](https://github.com/vuejs/vue-cli) 生成的[结构](http://vuejs-templates.github.io/webpack/structure.html)并没有太大差异  
但接下来的文档内容，会让您了解到更深入的设计
