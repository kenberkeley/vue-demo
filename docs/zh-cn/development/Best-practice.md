# § 最佳实践

> 基本的命名规范、代码风格等，请自行查阅相关资料  
> 项目使用 [ESLint](http://eslint.org/) 进行静态检测，配置见 `.eslintrc`

***

* 通读 Vue.js [Guide](http://v1.vuejs.org/guide/) / [API](http://v1.vuejs.org/api/) 文档，通读 Vue Router [文档](https://github.com/vuejs/vue-router/tree/1.0/docs/zh-cn)

> 例如，`slot` 和 `inline-template` 的编译作用域搞清楚了吗？

***

* 恪守代码、模块分离，[DRY](https://en.wikipedia.org/wiki/Don't_repeat_yourself) 的开发理念

> 本 demo 的编码秉承最佳实践，不妨参阅

***

* 单组件文件代码量若超 200 行，一般都有优化的空间

> 关键是 **拆**，前提是粒度要合理

***

* 善用 Webpack 的路径别名

```js
import FooBar from '../../../../components/FooBar' // Bad  
import FooBar from '@/components/FooBar'           // Good
```

***

* 引入文件时，省略默认解析的文件后缀

> 配置见 `build/webpack.base.conf.js` 中的 `resolve.extensions`

```js
import FooBar from './FooBar.js'  // No good enough
import FooBar from './FooBar'     // Good
```

***

* 最小化引入类库（除非您使用了 [rollup](https://github.com/rollup/rollup) 或 [`lodash-webpack-plugin`](https://github.com/lodash/lodash-webpack-plugin) 等）

```js
import _ from 'lodash'               // Bad
import isEmpty from 'lodash/isEmpty' // Good
```

***

* 过长的 HTML 代码应当拆写

```html
<input type="text" class="form-control" v-model="text" placeholder="Please enter your name..." required>
<!-- ↑ Bad · Good ↓ -->
<input
  type="text"
  v-model="text"
  class="form-control"
  placeholder="Please enter your name..."
  required>
```

***

* 模板中使用 `:[prop]` 替代 `v-bind:[prop]`，使用 `@[verb]` 替代 `v-on:[verb]`

```html
<foo-bar v-bind:xxx="yyy"></foo-bar>
<button v-on:click="handleClick">Click me</button>
<!-- ↑ Bad · Good ↓ -->
<foo-bar :xxx="yyy"></foo-bar>
<button @click="handleClick">Click me</button>
```

***

* 一般来说，涉及到权限的必须用 `v-if` 而非 `v-show`

> 例如，用户必须登录后才能查看的，请用 `v-if`

***

* 杜绝[片段实例](http://v1.vuejs.org/guide/components.html#Fragment-Instance)

```html
<template>
  <div></div>
  <div></div>
</template>
<!-- ↑ Bad · Good ↓ -->
<template>
  <div>
    <div></div>
    <div></div>
  </div>
</template>
```

***

* 尽量避免在模板中设置过多的判断条件，善用[计算属性](http://v1.vuejs.org/guide/computed.html)

```html
<template>
  <div>
    <p v-if="i===0">Zero</p>
    <p v-if="i===1">One</p>
    <p v-if="i===2">Two</p>
  </div>
</template>
<script>
export default {
  data: () => ({ i: 0 })
}
</script>
<!-- ↑ Bad · Good ↓ -->
<template>
  <div>
    <p>{{ text }}</p>
  </div>
</template>
<script>
export default {
  data: () => ({ i: 0 }),
  computed: {
    text () {
      return ['Zero', 'One', 'Two'][this.i]
    }
  }
}
</script>
```

***

* “物以类聚”，善用目录自包含

> 例如：  
> `src/components/Select/` 下存放着全局通用的下拉框组件  
> `src/components/Sidebar/` 下存放着侧栏组件主体 `index.vue` 与其分拆出来的导航链接组件 `Link.vue`

***

* 请尽量保证数据流的可追踪性。尽量不要使用 `$parent`，而是通过 `props` 属性接收父组件的传入

***

* 在 Vue 层面上，提高效能的优化手段有很多，例如 [`track-by`](http://v1.vuejs.org/guide/list.html#track-by)、[`Object.freeze`](http://v1.vuejs.org/guide/list.html#Using-Object-freeze)、[`keep-alive`](http://v1.vuejs.org/guide/components.html#keep-alive)、[`canReuse`](https://github.com/vuejs/vue-router/blob/1.0/docs/zh-cn/pipeline/can-reuse.md) 等

> 更多技巧可参考 [Vue 性能优化最佳实践·阿里移动·刘欣然](http://pan.baidu.com/s/1o8QZEzg)

***

* *（未完待续，欢迎 PR）*
