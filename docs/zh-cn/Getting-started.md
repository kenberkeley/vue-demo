# § 开始

### ⊙ 预备知识

在开始前，希望您已通读如下资料：

* [Vue.js 1.x Guide](http://v1.vuejs.org/guide/)
* [Vue.js 1.x API](http://v1.vuejs.org/api/)
* [Vue Router docs for Vue 1.x](https://github.com/vuejs/vue-router/tree/1.0/docs/zh-cn)

同时，您还需要熟悉 ES6。例如，请把如下代码转译成 ES5：
```js
const foo = ({ hello: { world: bar } }) => ({ bar })
```

> 答案请在 [Babel REPL](https://babeljs.io/repl) 自行验证

### ⊙ 安装

> **强烈建议**升级到 `node ≥ 6.x / npm ≥ 3.x` 环境  
> **强烈推荐**往后使用 `cnpm` 替代 `npm` 安装依赖  
> 
> 运行 `npm set registry https://registry.npm.taobao.org` 换源  
> 并不能解决 `node-sass` 的二进制源码包下载极慢的问题

```
$ npm i cnpm -g       // 全局安装 cnpm

$ git clone https://github.com/kenberkeley/vue-demo.git
$ cd vue-demo
$ cnpm i              // 安装本项目依赖
```

### ⊙ 命令

#### 开发
```
$ npm start
```

编译完成后，默认浏览器就会自动打开 `localhost:8080`  
若浏览器没有自动弹出，则请自行手动访问

#### 生产
```
$ npm run build
```

编译完成后，将在项目根目录生成 `dist/` 目录
