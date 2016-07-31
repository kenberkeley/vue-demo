# Vue 示例项目

## 目录
&sect; [技术栈](#features)

&sect; [快速开始](#getting-started)

  * [安装](#installation)
  * [启动](#start)
  
&sect; [项目架构](#architecture)

  * [目录结构](#tree)
  * [与官方示例项目的区别](#difference)
  * [谈谈状态管理](#state-management)
  
&sect; [开发](#development)

  * [配置Webpack](#webpack-configure)
  * [规范](#standard)
  
&sect; [测试](#testing)  
&sect; [部署](#deployment)

****

## <a name="features">&sect; 技术栈</a>
(详情可参阅`package.json`)

* vue 1.0.18
* vue-router
* vue-resource / superagent / ...
* webpack
* ES6 + babel
* (UI) jQuery + BootStrap

***

## <a name="getting-started">&sect; 快速开始</a>
> 在开始前，您需要通读 [Vue.js Guide](http://cn.vuejs.org/guide/)、[Vue.js API](http://cn.vuejs.org/api/)、[Vue-Router文档](http://router.vuejs.org/zh-cn/index.html) 才能有更好的理解

### <a name="installation">安装</a>
> 推荐升级到 node 5.x + npm 3.x 环境  
> 推荐使用 `cnpm` 或手动切换到淘宝 npm 源  
> `npm set registry https://registry.npm.taobao.org/`

本示例项目需要 [简易留言板 RESTful API](https://github.com/kenberkeley/msg-board-api) 作为后端，模拟前后端分离开发   
请分别 `git clone`，打开**两个**命令窗口（ Windows 下推荐使用 `Cygwin`）**分别**切换到两者的目录下  
敲下 `npm install` 安装依赖（为避免 Windows 下的 npm 软链接问题，您可以加上 `--no-bin-link` 完全解构所有依赖）  
  
### <a name="start">启动</a>
首先，在 `msg-board-api` 的命令窗口下，敲下 `npm start`  
随后，在 `vue-demo` 的命令窗口下，敲下 `npm start`  
如无意外，默认浏览器就会自动打开 `localhost:8080`，您立即可以看到效果  
若浏览器没有自动弹出，则请自行手动访问  
（开发过程中，通过 Webpack 处理的静态资源都由基于内存的 `webpack-dev-server` 提供）  
***

## <a name="architecture">&sect; 项目架构</a>
### <a name="tree">目录结构</a>
```
.
├── build/               # Webpack配置目录
├── dist/                # build生成的生产环境下的项目
├── src/                 # 源码目录（开发都在这里进行）
│   ├── assets/            # 放置需要经由Webpack处理的静态文件（font等）
│   ├── components/        # 组件
│   ├── directives/        # 指令
│   ├── filters/           # 过滤器
│   ├── routes/            # 路由
│   ├── services/          # 服务
│   ├── views/             # 路由视图基页
│   ├── app.js             # 启动文件
│   ├── appx.vue           # 根组件
│   ├── index.html         # 静态基页
├── static/              # 放置无需经由Webpack处理的静态文件
├── .babelrc             # babel转码配置
├── .eslintignore        # （配置）ESLint检查中需忽略的文件（夹）
├── .eslintrc            # ESLint配置
├── .gitignore           # （配置）需被Git忽略的文件（夹）
├── package.json         # （这个就不用多解释了吧）
```
### <a name="difference">与官方示例项目的区别</a>
实际上，本示例项目基于[官方示例项目](https://github.com/vuejs-templates/webpack)，结合 Github 上几个较为优秀的启动器改进而来。
* 本示例项目秉承**最佳实践**，尽可能地实现**代码分离/复用**。
* 引入 AngularJS 中全局单例模式的服务层（`services/`）。例如，后端用于用户登录的API为 `/login`，那么前端 `services/userService.js` 这个服务类中就对应存在一个名为 `login` 的函数，只需要调用 `userService.login({用户帐号密码})` 即可实现请求。
引入服务层的主要作用就是为了**轻量化组件，统一管理 XHR 请求**，避免在组件中分别实现请求而导致管理上的混乱。**前端的服务与后端的 API 一一对应**，在理解上也会变得更加容易。
同时，service 还可以在特定情况下存储**状态持久**的数据以便于全局通用，在一定程度上可避免使用事件（`$dispatch、$broadcast`）传递。例如，您可以在任何地方（不限于组件内部）调用 `userService.data` 获取用户信息。（此处属于 ***状态管理*** 的范畴，下文会提及更多）

***

### <a name="state-management">谈谈状态管理</a>
Vue.js 参照 [Flux](https://github.com/facebook/flux)/[Redux](https://github.com/reactjs/redux)，实现出 [Vuex](https://github.com/vuejs/vuex)，专注于**应用层级**的状态管理。
本示例项目并没有引入 Vuex ，主要是基于以下考量：

如果您看过文档中的[简易教程·计数器](http://vuex.vuejs.org/zh-cn/tutorial.html)，您应该会觉得 Vuex 把简单问题复杂化了（的确如此）。为了实现全局状态管理，把原本简单优雅的双向绑定以及操作方法都剥离开来，抽象成 Vuex 的 `state mutation action`。对于绝大部分中小型项目而言，这显然是过度设计，牛刀杀鸡。

对于这个问题，作者尤雨溪有如下[评述](http://vuex.vuejs.org/zh-cn/intro.html)：
> &nbsp;&nbsp;&nbsp;当你的应用还很简单的时候，你多半并不需要 Vuex。也不建议过早地使用  Vuex。但如果你正在构建一个中型以上规模的 SPA，你很有可能已经需要思考应该如何更好地归纳 Vue 之外，应用的其他组成部分。这就是 Vuex 要大显身手的时刻。  
&nbsp;&nbsp;&nbsp;我们在单独使用 Vue.js 的时候，通常会把状态储存在组件的内部。也就是说，每一个组件都拥有当前应用状态的一部分，整个应用的状态是分散在各个角落的。然而我们经常会需要把状态的一部分共享给多个组件。一个常见的解决策略为：使用定制的事件系统，让一个组件把一些状态“发送”到其他组件中。这种模式的问题在于，大型组件树中的事件流会很快变得非常繁杂，并且调试时很难去找出究竟哪错了。  
&nbsp;&nbsp;&nbsp;为了更好的解决在大型应用中状态的共用问题，我们需要对组件的 组件本地状态(component local state) 和 应用层级状态(application level state) 进行区分。应用级的状态不属于任何特定的组件，但每一个组件仍然可以监视（Observe）其变化从而响应式地更新 DOM。通过汇总应用的状态管理于一处，我们就不必到处传递事件。因为任何牵扯到一个以上组件的逻辑，都应该写在这里。此外，这样做也能让我们更容易地记录并观察状态的变更（Mutation，原意为突变），甚至可以实现出华丽如时光旅行一般的调试效果。

React 作为一个 View 层，不具备数据的双向绑定能力，其数据流是**单向**的。既然是**单向数据流**，那么将整个应用状态汇于一处集中管理（这就是传统意义上的 Model 层，只是改名为 Store 层罢了），抽离出操作方法等（Controller 层，在此为 Action 与 Reducer 层），也是自然而然的。这是基于大型项目协作开发中，前人踩坑后的最佳经验总结，同时也是当前前端 MVC 的最佳实践。
但 Vue.js 乃轻量级的 MVVM 框架，若完全照搬相对抽象的 React + Flux/Redux 架构，未免有点**舍本逐末**了。私认为，对于一个使用 MVVM 模式构建的单页应用而言，需要置于 Store 层的，仅限于**全局通用**且**状态持久**的数据（例如用户认证信息）。若把所有应用数据都糅合在一处，那就像是把所有变量都挂载到全局。

结合作者尤雨溪的说法，Vue.js 状态管理的最佳实践应为：**组件自包含状态数据（组件本地状态），全局持久性通用数据（应用层级状态）集中管理**。

可是，**全局通用**且**状态持久**的数据占极少数，若为此而引入 Vuex，实在是太不值得了。这个时候，就需要借鉴 AngularJS 的一些经验实践来实现 Vuex 的功能。
在 Angular 中，组件间的数据传递一般是使用服务（service），若是全局通用的状态数据，就挂载到`$rootScope`上。参照上述实践，我们让 Vue 的根组件（赐名为 `Appx`，位于 `src/appx.vue`）充当 Vuex，但省去各种繁琐抽象的概念，直接把**全局通用**的数据挂载到根组件的 data 属性（相当于 `$rootScope`）上，这样一来，在子组件中直接使用 `this.$root` 即可访问。同样地，service 也可存储数据，直接挂载到其 data 属性即可
> 虽说 service 可以存储数据，但其主要功能还是封装好与后端 API 一一对应的函数。对于那些**状态毋须持久**的数据（例如表单项），还是直接使用事件传递为佳

***

## <a name="development">&sect; 开发</a>
### <a name="webpack-configure">配置Webpack</a>
> 由于项目本身已经配置好了 Webpack，在这块上您可以不求甚解，但了解 Webpack 的使用还是相当有必要的

实际上 Webpack 的配置（位于 `build/` 目录下）已经相当成熟，正常情况下您毋须理会太多。
* 默认的前端服务器为 `localhost:8080`，可在 `build/webpack.config.dev.js` 中找到
* 后端 RESTful API 服务器基地址写在了 `src/services/xhr/config.js` 中，请根据实际自行修改
* 路径别名常量的定义位于 `build/webpack.base.conf.js`，好处就是引入与重构都很方便。例如，在某组件中，引入 `userService` 需要 `import userService from '../../../services/userService'` ，但有了路径别名后，只需要 `import userService from 'SERVICES/userService'` 。相比于 AngularJS 中的**依赖注入**，这种方式依赖于构建工具，显得更为简单

### <a name="standard">规范</a>
> 开发规范请参考 [**VueJS最佳实践**](./VueJS最佳实践.md)  
> 本示例项目的代码极尽详细地添加了注释，其中不乏最佳实践提示


***

## <a name="testing">&sect; 测试</a>
> 请自行选择测试工具

***

## <a name="deployment">&sect; 部署</a>
在 `vue-demo` 的命令窗口下，敲下 `npm run build`，将会在项目根目录下生成 `dist/`
> 关于生产环境下的部署与优化，已超出本文档的论述范围，请自行查阅相关资料
