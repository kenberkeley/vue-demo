# Vue 最佳实践

## &sect; 命名规范
> 命名是一个很大的议题，同时也是软件开发中的“难题”，更多信息请自行搜索学习  
> 一般不允许使用拼音，更不应该直接使用无义的`a, b, c，data`等

**宗旨**：顾名思义，没有歧义。原则上严禁 JS 全局变量

* HTML / CSS（id class 等）：`login-modal`、`navbar`
* JS 中（仅列出常用的）：
  * 普通变量：`home`、`myCat`
  * 布尔值变量：`isLogin`、`hasMoney`
  * 私有变量：`_privateVar`
  * 全局变量、事件：`CONSTANT` (一般为单数)、`MY_CAT`、`LOG_IN`
  * 数组/集合：`someArr`、`someList`
  * 普通函数：`getMoney`
  * 类（需要实例化的）：`MyStuff`、`Person`
  * ......（见风使舵吧骚年，常备英语辞典你懂的）
  
* 单词的缩写。有些缩写是约定俗成的，例如 description 简写为 desc，destination 简写为 dest，但绝对不是所有长单词都取前四位就搞定。命名前多思考，多搜索查阅，而不是自己创造新词汇
* 文件（夹）的命名。相关联的最好归档（放入同一个文件夹），否则请使用前缀区分命名空间，以便于之后的归纳重构

***

## &sect; 代码风格
> 同样地，代码风格也是一个很大的议题，更多信息请自行搜索学习

* 开发过程中采用 [**ESLint**](http://eslint.org/) 进行 code view，配置在项目根目录下的 `.eslintrc`

***

## &sect; 团队开发规范
* 请勿随意更改开发配置，例如 Webpack 的配置，`.eslintrc` 等。若要修改，团队协商后统一更改
* 请勿随心所欲地使用其他 Package 。例如，既然用了 `vue-router` 就不要自行引入 `ui-router`
* **单文件代码量请尽量控制在 *百行* 以内。官方的做法是一个 vue 文件对应一个组件。而我们的规范是，对于代码行数过多的组件，请自建独立文件夹，把 HTML 模板与 CSS 样式拆出来，再由 `index.vue` 引入**
* 严禁把任何状态挂载到全局（亦即 window 下不能自行赋予自定义属性）
* 路径的引入，若是引入的是目录，须显式在末尾加斜杠，以便一眼区分：

```javascript
import file from '../../file' // 引入js文件请忽略后缀.js
import lib from '../../../lib/' // 默认引入该目录下的index.js
```

* 若遇到使用极度频繁的路径，可团队内部协商统一添加 Webpack 路径别名（`alias`）
* HTML 模板中，较长的内容，请注释闭标签：

```html
<div class="container">
  ...
</div><!-- /.container -->
```

* HTML 模板请分行拆写，Vue 指令后置

```html
<form
  role="search"
  class="navbar-form navbar-right"
  @submit.prevent>
  <div class="form-group">
    <input
      required
      type="text"
      class="form-control"
      placeholder="请输入您的用户名"
      v-model="username"/>
  </div>
  <div class="form-group">
    <input
      required
      type="password"
      class="form-control"
      placeholder="请输入密码"
      v-model="password"/>
  </div>
  <button
    type="submit"
    class="btn btn-success"
    @click="login">
    登录
  </button>
</form>
```

* 模板中使用简写 `:[XXX]`取代`v-bind:XXX`（P.S：注意页面闪烁问题），使用简写 `@verb` 取代 `v-on:[verb]`
* 涉及到逻辑方面的都必须用 `v-if`，视觉样式等才用 `v-show`。例如，用户必须登录后才能查看的，请用 `v-if`，而视觉呈现等与业务逻辑无关的，采用 `v-show`
* 使用 Bable 转码，的确可以使用各种炫酷的新特性。这对于后端 Node.js 而言，问题不大。但对于前端而言，这是一个坑。最基本的，您只要在项目中使用 `Promise`，那么最终生成的打包文件就多了十多 KB 的 Promise 实现。若还玩上了 `Generator`，打包文件的体积又会继续增长。而且 Babel 对某些新特性的转换相当冗余（详情请看 [babel到底将代码转换成什么鸟样？](https://github.com/lcxfs1991/blog/issues/9)）。一句话：Babel 虽好，但别贪杯哦。（推荐把玩在线实时编译：http://babeljs.io/repl/）
* 最小化引入库。例如，需要使用工具库（例如 lodash ），请尽量使用最小化引入：

```javascript
import _ from 'lodash' // 恭喜您，您成功地引入了全家桶，打包文件徒增几十KB
import isEmpty from 'lodash/isEmpty' // Good！
```

* 使用事件传递（`dispatch`）数据，一般是传**引用**（对象、数组等）而非传值
* 请勿把所有组件全局化（为了懒加载），何况也并不是所有组件都有必要全局化：

```javascript
import LoginForm from './LoginForm'
import LogoutDropdown from './LogoutDropdown'

export default {
  // “私有化”引入
  components: { LoginForm, LogoutDropdown },
  ...
}
```
  
上面的目录结构树如下（**绝对私有**的组件可放置在于父组件目录中）：

```
.
├── Navbar/
│   ├── index.vue
│   ├── LoginForm.vue
│   ├── LogoutDropdown.vue
```

* 请尽量保证数据流的可追踪性。尽量不要使用 `$parent`，而是通过 `props` 属性接收父组件的传入
* 在 Vue 层面上，提高效能的优化手段有很多，例如 `keep-alive`、`canReuse`、`track-by` 等
* （未完待续。若您还有，欢迎 PR）

