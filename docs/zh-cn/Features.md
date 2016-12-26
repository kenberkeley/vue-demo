# § 技术栈

* [Vue 1.x](https://github.com/vuejs/vue/tree/1.0)
* [Vue Router 0.7.x](https://github.com/vuejs/vue-router/tree/v0.7.13)
* ES6 + [Babel](http://babeljs.io/) + [ESLint 1.x](http://eslint.org/)
* [Lodash 4.x](https://lodash.com/)
* [Webpack 1.x](http://webpack.github.io/docs/)（辅以 [Gulp](http://gulpjs.com/)）
* [BrowserSync](https://github.com/BrowserSync/browser-sync)（多端调试）
* [Express 4.x](http://expressjs.com/)（提供开发热更替与静态资源服务器）
* [jQuery](http://jquery.com/) + [BootStrap 3.x](http://getbootstrap.com/) (UI)

> #### 注意：
> `package.json` 的 `dependencies` 中：  
> * [`lowdb`](https://github.com/typicode/lowdb)
> * [`uuid`](https://github.com/kelektiv/node-uuid)
> * [`tiny-express`](https://github.com/kenberkeley/tiny-express)
> 
> 仅为留言板 Mock 服务器 `mock/` 所需  
> 您往后的开发中，可删掉上述三个依赖以及 `docs/`、`mock/` 目录
