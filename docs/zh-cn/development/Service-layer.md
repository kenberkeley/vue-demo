# § 引入服务层

服务层的主要功能是：**封装好与后端 API 一一对应的请求类**。  
例如，用户登录的 API 为 `/auth/login`，  
那么 `services/authService.js` 这个类中就对应存在一个名为 `login` 的函数，  
只需要调用 `authService.login({ 帐号, 密码 })` 即可实现请求。

这样做的好处是：**轻量化组件，统一管理 XHR 请求，提高代码复用，方便 mock**，  
避免在组件中分别实现请求而导致管理上的混乱（对日后的重构也不友好）。  
而且，**前端的服务与后端的 API 一一对应**，在理解上也会变得更加容易。

更重要的是，服务层与 Vue 技术栈并没有太大关系（前提是您没有用 [`vue-resource`](https://github.com/pagekit/vue-resource) 这类相对鸡肋的 Ajax 库）。  
往后改用其他技术栈（React 等）时，服务层可直接复制过去，毋须改动任何代码。

> [React Demo](https://github.com/kenberkeley/react-demo) 就是直接复制本 demo 的 `services/` 目录

***

服务层还有一个妙用：**用于缓存相关的数据**。  
例如，我们有一个选择用户的下拉框组件，里面的数据是动态获取的（假设 API 为 `GET /authors`），  
若不把这些数据缓存下来，那么每一次渲染该组件，都会发出一次请求。  
尤其是该组件极其常用的情况下，更会造成很多不必要的资源消耗。

于是，我们为其新建一个服务，命名为 `authorService`，里面定义一个 `getOptions` 方法，  
在组件初始化的时候，可以这样子操作：

```js
if (authorService.options) {
  // 存在缓存，则使用缓存
  this.options = authorService.options
} else {
  // 不存在缓存，则动态获取
  authorService.getOptions().then(options => {
    this.options = authorService.options = options // 设置缓存
  })
}
```

由此，就可以实现**页面级别**的缓存，强制刷新即可获取最新的数据，毋须特意去维护该缓存。

> 试想，若使用 LocalStorage / SessionStorage 缓存，还要考虑兼容性、数据更新、有效性、安全性等诸多问题
