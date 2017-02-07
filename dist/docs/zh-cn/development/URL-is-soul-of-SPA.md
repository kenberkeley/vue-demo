# § URL 是单页应用的精华

在上篇[**谈状态管理**](./State-management.md)中，我们总结了没有引入 Vuex 的原因  
其实还有一个很重要的原因：我们使用了 `vue-router`，可以完全掌控 URL 以表示应用的状态

例如，我们在 Google 输入框输入 `vue`，敲下回车，就跳转到了搜索结果的页面，此时 URL 是：  
`https://www.google.com/?gws_rd=cr,ssl#newwindow=1&safe=strict&q=vue`  
关键点是：`{ q: 'vue' }`

点击下一页（第 2 页）：  
`https://www.google.com/?gws_rd=cr,ssl#q=vue&newwindow=1&safe=strict&start=10`  
关键点是：`{ q: 'vue', start: 10 }`

再点击下一页（第 3 页）：  
`https://www.google.com/?gws_rd=cr,ssl#q=vue&newwindow=1&safe=strict&start=20`  
关键点是：`{ q: 'vue', start: 20 }`

既然我们发现了这种规律，那么使用空白标签页直接访问：  
`https://www.google.com/?gws_rd=cr,ssl#q=vue&newwindow=1&safe=strict&start=30`  
显然就是第 4 页的搜索结果。而且毫无疑问地，搜索框会从 URL 中提取对应的关键字进行**同步**

综上：URL 可以表现应用的状态，而且在一定程度上，URL 就是应用状态的**最佳表现形式**

***

### 单页应用的精华在于：
拥有无缝切换体验的同时，保证 URL 与页面状态的同步性，满足保存书签、强制刷新、前进回退等基本需求  
（至于同步的粒度需要细致到什么程度，就需要根据实际情况自行斟酌了）

> 例如，https://github.com/kenberkeley 表示 kenberkeley 的首页  
> 又例如，https://github.com/kenberkeley/vue-demo/issues/1 表示 vue-demo 的第一个 issue
>   
> 就连微信这种原生 APP，也有使用 URL 表示应用的状态（URL Schemes）  
> 例如访问 `weixin://dl/moments` 就会跳转到朋友圈页面 (不过当前微信已屏蔽掉这类链接的访问)

***

`vue-router` 提供的 [`data`](https://github.com/vuejs/vue-router/blob/1.0/docs/zh-cn/pipeline/data.md) 函数，极其方便地让我们响应 URL 的变化以进行 xhr 请求  
当然，如果并非路由页面组件，是不能够享受到 `data` 函数的便利  
不过我们仍可以通过计算属性来实现同样的功能：

```js
watch: {
  '$route.query' (query, oldQuery) {
     // ...
   }
}
```

***

由于我们没有引入 Vuex，因此不能使用 [vuex-router-sync](https://github.com/vuejs/vuex-router-sync) 来自动同步路由与组件的状态  
但稍微封装一下，就可以完全满足我们的需求（详情请见 `src/mixins/autoSyncWithQuery.js`）  

> 上述 `autoSyncWithQuery` 的原理相当简单：  
> **约定**组件 `data` 属性中后缀带 `$` 的字段，使用 `$watch` 同步其变化到 query string  
> 同时，也对 `$route.query` 设置 `$watch`，同步其变化到对应的组件本地状态
> 
> 特别注意：由于状态与路由是双向同步的，因此**安全性**是必须考量的
