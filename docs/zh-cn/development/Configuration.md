# § 配置

本项目整体采用 [Webpack](http://webpack.github.io/) 构建，使用 [ESLint](eslint.org) 对代码进行静态检测，使用 [Babel](http://babeljs.io/) 转译 ES6  
[Gulp](gulpjs.com) 仅用于合并压缩打包静态基页（`src/index.html`）中 `build` 标签内全局引入的静态资源  

### ⊙ Webpack

> 本文档不打算照搬 [Webpack 官方文档](https://webpack.github.io/docs/)，仅列出较为重要的部分  
> 特别提醒：开发过程中，改动 `build/` 目录下的配置，都需要**重启**才能生效  
> （您也可以使用 [Nodemon](https://github.com/remy/nodemon)、[Supervisor](https://github.com/Supervisor/supervisor) 等工具进行自动监控重启）

#### 1. 框架 / 类库 单独分离打包
> 见 `build/webpack.base.conf.js` 中的 `entry.vendor`
  
当然，您也可以自行配置 [DllPlugin](http://webpack.github.io/docs/list-of-plugins.html#dllplugin) 以实现**真正的分离**打包

实际上该步骤可通过读取 `package.json` 的 `dependencies` 字段实现自动化，但其灵活度不够高，必要性也不大  
（例如，我们仅使用了 `lodash` 的某几个函数，就没必要将整个 `lodash` 打包进来）

对此我们还有别的替代方案：[split-by-name-webpack-plugin](https://github.com/soundcloud/split-by-name-webpack-plugin)、[webpack-split-by-path](https://github.com/BohdanTkachenko/webpack-split-by-path)  
本项目不引入上述插件主要是考虑到非官方、维护不稳定等因素

#### 2. 路径别名
> 见 `build/webpack.base.conf.js` 中的 `resolve.alias`

路径别名的好处是显而易见的，皆因对引入与重构都很方便

例如，在某组件中，引入 `authService` 需要 `import authService from '../../../services/authService'`  
但有了路径别名后，只需要 `import authService from 'SERVICE/authService'`  
相比于 AngularJS 中的依赖注入，这种方式依赖于构建工具，显得更为简单  

您可能会说，Webpack 只需要设定了 `resolve.root` 为 `src/`  
就可以直接 `import authService from 'services/authService'`  
但在这里其实是会引起歧义的  
试问：`import createBrowserHistory from 'history/lib/createBrowserHistory'`  
您可能会觉得这是 `src/history/lib/createBrowserHistory.js`  
但实际上 [history](https://github.com/mjackson/history) 是一个 npm package  
同样地，您又怎么知道 [`services`](https://www.npmjs.com/package/services) 不是一个 npm package？  
而且重构之后，文件夹的变动会导致相对路径的变化，`services/` 目录未必仍在 `src/` 下    
因此，路径别名相当有必要。其**常量**的形式，让人一看就知道不是一个 npm package

#### 3. 环境变量
> 见 `build/webpack.dev.conf.js` 中的 `plugins`：[DefinePlugin](http://webpack.github.io/docs/list-of-plugins.html#defineplugin)

默认有 `__DEV__` 与 `__PROD__` 两个全局变量  
若要继续添加，则还需要在 `.eslintrc` 中 `globals` 同步写入  
由此即可根据当前运行环境执行对应的代码：
```js
if (__DEV__) {
  // 开发环境下执行的代码
}
if (__PROD__) {
  // 生产环境下执行的代码
}
```
 
> 在此需要提醒，在 `npm scripts` 中设置 `NODE_ENV` 要注意末尾空格的[问题](http://stackoverflow.com/questions/11104028/#38948727)  
> 使用前最好先 `trim` 一下：`process.env.NODE_ENV.trim()`
> 
> 拓展阅读：[解读 UglifyJS](http://rapheal.sinaapp.com/2014/05/22/uglifyjs-squeeze/)，里面介绍了 UglifyJS 会如何处理这些环境变量

### ⊙ ESLint
配置文件见项目根目录下的 `.eslintrc`，对其的任何修改都是立即生效  
配置规则请参考 [docs·rules](http://eslint.org/docs/user-guide/migrating-to-1.0.0)（请注意当前版本为 1.x）

> 温馨提示：`build/webpack.base.conf.js` 中的 [eslint-friendly-formatter](https://github.com/royriojas/eslint-friendly-formatter)，使得点击命令行中的报错后可以直接跳到目标位置

### ⊙ Babel
配置文件见项目根目录下的 `.babelrc`  
配置详情请自行参考 [docs·babelrc](http://babeljs.io/docs/usage/babelrc/)

### ⊙ Gulp

> 完全参考知友 @游志军 的[回答](https://www.zhihu.com/question/27548038/answer/37140329)
